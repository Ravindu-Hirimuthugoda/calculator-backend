'use strict';

module.exports.add = async (event,context) => {
    let num = JSON.parse(event.body);
    return {
        statusCode: 200,
        headers: {
            'Access-Control-Allow-Origin': '*'
        },
        body: JSON.stringify({
            result: eval(num)
        }),
    };
};