/* Amplify Params - DO NOT EDIT
You can access the following resource attributes as environment variables from your Lambda function
var environment = process.env.ENV
var region = process.env.REGION
var apiColorpickerGraphQLAPIIdOutput = process.env.API_COLORPICKER_GRAPHQLAPIIDOUTPUT
var apiColorpickerGraphQLAPIEndpointOutput = process.env.API_COLORPICKER_GRAPHQLAPIENDPOINTOUTPUT

Amplify Params - DO NOT EDIT */

const appsync = require('aws-appsync');
const gql = require('graphql-tag');
require('cross-fetch/polyfill');

const updateReportedState = gql`
    mutation UpdateReportedState($thingName: String, $state: DeviceStateInput) {
        updateReportedState(thingName: $thingName, state: $state) {
            color
            number
            lightsOn
        }
    }
`;

exports.handler = async (event) => {   
    console.log('event');
    console.log(event);
    console.log(process.env.AWS_ACCESS_KEY_ID);
    console.log(process.env.AWS_SECRET_ACCESS_KEY);
    console.log(process.env.AWS_SESSION_TOKEN);
    console.log(process.env.API_COLORPICKER_GRAPHQLAPIENDPOINTOUTPUT);

    const graphqlClient = new appsync.AWSAppSyncClient({
      url: process.env.API_COLORPICKER_GRAPHQLAPIENDPOINTOUTPUT,
      region: process.env.AWS_REGION,
      auth: {
        type: 'AWS_IAM',
        credentials: {
          accessKeyId: process.env.AWS_ACCESS_KEY_ID,
          secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
          sessionToken: process.env.AWS_SESSION_TOKEN
        }
      },
      disableOffline: true
    });

    await graphqlClient.mutate({
        mutation: updateReportedState,
        variables: {
            color: '#FFFFFF',
            number: 10,
            lightsOn: true
        }
    });

    return {
        color: '#FFFFFF',
        number: 10,
        lightsOn: true
    }

}