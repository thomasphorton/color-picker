import React from 'react';
import './App.css';
import LightManager from './LightManager';

import Amplify from 'aws-amplify';
import { withAuthenticator } from 'aws-amplify-react';

import { Container, Row, Col } from 'react-grid-system';

import awsconfig from './aws-exports';
Amplify.configure(awsconfig);

const devices = [{
  id: '59180995-a522-4a50-9ee5-003871e5747f',
  friendlyName: 'LED Lightstrip 1',
  thingName: 'led-lightstrip-1',
  thingType: 'led-lightstrip',
  owner: 'thomasphorton@gmail.com'
}];

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = { client: null };
  }

  render() {
    return (<div className="App">
      <Container>
        <Row>
          {devices.map((device, i) => {
            switch(device.thingType) {
              case 'led-lightstrip':
                return <Col sm={4} key={i}> 
                  <LightManager  client={this.state.client} device={ device } />
                </Col>
              default:
                return <Col sm={4} key={i}> 
                  <div><p>Unknown device type</p></div>
                </Col> 
            }
          })}
        </Row>
      </Container>
      <div>
        <p>a <a href='https://thomasphorton.com/'>thomasphorton</a> thing</p>
      </div>
    </div>)
  }
}

export default withAuthenticator(App, true);
