import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
import ChangePwd from './children/changePwd'
import ChangePhone from './children/changePhone'
import Address from '~/common/address'
import { List } from 'antd-mobile';
import style from './index.module.scss'
import * as loginActionCreators from '~/common/login/store/actionCreators'
import * as commonActionCreators from '~/common/store/actionCreators'
const Item = List.Item;
const Brief = Item.Brief;
class Set extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowCom: false,
      comName: ""
    }
  }
  to = () => {
    this.props.history.push('/tab/home')
  }

  // 子组件显示
  handleShowCom = (name="ChangePwd") => {
    let flag = this.state.isShowCom
    this.setState({
      comName: name,
      isShowCom: !flag
    })
  }
  // 动态改变子组件
  showCom = () => {
    const name = this.state.comName
    switch (name) {
      case 'ChangePwd':
        return <ChangePwd back={this.handleShowCom}/>
      case 'Address':
        return <Address back = {this.handleShowCom}/>
      case 'ChangePhone':
        return <ChangePhone back = {this.handleShowCom} />
      default:
        break;
    }
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
          <Item extra={userinfo && userinfo.mobile} arrow="horizontal" onClick={() => {
            this.handleShowCom('ChangePhone')
          }}>修改手机号</Item>
          <Item arrow="horizontal" onClick={() => {
            this.handleShowCom('Address')
          }}>收货地址</Item>
          <Item arrow="horizontal" onClick={() => {
            this.handleShowCom('ChangePwd')
          }}>修改密码</Item>
          <Item arrow="horizontal" onClick={() => {
            this.props.showModal('4000-828-525', '客服电话')
          }}>咨询客服</Item>
        </List>
        <div onClick={() => exit(this.to)} className={style.exit}>退出当前账户</div>

        {/* 子页面 */}
        {
          this.state.isShowCom ?
          <section className={style['full-screen']}>
            { this.showCom() }
          </section>
          : ""
        }
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
  },
  showModal (msg, title) {
    const action = commonActionCreators.toggleModal(msg, title)
    dispatch(action)
  }
})

export default connect(mapState,mapDispatch)(withRouter(Set));