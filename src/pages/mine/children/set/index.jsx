import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
import { List } from 'antd-mobile';
import style from './index.module.scss'
import * as loginActionCreators from '~/common/login/store/actionCreators'
const Item = List.Item;
const Brief = Item.Brief;
class Set extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  to = () => {
    this.props.history.push('/tab/home')
  }
  render() {
    let {mineInfo: {userinfo}, back, exit} = this.props
    return (
      <div>
        <NavgationBar
          handleLeft={back}
          right=""
        >设置</NavgationBar>
        <List>
          <Item
            arrow="horizontal"
            thumb = { userinfo && userinfo.avatar }
            multipleLine
            onClick={() => {}}
          >
            {userinfo && userinfo.truename } <Brief>{ userinfo && userinfo.userno }</Brief>
          </Item>
          <Item extra={userinfo && userinfo.mobile} arrow="horizontal" onClick={() => {}}>修改手机号</Item>
          <Item arrow="horizontal" onClick={() => {}}>收货地址</Item>
          <Item arrow="horizontal" onClick={() => {}}>修改密码</Item>
          <Item arrow="horizontal" onClick={() => {}}>咨询客服</Item>
        </List>
        <div onClick={() => exit(this.to)} className={style.exit}>退出当前账户</div>
      </div>
    );
  }
}

Set.propTypes = {
  back: PropTypes.func
}

const mapState = state => ({
  mineInfo: state.getIn(['mine', 'mineInfo']).toJS()
})

const mapDispatch = dispatch => ({
  async exit (cb) {
    const action = loginActionCreators.exit();
    await dispatch(action)
    cb()
  }
})

export default connect(mapState,mapDispatch)(withRouter(Set));