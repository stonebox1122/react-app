import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import { withRouter } from 'react-router';
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
import Address from '~/common/address'
import { List, Modal, DatePicker, Picker  } from 'antd-mobile';
import style from './index.module.scss'
import * as commonActionCreators from '~/common/store/actionCreators'
import * as mineActionCreators from '../../store/actionCreators'
const prompt = Modal.prompt;
const Item = List.Item;
class PersonInfo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isShowCom: false,
      comName: "",
      date: "",
      sex: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
      ]
    }
  }

  // 子组件显示
  handleShowCom = (name="Address") => {
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
      case 'Address':
        return <Address back = {this.handleShowCom}/>
      default:
        break;
    }
  }

  changeMsg = (type, info) => {
    let {token, userid, changeMsg} = this.props
    if (type === 'sex') {
      info = info[0]
    }
    if (type === 'birthday') {
      let Y = info.getFullYear()
      let M = info.getMonth()+1
      let D = info.getDate()
      if (M<10) M = `0${M}`
      if (D<10) D = `0${D}`
      info = `${Y}-${M}-${D}`
    }
    let query = {
      token,
      userid,
      flag:type,
      [type]: info
    }
    
    changeMsg(query)
  }

  render() {
    let {mineInfo: {userinfo}, back} = this.props
    let {sex} = this.state
    return (
      <div>
        <NavgationBar
          handleLeft={back}
          right=""
        >个人信息</NavgationBar>
        <List>
          <Item arrow="horizontal" extra = {<img src = {userinfo && userinfo.avatar} alt="avatar"/>}>
            头像
          </Item>
          <Item extra={userinfo && userinfo.userno}>会员编号</Item>
          <Item extra={userinfo.truename ? userinfo.truename : "请填写会员姓名"} arrow="horizontal" 
            onClick={() => prompt('姓名', '请填写会员姓名', [
              { text: '取消' },
              { text: '确定', onPress: value => this.changeMsg('truename', value) },
            ], 'default',  userinfo.truename)}>会员姓名</Item>

          <Picker value={userinfo.sex ? [userinfo.sex] : "请选择性别"} data={sex} cols={1} onChange={v=>this.changeMsg('sex', v)}>
            <Item  arrow="horizontal">性别</Item>
          </Picker>

          <DatePicker
           mode="date"
           title="选择年月日"
           extra={userinfo.birthday ? userinfo.birthday : "请选择出生日期"} 
           value= ""
           onChange={date =>  this.changeMsg('birthday', date)}
          >
            <Item arrow="horizontal">生日</Item>
          </DatePicker>
          <Item extra={userinfo.idcard ? userinfo.idcard : "请填写身份证号码"} arrow="horizontal" 
          onClick={() => prompt('身份证号', '16-18位数字,保留字母X', [
            { text: '取消' },
            { text: '确定', onPress: value => this.changeMsg('idcard', value) },
          ], 'default', userinfo.idcard)}>身份证号</Item>
        </List>

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

PersonInfo.propTypes = {
  back: PropTypes.func
}

const mapState = state => ({
  mineInfo: state.getIn(['mine', 'mineInfo']).toJS(),
  token: state.getIn(['login', 'token']),
  userid: state.getIn(['login', 'uid'])
})

const mapDispatch = dispatch => ({
  showModal (msg, title) {
    const action = commonActionCreators.toggleModal(msg, title)
    dispatch(action)
  },
  changeMsg (query) {
    const action = mineActionCreators.changeMine(query)
    dispatch(action)
  }
})

export default connect(mapState,mapDispatch)(withRouter(PersonInfo));