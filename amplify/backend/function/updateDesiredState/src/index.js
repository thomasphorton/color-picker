/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION

Amplify Params - DO NOT EDIT */

const AWS = require('aws-sdk');
const iotData = new AWS.IotData({ endpoint: process.env.IOT_ENDPOINT });

exports.handler = async (event) => {
    console.log(event);
    let desiredState = event.arguments.state;
    let thingName = event.arguments.thingName;

    let payload = JSON.stringify({
        state: { desired: desiredState }
    });

    let request = iotData.updateThingShadow({ thingName, payload });
    let response = await request.promise();

    let responseState = JSON.parse(response.payload);
    
    console.log(responseState);
    return responseState.state.desired;
};
