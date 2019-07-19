import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { Modal } from 'antd-mobile'
import NavgationBar from '@/NavgationBar'
import Cell from '@/Cell'
import Verification from '@/Verification'
import { testPhoneNum } from '$src/common/js/utils'

import { sendCode } from '$src/api'
import style from './index.module.scss'

class Login extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      share: '',
      phone: '',
      code: '',
      modal: false,
      errText: ""
    }
  }
  onClose = () => {
    let flag = this.state.modal;
    this.setState({
      modal: !flag
    })
  }
  // 注册
  registered = () => {

  }
  // 发送验证码
  sendMsg = () => {
    // 先检测手机号对不对 对的话 发送验证码
    let phonenum = this.state.phone
    if (testPhoneNum(phonenum)) {
      let query = {
        mobile: phonenum,
        type: '1'
      }
      sendCode(query).then(res => {
        console.log(res)
      })
    } else {
      this.setState({
        modal: true,
        errText: '请输入正确的手机号'
      })
    }
  }
  // 输入改变
  changeInputNum (options) {
    let { v } = options
    switch (options.name) {
      case 'share':
        this.setState({
          share: v
        })
        break;
      case 'phone':
        this.setState({
          phone: v
        })
        break;
      case 'code':
        this.setState({
          code: v
        })
        break;
      default:
        break;
    }
  }
  render () {
    // navbar的右侧
    const rightItem = <Link to="/login" className={style['right-item']}>登录</Link>

    return (
      <div>
        {/* 顶部导航 */}
        <NavgationBar
          right = { rightItem } // 类似vue的具名插槽
        >
          {/* 类似vue的匿名插槽 */}
          <div>注册</div>
        </NavgationBar>
        {/* 输入框 */}
        <section className={style['input-wrap']}>
          <Cell
            name="share"
            label = "分享人"
            placeHoder="请输入分享人ID"
            changeInput= {this.changeInputNum.bind(this)}
          />
          <Cell
            name="phone"
            label = "手机号"
            placeHoder="请输入您的手机号"
            changeInput= {this.changeInputNum.bind(this)}
          />
          <Cell
            name="code"
            label = "验证码"
            placeHoder="请输入验证码"
            changeInput= {this.changeInputNum.bind(this)}
            slot= { <Verification sendMsg = { this.sendMsg }/> }
          />
        </section>
        {/* 登陆 */}
        <div className={style.login} onClick={this.registered}>立即注册</div>

        {/* 底部花边 */}
        <img className={style.footer} alt="img" src={require('./img/login_image.png')}></img>

        {/* 弹窗 */}

        <Modal
          visible={this.state.modal}
          transparent
          maskClosable={true}
          title="错误"
          footer={[{ text: '确定', onPress: () => {  this.onClose(); } }]}
        >
          { this.state.errText }
        </Modal>

      </div>
    )
  }
}
export default Login