"use strict";

const jwt = require("jsonwebtoken");
const AWS = require("aws-sdk");
AWS.config.update({ region: "eu-west-1" });
const dynamodb = new AWS.DynamoDB.DocumentClient();

module.exports.handler = async (event, context) => {
  const id_token = event.headers.Id_token;
  let decodedToken = jwt.decode(id_token);
  let userEmail = decodedToken.email.toLowerCase();
  let params = {
    TableName: "user-mentoring",
    KeyConditionExpression: "user_id = :uid",
    ExpressionAttributeValues: {
      ":uid": userEmail,
    },
  };

  //get the user from usertable from email
  const userdata = await dynamodb.query(params).promise();
  const roleParam = {
    TableName: "role-mentoring",
    KeyConditionExpression: "role_id = :roleid",
    ExpressionAttributeValues: {
      ":roleid": userdata.Items[0].role_id,
    },
  };
  const roledata = await dynamodb.query(roleParam).promise();
  const data = {};
  data.user_id = userdata.Items[0].user_id;
  data.user_name = userdata.Items[0].user_name;
  data.role_name = roledata.Items[0].name;
  return {
    statusCode: 200,
    headers: {
      "Access-Control-Allow-Origin": "*",
    },
    body: JSON.stringify({
      result: data,
    }),
  };
};
