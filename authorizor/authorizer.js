"use strict";

const helper = require("./helper");
const config = require("./policy.json");

//ISS indicates the identity of the party that issued the JWT

const ISS = "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_LIN377rkm";
const id_token =
  "eyJraWQiOiJ2UW1WWFBSMW9xWWF5MFk0cGsrQjA4NDBcLzkrZTVZcTdhd2RqSzFmeWNBND0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiYnlCTGNBeGFOOEFoMDUxOWxpelFuQSIsInN1YiI6ImVmMzhmMTJiLWY3NmQtNGQwZi1iZjE1LWQyMTRkMzBhYzYyZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9MSU4zNzdya20iLCJjb2duaXRvOnVzZXJuYW1lIjoicmF2aW5kdSIsIm9yaWdpbl9qdGkiOiJkOTBlNzE5Zi0xMDNlLTQ1YTQtYWIxNy0zZWU4NmMzZGNkNTMiLCJhdWQiOiI1czA4MjFla29icGx0MGN0aTA4ZG1lM2NlZCIsImV2ZW50X2lkIjoiYjkwMmM2MzEtMDU3Ny00N2IwLWI5ZGMtYzAzMjhkZTRjZGFjIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NDg2NjMyNTUsImV4cCI6MTY0ODY2Njg1NSwiaWF0IjoxNjQ4NjYzMjU1LCJqdGkiOiJjYjJmYmEzNi1jM2Y5LTQxNjQtYjQyMi1hZjcwMTdlNmI2YzEiLCJlbWFpbCI6InJhdmluZHV3aXNod2FzaGFuMTk5OEBnbWFpbC5jb20ifQ.PHoxbmgmqST4wv3rtrJXUOqe47cl8R8MZByvfK3c3ReDrb082xaflKao0ftX0-Ohm3ZiGeDEVnjUkc4sjkNUSJWH2hb4P2PzVLiwvwcsZTKU7ZAtDGlfvf_lvTcsqOqn8jrths3aXz3kv2XEBbVsfWtrNzx-MTLiLqu1pv9xUqOCj0eqVVk7QavXTyQJvliwvP9NRV4SNaDa9YVZNoJKMsVS2nNXzNmNUTpdct-Rqdc59mNjOdSDvlI_oWr7jam96Gfw7YvzHwL03FWASsOL4uSlme0hGnUdt5DA0cnGNMHvbBUviPecLAc-VA9XavE3d5IoI1mPnDJg4mE4OwmKCQ";
let pems;

module.exports.authorize = async (token) => {
  let user;
  const isAuthenticted = await helper.getJWKs().then((jwks) => {
    pems = helper.getPems(jwks);
    //console.log(pems);
    //console.log(helper.validateToken(id_token,pems,ISS));
    return helper.validateToken(token, pems, ISS);
  });

  if (isAuthenticted === "Authorized User") {
    user = await await helper.getUSerContext(token);
    console.log(user);
    const policyDoc = {
      principalId: user.user_id,
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
