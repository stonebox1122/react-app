import React, { PureComponent } from 'react'
import NavgationBar from '@/NavgationBar'

class Login extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      right: '短信登录'
    }
  }
  render () {
    const rightItem = <span>{this.state.right}</span>

    return (
      <div>
        <NavgationBar
          // left = { rightItem } // 类似vue的具名插槽
          right = { rightItem }
        >
          {/* 类似vue的匿名插槽 */}
          <div>center</div>
        </NavgationBar>
      </div>
    )
  }
}
export default Login