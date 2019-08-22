import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';
import { connect  } from 'react-redux';
import { LoadMore } from 'react-weui'
import NavgationBar from '@/NavgationBar'
import Cell from '@/Cell'
import Verification from '@/Verification'
import { testPhoneNum, wechatLogingzhDefault, wechatLogingzh } from '$src/common/js/utils'
import * as actionCreators from './store/actionCreators';
import * as commonActionCreators from '../store/actionCreators';
import style from './index.module.scss'
import { sendCode, loginByPwd, loginByCode } from '$src/api'

class Login extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      right: 0, // 0 账号登陆 1短信登陆
      acc: '',
      pwd: '',
      phone: '',
      code: ''
    }
  }
  // 改变登陆方式
  changeLogin = () => {
    let right
    this.state.right ? right = 0 : right = 1
    this.setState({
      right: right,
      acc: '',
      phone: '',
      pwd: '',
      code: ''
    })
  }
  // 发送验证码
  sendMsg = () => {
    // 先检测手机号对不对 对的话 发送验证码
    let phonenum = this.state.phone
    if (testPhoneNum(phonenum)) {
      let query = {
        mobile: phonenum,
        type: '2'
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
    let { v } = options
    switch (options.name) {
      case 'acc':
        this.setState({
          acc: v
        })
        break;
      case 'pwd':
        this.setState({
          pwd: v
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

  // 登陆
  login = () => {
    let { acc, pwd, phone, code, right } = this.state
    if (right) {
      // 短信登陆
      if (!testPhoneNum(phone)) {
        this.props.toggleModal('请输入正确的手机号')
        return
      }
      if (code.length !== 6) {
        this.props.toggleModal('请输入正确的验证码')
        return
      }
      let query = {
        mobile: phone,
        code,
        sys: 3
      }
      this.props.loginByCode(query)
    } else {
      // 账号密码登陆
      if (acc.length < 4 || acc.length > 6) {
        this.props.toggleModal('账号错误')
        return
      }
      if (pwd.length < 6 || pwd.length > 12) {
        this.props.toggleModal('密码错误')
        return
      }
      
      let query = {
        userno: acc,
        password: pwd,
        sys: 3
      }
      this.props.loginByPwd(query)
    }
  }

  wxLogin = () => {
    wechatLogingzh()
  }

  render () {
    // navbar的右侧
    const rightItem = <span className={style['right-item']}>{!this.state.right ? '短信登录' : '账户登录'}</span>
    return (
      <div>
        {/* 顶部导航 */}
        <NavgationBar
          right = { rightItem } // 类似vue的具名插槽
          handleRight = {this.changeLogin}
        >
          {/* 类似vue的匿名插槽 */}
          <div>登录</div>
        </NavgationBar>
        {/* 输入框 */}
        <section className={style['input-wrap']} style={!this.state.right ? {display: 'block'} : { display: 'none'}}>
          <Cell
            name="acc"
            placeHoder="请输入您账号"
            value={this.state.acc}
            label="账号"
            changeInput= {this.changeInputNum.bind(this)}
          />
          <Cell
            name="pwd"
            placeHoder="请输入密码"
            label="密码"
            type= "password"
            changeInput= {this.changeInputNum.bind(this)}
          />
        </section>
        <section className={style['input-wrap']} style={this.state.right ? {display: 'block'} : { display: 'none'}}>
          <Cell
            name="phone"
            placeHoder="请输入您的手机号"
            value={this.state.phone}
            label="手机号"
            changeInput= {this.changeInputNum.bind(this)}
          />
          <Cell
            name="code"
            placeHoder="请输入验证码"
            label="验证码"
            slot= { <Verification ref={Verification => this.verification = Verification} sendMsg = { this.sendMsg }/> }
            changeInput= {this.changeInputNum.bind(this)}
          />
        </section>
      
        {/* 登陆 */}
        <div className={style.login} onClick={this.login}>登录</div>

        {/* menu */}
        <div className={ style.menu }>
          <p>还没账户？<Link to="/registered" className={style.highlight}>立即注册</Link></p>
          <p hidden = {this.state.right === 1}>忘记密码？</p>
        </div>

        {/* 第三方登陆 */}
        <section className={style['third-login-wrap']}>
          <LoadMore showLine>或从以下方式登录</LoadMore>
          <div className={style['third-login']}>
            <img className={style.icon} alt="img" onClick={this.wxLogin} src={require('./img/login_btn_weixin.png')}/>
            {/* <img className={style.icon} alt="img" src={require('./img/login_btn_qq.png')}/>
            <img className={style.icon} alt="img" src={require('./img/login_btn_weibo.png')}/> */}
          </div>
        </section>
        
        {/* 底部花边 */}
        <img className={style.footer} alt="img" src={require('./img/login_image.png')}></img>

      </div>
    )
  }
}

const mapState = state => ({
  ua: state.getIn(['login', 'ua'])
})

const mapDispatch = (dispatch) => ({
  // 账号密码登陆
  loginByPwd(form) {
    loginByPwd(form).then(res => {
      if (res.code === '1') {
        let info = Object.assign(res.data, {islogin: true})
        dispatch(actionCreators.setInfo(info))
        console.log(this.ua);
        if (this.ua === 'wechat') {
          wechatLogingzhDefault()
        } else {
          this.history.push({
            pathname: '/tab/home'
          })
        }
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
    })
  },
  // 验证码登陆
  loginByCode(form) {
    loginByCode(form).then(res => {
      if (res.code === '1') {
        let info = Object.assign(res.data, {islogin: true})
        dispatch(actionCreators.setInfo(info))
        if (this.ua === 'wechat') {
          wechatLogingzhDefault()
        } else {
          this.history.push({
            pathname: '/tab/home'
          })
        }
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
    })
  },
  toggleModal (msg) {
    const action = commonActionCreators.toggleModal(msg || this.modalText)
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(withRouter(Login))
