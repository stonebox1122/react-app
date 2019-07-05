import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import NavgationBar from '@/NavgationBar'
import * as actionCreator from '../../store/actionCreator'

import style from './index.module.scss'
class ConfirmOrder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    const {toggleShowCom} = this.props
    return (
      <div className={style['confirm-order']}>
        <NavgationBar handleLeft={toggleShowCom}>
          确认订单
        </NavgationBar>
      </div>
    );
  }
}

const mapDispatch = (dispatch) => ({
  // 是否显示子页面
  toggleShowCom () {
    const action = actionCreator.toggleComponent()
    dispatch(action)
  }
})
 
export default connect(null, mapDispatch)(ConfirmOrder);