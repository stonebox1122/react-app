// 推广
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
class Promotion extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    let {back} = this.props
    return (
      <div>
        <NavgationBar  handleLeft={back}
          right="">推广二维码</NavgationBar>
      </div>
    );
  }
}

Promotion.propTypes = {
  back: PropTypes.func
}

export default Promotion;