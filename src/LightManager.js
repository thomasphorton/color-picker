import React from 'react';
import ColorPicker from './ColorPicker';

class LightManager extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      color: '#FFFFFF',
      number: 10,
      thingRegistered: false
    };
  }

  componentDidUpdate() {
    
    if (this.props.client && !this.state.thingRegistered) {
      let that = this;
      this.props.client.register('led-lightstrip-1', {}, function(err, failedTopics) {
        if (err) console.log(err);
        if (failedTopics) console.log(failedTopics);
        console.log('registered');
        that.setState({ thingRegistered: true });
     });
    }
  }

  updateThing() {
    let desired = {
      color: this.state.color?.substring(1),
      number: this.state.number
    };

    console.log(`updating state to ${JSON.stringify(desired)}`);

    this.props.client.update('led-lightstrip-1', {
      state: { desired }
    });
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
    return <div>
      <ColorPicker
        color={ `${this.state.color}` }
        onChangeComplete={ this.handleColorChange }
      />
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

}

export default LightManager;
