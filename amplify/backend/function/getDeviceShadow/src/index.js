/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const iotData = new AWS.IotData({ endpoint: process.env.IOT_ENDPOINT })

exports.handler = async (event) => {
    console.log(event);
    let thingName = event.arguments.thingName;

    let request = iotData.getThingShadow({ thingName });
    let payload = await request.promise();
    
    let thingShadow = JSON.parse(payload.payload);

    let shadow = {
        desired: thingShadow.state.desired,
        reported: thingShadow.state.reported
    }

    console.log({ thingName, shadow });
    return { thingName, shadow }
};
