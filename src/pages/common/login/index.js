import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import { LoadMore } from 'react-weui'
import NavgationBar from '@/NavgationBar'
import Cell from '@/Cell'
import Verification from '@/Verification'

import style from './index.module.scss'

class Login extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      right: 0 // 0 账号登陆 1短信登陆
    }
  }

  changeLogin = () => {
    let right
    this.state.right ? right = 0 : right = 1
    this.setState({
      right: right
    })
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
        { 
          !this.state.right ?
          <section className={style['input-wrap']}>
            <Cell
              placeHoder="请输入您的手机号"
              label="账号"
            />
            <Cell
              placeHoder="请输入密码"
              label="密码"
              type= "password"
            />
          </section>
          :
          <section className={style['input-wrap']}>
            <Cell
              placeHoder="请输入您的手机号"
              label="手机号"
            />
            <Cell
              placeHoder="请输入验证码"
              label="验证码"
              solt= { <Verification/> }
            />
          </section>
        }

        {/* 登陆 */}
        <div className={style.login}>登录</div>

        {/* menu */}
        <div className={ style.menu }>
          <p>还没账户？<Link to="/registered" className={style.highlight}>立即注册</Link></p>
          <p hidden = {this.state.right === 1}>忘记密码？</p>
        </div>

        {/* 第三方登陆 */}
        <section className={style['third-login-wrap']}>
          <LoadMore showLine>或从以下方式登录</LoadMore>
          <div className={style['third-login']}>
            <img className={style.icon} alt="img" src={require('./img/login_btn_weixin.png')}/>
            <img className={style.icon} alt="img" src={require('./img/login_btn_qq.png')}/>
            <img className={style.icon} alt="img" src={require('./img/login_btn_weibo.png')}/>
          </div>
        </section>
        
        {/* 底部花边 */}
        <img className={style.footer} alt="img" src={require('./img/login_image.png')}></img>
      </div>
    )
  }
}
export default Login