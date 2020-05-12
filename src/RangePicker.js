import React from 'react';
import InputRange from 'react-input-range';

import 'react-input-range/lib/css/index.css';

class RangePicker extends React.Component {
  render() {
    return <div>
      <InputRange
        maxValue={75}
        minValue={0}
        value={parseInt(this.props.number)}
        onChange={value => this.props.onChange(value)}
        onChangeComplete={value => this.props.onChangeComplete(value)} />
    </div>
  }
}

export default RangePicker;
