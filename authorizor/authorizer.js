'use strict';
const helper = require('./helper');
//ISS indicates the identity of the party that issued the JWT
const ISS = 'https://cognito-idp.eu-west-1.amazonaws.com/eu-west-1_LIN377rkm';
const id_token = 'eyJraWQiOiJ2UW1WWFBSMW9xWWF5MFk0cGsrQjA4NDBcLzkrZTVZcTdhd2RqSzFmeWNBND0iLCJhbGciOiJSUzI1NiJ9.eyJhdF9oYXNoIjoiLU0zTmE3TWdfVV9RZVhLc2lFR1lxdyIsInN1YiI6ImVmMzhmMTJiLWY3NmQtNGQwZi1iZjE1LWQyMTRkMzBhYzYyZCIsImVtYWlsX3ZlcmlmaWVkIjp0cnVlLCJpc3MiOiJodHRwczpcL1wvY29nbml0by1pZHAuZXUtd2VzdC0xLmFtYXpvbmF3cy5jb21cL2V1LXdlc3QtMV9MSU4zNzdya20iLCJjb2duaXRvOnVzZXJuYW1lIjoicmF2aW5kdSIsIm9yaWdpbl9qdGkiOiIzM2UwZDI1Ni0zYjM0LTQ0ODktYWVkNC1lZjg1MjJjMDRhZGUiLCJhdWQiOiI1czA4MjFla29icGx0MGN0aTA4ZG1lM2NlZCIsImV2ZW50X2lkIjoiMmVmN2ZmMWMtODYxOS00ZmQyLWEwNzctMGU3MTcwMTE2YTFkIiwidG9rZW5fdXNlIjoiaWQiLCJhdXRoX3RpbWUiOjE2NDgxNTEzNzUsImV4cCI6MTY0ODE1NDk3NSwiaWF0IjoxNjQ4MTUxMzc1LCJqdGkiOiIwMzAzODVmYy03OWRmLTQzODAtYjkwNi05YzQ1NDVhZWY0ZGUiLCJlbWFpbCI6InJhdmluZHV3aXNod2FzaGFuMTk5OEBnbWFpbC5jb20ifQ.N4SvDKTjep2INHcb_exNi78etcVPo59vG17alOSbnuQd8tE1LSvy9zyNnshv7MDTXGwOhFAkAS6fexB0Vx8Gc8WApanPelVov9A4EMNw16lLE8YZNI3EC0sGbKYe3BMgbf8R0UkOWnRe9kcmc7ntSXrGc77XI7DBd2qmH8WHPuO_PDtFxchBGj-r09oboi8OC0dvNXMpVOB0vpIQTjkfE1ogOQl5Iumkid8tfxaMdxL2GvD7TqsO48XmtF2BDv7IDHNhK6fY1qjX9sBzzgqbr3mJF4RSG0VhNj9lDjw_VZKq9ICM5nCIkLChUcKzkkQ0tTS3MXhhY6K8WtIykjqkUA';
let pems;

module.exports.authorize = async (token)=>{
    const isAuthenticted =await helper.getJWKs().then((jwks)=>{
        pems = helper.getPems(jwks);
        //console.log(pems);
        //console.log(helper.validateToken(id_token,pems,ISS));
        return helper.validateToken(id_token,pems,ISS);
    });
    if(isAuthenticted==='Authorized User'){
        
    }
}
