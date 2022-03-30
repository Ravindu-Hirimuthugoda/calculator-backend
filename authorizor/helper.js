const axios = require("axios");
const jwt = require("jsonwebtoken");
const jwkToPem = require("jwk-to-pem");
const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });
const dynamodb = new AWS.DynamoDB.DocumentClient();

//A JSON Web Key (JWK) is a JSON data structure that represents a set of public keys

const ISS = "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_LIN377rkm";

module.exports.getJWKs = async (jwkPath) => {
  var jwks = await axios
    .get(
      "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_LIN377rkm/.well-known/jwks.json"
    )
    .then(({ data }) => {
      return data["keys"];
    })
    .catch((err) => {
      console.log(err);
    });
  if (jwks) {
    return jwks;
  }
};

//The PEM provides the certificate in a way that is easily human accessable for use with tools like JWT.io

module.exports.getPems = (jwks) => {
  const pems = {};
  for (let i = 0; i < jwks.length; i++) {
    const key_id = jwks[i].kid;
    const modulus = jwks[i].n;
    const exponent = jwks[i].e;
    const key_type = jwks[i].kty;
    const jwk = { kty: key_type, n: modulus, e: exponent };
    const pem = jwkToPem(jwk);
    pems[key_id] = pem;
  }
  return pems;
};

module.exports.validateToken = (jwtToken, jwksPem, iss) => {
  // get the decoded payload and header
  const decodedJwt = jwt.decode(jwtToken, { complete: true });
  //console.log(decodedJwt);
  //Fail if the token is not jwt
  if (!decodedJwt) {
    return new Error("Not a valid JWT Token");
  }
  //Fail if token is not from your User Pool
  if (decodedJwt.payload.iss != iss) {
    return new Error("Invalid issuer");
  }
  //Reject the jwt if it's not an 'ID Token'
  if (decodedJwt.payload.token_use != "id") {
    return new Error("token_use is invalid: " + decodedJwt.payload.token_use);
  }
  //Get the kid from the token and retrieve corresponding PEM
  const kid = decodedJwt.header.kid;

  let pem = jwksPem[kid];
  if (!pem) {
    return new Error("Invalid access token");
  }

  const res = jwt.verify(
    jwtToken,
    pem,
    { issuer: iss, maxAge: 3600000 },
    (err, payload) => {
      if (err) {
        switch (err.name) {
          case "TokenExpiredError":
            return new Error("JWT Token Expired");
            break;
          case "JsonWebTokenError":
            return new Error("Invalid JWT token");
            break;
          default:
            return new Error("Token verification failure");
        }
      } else {
        return "Authorized User";
      }
    }
  );
  return res;
};

module.exports.getUSerContext = async (token) => {
  let decodedToken = jwt.decode(token);
  let userEmail = decodedToken.email.toLowerCase();
  let params = {
    TableName: "user-mentoring",
    KeyConditionExpression: "user_id = :uid",
    ExpressionAttributeValues: {
      ":uid": userEmail,
    },
  };
  
  //get the user from usertable from email
  const userdata = await dynamodb.query(params).promise();
  const roleParam = {
    TableName: "role-mentoring",
    KeyConditionExpression: "role_id = :roleid",
    ExpressionAttributeValues: {
      ":roleid": userdata.Items[0].role_id
    }
  };
  const roledata = await dynamodb.query(roleParam).promise(); 
  const data = {};
  data.user_id = userdata.Items[0].user_id;
  data.user_name = userdata.Items[0].user_name;
  data.role_name = roledata.Items[0].name;
  return data;
};
