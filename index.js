const AWS = require('aws-sdk');
  const ddb = new AWS.DynamoDB.DocumentClient();
  
  exports.handler = async (event, context) => {
    const name = event.body.name;
  
    // delete the record from the databse that has the name passed in on the body
    const deleteParams = {
      TableName: "cube-cafe-data",
      Key: {
        name: name,
      }
    };
  
  
    try {
      await ddb.delete(deleteParams).promise();
      return { statusCode: 200, body: 'Game Deleted.' };
    } catch (err) {
      console.error(err);
      return { statusCode: 500, body: 'Failed to connect: ' + JSON.stringify(err) };
    }
  };
  
  