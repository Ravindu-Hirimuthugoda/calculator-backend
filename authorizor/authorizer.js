"use strict";

const helper = require("./helper");
const config = require("./policy.json");

//ISS indicates the identity of the party that issued the JWT

let pems;

module.exports.authorize = async (token, iss) => {
  console.log(iss);
  let user;
  const isAuthenticted = await helper.getJWKs(iss).then((jwks) => {
    pems = helper.getPems(jwks);
    //console.log(pems);
    return helper.validateToken(token, pems, iss);
  });

  if (isAuthenticted === "Authorized User") {
    user = await await helper.getUSerContext(token);
    console.log("Authenticated");
    // console.log(user);
    const policyDoc = {
      principalId: "token",
      policyDocument: config[user.role_name],
      context: {
        email: user.user_id,
        name: user.user_name,
        role: user.role_name,
      },
    };
    return policyDoc;
  } else {
    console.log("Unauthenticated");
    return;
  }
};
