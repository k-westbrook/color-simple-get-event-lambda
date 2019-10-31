const AWS = require('aws-sdk');
const docClient = new AWS.DynamoDB.DocumentClient({ region: "us-west-1" });

exports.handler = (event, context, callback) => {

  const params = {
    TableName: 'EVENT_DETAILS',
    KeyConditionExpression: "#event_id = :event_id",
    ExpressionAttributeNames: {
      "#event_id": "event_id"
    },
    ExpressionAttributeValues: {
      ":event_id": event.event_id
    }
  };

  docClient.query(params, function (err, data) {

    let recordReturned = data.Items[0];

    if (err) {

      data = {
        statusCode: 400,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: {
          message: JSON.stringify('ERROR, event not found.')
        }
      };
      callback(null, data);

    } else {

      data = {
        statusCode: 200,
        headers: {
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Credentials': true,
        },
        body: {

          message: JSON.stringify('Successful get.'),
          event: recordReturned
        }

      };

      callback(null, data);

    }
  })
};
