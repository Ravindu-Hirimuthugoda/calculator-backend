'use strict';

module.exports.handler = async (event,context) => {
    let {num1,num2} = JSON.parse(event.body);
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            result: num1*num2
        }),
    };
};