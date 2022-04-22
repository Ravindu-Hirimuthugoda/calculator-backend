"use strict";

const axios = require("axios");

module.exports.auth = async (event, context) => {
  const token = {};
  //console.log(event.body);
  // console.log(JSON.parse(event.body));
  const client_id = process.env.CLIENT_ID;
  const url = process.env.URL;
  console.log("Auth code is above");
  //const acode = JSON.parse(event.body);
  const acode = process.env.IS_OFFLINE ? event.body : JSON.parse(event.body);
  const details = {
    grant_type: "authorization_code",
    code: acode,
    client_id: client_id,
    redirect_uri: "https://d2ks7vcdohitbk.cloudfront.net/welcome/",
  };

  const formBody = Object.keys(details)
    .map(
      (key) => `${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`
    )
    .join("&");

  console.log(formBody);

  await axios
    .post(`${url}/oauth2/token`, formBody, {
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
    })
    .then((res) => {
      token.access_token = res.data.access_token;
      token.id_token = res.data.id_token;
    })
    .catch((err) => {
      console.log(err);
    });

  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      result: token,
    }),
  };
};
