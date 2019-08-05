import React, { PureComponent } from 'react';
import { NavBar, Icon } from 'antd-mobile';
import PropTypes from 'prop-types'

class ChangePhone extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    let { back } = this.props
    return (
      <div>
        <NavBar
          mode="light"
          icon={<Icon type="left" />}
          onLeftClick={() => back() }
        >修改手机号</NavBar>
      </div>
    );
  }
}

ChangePhone.propTypes = {
  back: PropTypes.func
}
export default ChangePhone;