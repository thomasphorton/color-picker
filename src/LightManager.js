import React from 'react';
import Amplify, { API, graphqlOperation } from 'aws-amplify';
import awsconfig from './aws-exports';
import RangePicker from './RangePicker';
import ColorPicker from './ColorPicker';

import * as queries from './graphql/queries';
import * as mutations from './graphql/mutations';
import * as subscriptions from './graphql/subscriptions';

Amplify.configure(awsconfig);

class LightManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#FFFFFF',
      number: 10,
      registered: false
    };
  }

  componentDidMount = async () => {
    // this.device = await API.graphql(graphqlOperation(queries.getDevice));
    // console.log(this.device);
  }

  componentDidUpdate() {
    if (this.props.client && !this.state.registered) {
      let that = this;
      this.props.client.register('led-lightstrip-1', {}, function(err, failedTopics) {
        if (err) console.log(err);
        if (failedTopics) console.log(failedTopics);
        console.log('registered');
        that.setState({ registered: true });
     });
    }
  }

  updateThing = async () => {
    let desired = {
      color: this.state.color?.substring(1),
      number: this.state.number
    };

    console.log(`updating state to ${JSON.stringify(desired)}`);

    this.props.client.update('led-lightstrip-1', {
      state: { desired }
    });

    const deviceDetails = {
      id: `59180995-a522-4a50-9ee5-003871e5747f`,
      name: `led-lightstrip-1`,
      state: JSON.stringify(desired)
    }

    const newDevice = await API.graphql(graphqlOperation(mutations.updateDevice, {input: deviceDetails}));
  }

  handleColorChange = (color) => {
    this.setState({ color: color.hex });
    this.updateThing();
  };

  handleNumberChange = (e) => {
    let number = e.nativeEvent.target.value;
    this.setState({ number })
    this.updateThing();
  };

  render() {
    if (this.state.registered) {
      return <div>
        <ColorPicker
          color={ `${this.state.color}` }
          onChangeComplete={ this.handleColorChange }
        />
        <RangePicker />
        <div>
          <input 
            onChange={this.handleNumberChange}
            type="range"
            id="number"
            name="number"
            min="0"
            max="150">
          </input>
          <label htmlFor="number">Number of Lights: {this.state.number}</label>
        </div>
      </div>
    }
    else {
      return <div>
        <p>Loading...</p>
      </div>
    }
  }

}

export default LightManager;
