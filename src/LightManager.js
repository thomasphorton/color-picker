import React from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import RangePicker from './RangePicker';
import ColorPicker from './ColorPicker';
import { Toggle } from 'react-toggle-component';

// import "react-toggle/style.css"

import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';

Amplify.configure(awsconfig);

class LightManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: undefined,
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

    let color = deviceShadow.reported.color;
   
    if (!color.startsWith('#')) {
      color = `#${color}`;
    }
    
    this.setState({ color });
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
        color: this.state.color?.substring(1),
        number: this.state.number,
        lightsOn: this.state.lightsOn
      }
    };

    let res = await API.graphql(graphqlOperation(mutations.updateDesiredState, params))
    let desiredState = res.data.updateDesiredState;
  }

  handleToggleChange = (e) => {
    let lightsOn = e.target.checked;
   
    // This state change takes longer for some reason
    this.setState({ lightsOn }, this.updateThing);
  }

  handleColorChange = (color) => {
    this.setState({ color: color.hex }, this.updateThing);
  };

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
              On/Off
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
                <RangePicker
                  number={ `${this.state.number}` }
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
