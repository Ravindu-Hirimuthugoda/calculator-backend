"use strict";
const helper = require("./helper");
//ISS indicates the identity of the party that issued the JWT
const ISS = "https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_LIN377rkm";
const id_token =
  "eyJraWQiOiJ2UW1WWFBSMW9xWWF5MFk0cGsrQjA4NDBcLzkrZTVZcTdhd2RqSzFmeWNBND0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiS2dsemlWc1p2TFp0UDJfR1NtRWpSdyIsInN1YiI6ImVmMzhmMTJiLWY3NmQtNGQwZi1iZjE1LWQyMTRkMzBhYzYyZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9MSU4zNzdya20iLCJjb2duaXRvOnVzZXJuYW1lIjoicmF2aW5kdSIsIm9yaWdpbl9qdGkiOiI2MWRjMzFkNC03YzQ1LTQ1YjgtOWMyYS00YjRkYWZkMTVkMzYiLCJhdWQiOiI1czA4MjFla29icGx0MGN0aTA4ZG1lM2NlZCIsImV2ZW50X2lkIjoiOThiYmEzNDMtMjkzZi00ZTgzLTg4MmMtMmFmZTg3YjEyMDkyIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NDg1ODIyMDMsImV4cCI6MTY0ODU4NTgwMywiaWF0IjoxNjQ4NTgyMjAzLCJqdGkiOiI5MTM5YTJmNy04ZDVhLTQ2ZWYtODg3NS01ZmY1YzE5NmFkZjYiLCJlbWFpbCI6InJhdmluZHV3aXNod2FzaGFuMTk5OEBnbWFpbC5jb20ifQ.U6rEwsr5YyfBAuvP--OxbR92f100nwwcU2VEAYwXfya09y-noM1yNrj5g4jbdnOTWWuDa7-2_RLiQGC8fh5warc6pggl-3u55QULZMAOJ2DYAER8kO-bTiND2HD3b04fTCbC7yO92q5pnogHk0ng7A2yfMC4odLQeITLiiQJEnx9Uc1vLEgWE1JmwAh79arLwqnSvM_gonO-rcjX1Lk2hKSFPaDRKjCE12XzQpk9NxvU4vZg9nLEwIsdXSCAP41ErbcMi7b-fct5OWiWCizrmR6LkjJy53tqsEjjTJZU7SEEI1mFvk9r05LuCWCifgh_QE1i51vq-cmgk6fYs_2iAg";
let pems;

module.exports.authorize = async (token) => {
  let user;
  const isAuthenticted = await helper.getJWKs().then((jwks) => {
    pems = helper.getPems(jwks);
    //console.log(pems);
    //console.log(helper.validateToken(id_token,pems,ISS));
    return helper.validateToken(id_token, pems, ISS);
  });
  if (isAuthenticted === "Authorized User") {
    user = await (await helper.getUSerContext(id_token)).Items[0];
    // console.log(user);
  }
};
