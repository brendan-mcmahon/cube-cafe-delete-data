const AWS = require("aws-sdk");
const documentClient = new AWS.DynamoDB.DocumentClient();

exports.handler = async (event) => {
  console.log("event:", event);
  const { name, date } = JSON.parse(event.body); // Parse body content from string to JSON

  console.log("name:", name);
  console.log("date:", date);

  const params = {
    TableName: "cube-cafe-data",
    Key: {
      name: name,
      date: date,
    },
  };

  try {
    const data = await documentClient.delete(params).promise();
    console.log("DeleteItem succeeded:", JSON.stringify(data, null, 2));
    return { statusCode: 200, body: JSON.stringify("DeleteItem succeeded") }; // Return successful response
  } catch (err) {
    console.error("Unable to delete item. Error JSON:", JSON.stringify(err, null, 2));
    return { statusCode: 500, body: JSON.stringify(`Unable to delete item ${JSON.stringify(err)}`) }; // Return error response
  }
};
