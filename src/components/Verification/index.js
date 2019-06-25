// 获取验证码组件
import React, { PureComponent } from 'react';
import style from './index.module.scss'
class Verification extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      msg: '获取验证码'
     }
  }
  countdown = () => {
    if (this.state.msg !== '获取验证码') {
      return
    }
    let i = 60
    let timer = setInterval(() =>{
      i--
      if (i<=0) {
        this.setState({
          msg: '获取验证码'
        })
        clearInterval(timer)
        return
      }
      this.setState({
        msg: `${i}s`
      })
    }, 1000)
  }
  render() { 
    return (
      <div className={ style.verification } onClick={ this.countdown }>
        { this.state.msg }
      </div>
    );
  }
}
 
export default Verification;