import React from 'react';
import './App.css';
import LightManager from './LightManager';

import { thingShadow as ThingShadowClient } from 'aws-iot-device-sdk';

import Amplify, { Auth } from 'aws-amplify';
import IoT from 'aws-sdk/clients/iot';
import { withAuthenticator } from 'aws-amplify-react';
import awsconfig from './aws-exports';
import appconfig from './app-config';
Amplify.configure(awsconfig);

const devices = [{
  id: 'led-lightstrip-1'
}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { client: null };
  }

  componentDidMount() {
    Auth.currentCredentials().then(credentials => {

      let iot = new IoT({
        region: awsconfig.aws_project_region,
        credentials
      });

      let attachPolicyParams = {
        policyName: 'mariah-Policy',
        target: credentials._identityId
      };

      iot.attachPolicy(attachPolicyParams, (err, data) => {
        if (err) {
          console.log(err);
        }
        else {
          console.log(credentials._identityId);
          let thingShadowOptions = {
            region: awsconfig.aws_project_region,
            host: appconfig.iotHost,
            port: 443,
            protocol: 'wss',
            accessKeyId: credentials.data.Credentials.AccessKeyId,
            secretKey: credentials.data.Credentials.SecretKey,
            sessionToken: credentials.data.Credentials.SessionToken,
            debug: true
          };

          // console.log(thingShadowOptions);
          let client = ThingShadowClient(thingShadowOptions)

          client.on('connect', () => {
            console.log('client connected');
          })

          client.on('status', (thingName, stat, clientToken, stateObject) => {
            console.log(`received ${stat} on ${thingName}: ${JSON.stringify(stateObject)}`);
          });

          this.setState({client});
        }
      });
    })
  }

  render() {
    return (<div className="App">
      {devices.map((device, i) => {
        return <LightManager key={i} client={this.state.client} deviceId={ device.id} />
      })}
    </div>)
  }
}

export default withAuthenticator(App, true);
