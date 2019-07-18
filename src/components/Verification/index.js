// 获取验证码组件
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './index.module.scss'
class Verification extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      msg: '获取验证码'
     }
  }
  countdown = () => {
    // 倒计时中点击无效
    if (this.state.msg !== '获取验证码') {
      return
    }
    // 调用父组件发送验证码接口 发送成功了开始倒计时
    if(!this.props.sendMsg()) {
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

Verification.propTypes = {
  sendMsg: PropTypes.func
}

export default Verification;