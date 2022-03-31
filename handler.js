"use strict";

const authorizer = require("./authorizor/authorizer");

module.exports.authorize = async (event) => {
  const token = event.headers.Authorization;
  console.log(token);
  if (token) {
    const policy = await authorizer.authorize(token);
    console.log(JSON.stringify(policy));
    return JSON.stringify(policy);
  } else {
    console.log("unAuthenticated at handler.js");
    return;
  }
};
