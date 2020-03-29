import React from 'react';
import PropTypes from 'prop-types';
import { HuePicker } from 'react-color';

class ColorPicker extends React.Component {

  render() {

    const divStyle = {
      boxModel: 'border-box',
      height: '150px',
      width: '150px',
      backgroundColor: this.props.color,
      marginBottom: '10px',
      paddingTop: '20px'
    }

    return <div>
      <div style={divStyle}>
        <h2>{this.props.color}</h2>
      </div>
      <HuePicker
        color={ this.props.color }
        onChangeComplete={ this.props.onChangeComplete }
      />
    </div>
  }
}

ColorPicker.propTypes = {
  background: PropTypes.string
};

export default ColorPicker;
