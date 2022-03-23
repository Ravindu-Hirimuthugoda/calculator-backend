'use strict';

const axios = require('axios');



module.exports.auth = async (event,context) => {
    const token ={};
    console.log(JSON.parse(event.body));
    console.log("Auth code is above");
    const acode = JSON.parse(event.body);
    const details = {
        grant_type: "authorization_code",
        code: acode,
        client_id: "5s0821ekobplt0cti08dme3ced",
        redirect_uri: "http://localhost:3000/welcome/"
    };

    const formBody = Object.keys(details).map(key=>`${encodeURIComponent(key)}=${encodeURIComponent(details[key])}`).join("&");
    
    console.log(formBody);
    
    await axios.post('https://calculator.auth.eu-west-1.amazoncognito.com/oauth2/token',formBody,{
        headers:{
            'Content-Type': 'application/x-www-form-urlencoded'
            
        }
    }).then((res)=>{
        token.access_token = res.data.access_token;
        token.id_token = res.data.id_token;
        console.log(res);
    }).catch((err)=>{
        console.log(err);
    });
    
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            result: token
        }),
    };
};