import React, { PureComponent } from 'react'
import NavgationBar from '@/NavgationBar'
import style from './index.module.scss'

class Login extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      right: '短信登录'
    }
  }

  changeLogin = () => {
    let type
    this.state.right === '短信登录' ? type= '账户登录' : type = '短信登录'
    this.setState({
      right: type
    })
  }

  render () {
    const rightItem = <span className={style['right-item']}>{this.state.right}</span>

    return (
      <div>
        <NavgationBar
          // left = { rightItem } // 类似vue的具名插槽
          right = { rightItem }
          handleRight = {this.changeLogin}
        >
          {/* 类似vue的匿名插槽 */}
          <div>登录</div>
        </NavgationBar>
      </div>
    )
  }
}
export default Login