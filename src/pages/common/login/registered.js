import React, { PureComponent } from 'react'
import { Link } from 'react-router-dom'
import NavgationBar from '@/NavgationBar'
import Cell from '@/Cell'
import Verification from '@/Verification'


import style from './index.module.scss'

class Login extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {}
  }

  login = () => {

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
            label = "分享人"
            placeHoder="请输入分享人ID"
          />
          <Cell
            label = "手机号"
            placeHoder="请输入您的手机号"
          />
          <Cell
            label = "验证码"
            placeHoder="请输入验证码"
            solt= { <Verification/> }
          />
        </section>
        {/* 登陆 */}
        <div className={style.login}>立即注册</div>

        
        {/* 底部花边 */}
        <img className={style.footer} alt="img" src={require('./img/login_image.png')}></img>
      </div>
    )
  }
}
export default Login