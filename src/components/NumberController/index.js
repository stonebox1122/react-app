import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

class NumController extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    return (
      <div>

      </div>
    );
  }
}

NumController.propTypes = {
  num: PropTypes.number
}

NumController.defaultTypes = {
  num: 1
}

export default NumController;