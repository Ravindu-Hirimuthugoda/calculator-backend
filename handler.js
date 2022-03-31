"use strict";

const authorizer = require("./authorizor/authorizer");

module.exports.authorize = async (event) => {
  const token = event["authorizationToken"];
  if (token) {
    const policy = await authorizer.authorize(token);
    console.log(policy);
    return policy;
  } else {
    console.log("unAuthenticated at handler.js");
    return;
  }
};
