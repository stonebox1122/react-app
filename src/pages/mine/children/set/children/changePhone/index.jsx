import React, { PureComponent } from 'react';
import { NavBar, Icon, Toast } from 'antd-mobile';
import Cell from '@/Cell'
import { connect  } from 'react-redux';
import * as commonActionCreators from '~/common/store/actionCreators';
import PropTypes from 'prop-types'
import Verification from '@/Verification'
import { testPhoneNum } from '$src/common/js/utils'
import { sendCode, verficationCode } from '$src/api'
import style from './index.module.scss'
class ChangePhone extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      phone: '',
      code: ''
     }
  }
  // 发送验证码
  sendMsg = () => {
    // 先检测手机号对不对 对的话 发送验证码
    let phonenum = this.state.phone
    if (testPhoneNum(phonenum)) {
      let query = {
        mobile: phonenum,
        type: '3'
      }
      sendCode(query).then(res => {
        if (res.code !== '1') {
          this.props.toggleModal(res.msg)
        } else {
          // 调用子组件倒计时
          this.verification.countdown()
        }
      })
    } else {
      this.props.toggleModal('请输入正确的手机号')
    }
  }
  // 输入改变
  changeInputNum (options) {
    let { name, v } = options
    this.setState({
      [name]: v
    })
  }
  confirm = () => {
    let {phone: mobile, code} = this.state
    let query = {
      mobile,
      code,
      type: 3
    }
    verficationCode(query).then(res => {
      if (res.code === '1') {
        Toast.success('修改成功')
        this.props.back()
      } else {
        this.props.toggleModal(res.msg)
      }
    })
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
        <div className={style.container}>
          <Cell name="phone" changeInput= {this.changeInputNum.bind(this)} label="中国+86" placeHoder = "请输入手机号"/>
          <Cell label="验证码" name= "code" placeHoder = "请输入验证码"
            changeInput= {this.changeInputNum.bind(this)}
          slot= { <Verification ref={Verification => this.verification = Verification} sendMsg = { this.sendMsg }/> }
          />
          <div className={style.confirm} onClick={this.confirm}>确定</div>
        </div>
      </div>
    );
  }
}

ChangePhone.propTypes = {
  back: PropTypes.func
}
const mapDispatch = (dispatch) => ({
  subForm (form) {

  },
  toggleModal (msg) {
    const action = commonActionCreators.toggleModal(msg || this.modalText)
    dispatch(action)
  }
})
export default connect(null, mapDispatch)(ChangePhone);