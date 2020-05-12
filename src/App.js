import React from 'react';
import './App.css';
import ReactTwitchEmbedVideo from "react-twitch-embed-video";
import LightManager from './LightManager';

import { Container, Row, Col } from 'react-grid-system';

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
          <Col sm={8}>
            <h2>Live Stream</h2>
            <div style={{maxWidth:"100%"}}>
            <ReactTwitchEmbedVideo
              channel="thomasphorton"
              height="400"
              width="400"/>
            </div>
          </Col>
        </Row>
      </Container>
      <div>
      
        <p>check out the live feed of the lights <a href="https://twitch.tv/thomasphorton">on twitch</a></p>
        <p>see more about this on <a href='https://github.com/thomasphorton/color-picker'>github</a></p>
        <p>a <a href='https://thomasphorton.com/'>thomasphorton</a> thing</p>
      </div>
    </div>)
  }
}

export default App;
