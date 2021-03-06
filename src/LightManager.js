import React from 'react';
import Amplify, { API, Auth, graphqlOperation } from 'aws-amplify';

import awsconfig from './aws-exports';

import RangePicker from './RangePicker';
import ColorPicker from './ColorPicker';
import { Toggle } from 'react-toggle-component';

import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

awsconfig["aws_appsync_authenticationType"] = "AWS_IAM";

Amplify.configure(awsconfig);

class LightManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: undefined,
      brightness: undefined,
      number: undefined,
      lightsOn: undefined,
      registered: false
    };
  }

  componentDidMount = async () => {
    let thingName = this.props.device.thingName;
    console.log(`Getting device shadow of '${thingName}'`);
    console.log({ thingName });
    let res = await API.graphql(graphqlOperation(queries.getDeviceShadow, { thingName }));

    console.log(res);
    let deviceShadow = res.data.getDeviceShadow.shadow;

    console.log(deviceShadow);

    let color = deviceShadow.reported.color;
    
    if (!color.startsWith('#')) {
      color = `#${color}`;
    }
    
    this.setState({ color });
    this.setState({ brightness: deviceShadow.reported.brightness });
    this.setState({ number: deviceShadow.reported.number });
    this.setState({ lightsOn: deviceShadow.reported.lightsOn });
    this.setState({ registered: true });
  }

  componentDidUpdate() {}

  updateThing = async () => {
    let thingName = this.props.device.thingName;

    let params = {
      thingName,
      state: {
        color: this.state.color,
        brightness: this.state.brightness,
        number: this.state.number,
        lightsOn: this.state.lightsOn
      }
    };

    await API.graphql(graphqlOperation(mutations.updateDesiredState, params))
  }

  handleToggleChange = (e) => {
    let lightsOn = e.target.checked;
    this.setState({ lightsOn }, this.updateThing);
  }

  handleColorChange = (color) => {
    this.setState({ color: color.hex }, this.updateThing);
  };

  handleBrightnessChangeComplete = (brightness) => {
    this.setState({ brightness }, this.updateThing);
  };

  handleBrightnessChange = (brightness) => {
    this.setState({ brightness });
  }

  handleNumberChangeComplete = (number) => {
    this.setState({ number }, this.updateThing);
  };

  handleNumberChange = (number) => {
    this.setState({ number });
  }

  render() {
    return(
      <div>
        {this.state.registered &&
          <div>
            <h2>{this.props.device.friendlyName}</h2>
            <label htmlFor={ `${this.props.device.thingName}-on-off`}>
              Off/On
              <Toggle
                checked={this.state.lightsOn}
                name={ `${this.props.device.thingName}-on-off`}
                onToggle={ this.handleToggleChange }
              />
            </label>
            { this.state.lightsOn &&
              <div>
                <ColorPicker
                  color={ `${this.state.color}` }
                  onChangeComplete={ this.handleColorChange }
                />
                <h3>Brightness: {this.state.brightness}%</h3>
                <RangePicker
                  value={ `${this.state.brightness}` }
                  max={ 100 }
                  onChange={ this.handleBrightnessChange }
                  onChangeComplete={ this.handleBrightnessChangeComplete }
                />
                <h3>Number of Lights: {this.state.number}</h3>
                <RangePicker
                  value={ `${this.state.number}` }
                  max={ 150 }
                  onChange={ this.handleNumberChange }
                  onChangeComplete={ this.handleNumberChangeComplete }
                />
              </div>
            }
          </div>
          
        }
      </div>
    )
  }

}

export default LightManager;
