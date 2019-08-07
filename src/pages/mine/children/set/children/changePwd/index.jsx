import React, { PureComponent } from 'react';
import { NavBar, Icon, Toast } from 'antd-mobile';
import Cell from '@/Cell'
import { connect  } from 'react-redux';
import * as commonActionCreators from '~/common/store/actionCreators';
import PropTypes from 'prop-types'
import Verification from '@/Verification'
import { testPhoneNum } from '$src/common/js/utils'
import { sendCode, verficationCode, changePwd } from '$src/api'
import style from './index.module.scss'
class ChangePwd extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      com: 1,
      phone: '',
      code: '',
      pwd: '',
      newPwd: ""
     }
  }
  // 发送验证码
  sendMsg = () => {
    // 先检测手机号对不对 对的话 发送验证码
    let {phone} = this.state
    if (testPhoneNum(phone)) {
      let query = {
        mobile: phone,
        type: '6'
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
  // 验证验证码
  verificationCode = () => {
    let {phone, code} = this.state

    if (testPhoneNum(phone) && code.length === 6) {
      let query = {
        userid: this.props.userid,
        mobile: phone,
        type: 2,
        code
      }
      verficationCode(query).then(res => {
        if (res.code === '1') {
          this.setState({
            com: 2
          })
        } else {
          this.props.toggleModal(res.msg)
        }
      })
    } else {
      this.props.toggleModal('手机号/验证码不正确')
    }
  }
  // 确定
  confirm = () => {
    let {pwd, newPwd} = this.state
    let {userid, token, back} = this.props
    if (pwd.length<6 || pwd.length>16 || pwd!== newPwd) {
      this.props.toggleModal('密码设置错误')
    }else {
      let query = {
        userid, token ,
        password: pwd,
        copy_password: newPwd
      }
      changePwd(query).then(res => {
        if (res.code === '1') {
          Toast.success('修改成功')
          back()
        } else {
          this.props.toggleModal(res.msg)
        }
      })
    }
  }
  // 输入改变
  changeInputNum (options) {
    let { name, v } = options
    this.setState({
      [name]: v
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
        >修改密码</NavBar>
        <div  className={style.container}>
          {
            this.state.com === 1 ? 
            <section>
              <Cell name="phone" changeInput= {this.changeInputNum.bind(this)} label="手机号" placeHoder = "请输入手机号"/>
              <Cell name= "code" placeHoder = "请输入验证码" label="验证码"
                changeInput= {this.changeInputNum.bind(this)}
              slot= { <Verification ref={Verification => this.verification = Verification} sendMsg = { this.sendMsg }/> }
              />
              <div className={style.next} onClick={this.verificationCode}>下一步</div>
            </section> : ""
          }
          {
            this.state.com === 2 ? 
            <section>
              <Cell name="pwd"
                changeInput= {this.changeInputNum.bind(this)}
                label="密码"
                type="password"
                placeHoder = "请设置密码(6~16位字母或数字)"/>
              <Cell name= "newPwd" 
                placeHoder = "请输入验证码" 
                type="password"
                label="验证码"
                changeInput= {this.changeInputNum.bind(this)}/>
              <div className={style.next} onClick={this.confirm}>确定</div>
            </section> : ""
          }
        </div>
      </div>
    );
  }
}

ChangePwd.propTypes = {
  back: PropTypes.func
}

const mapState = state => ({
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token'])
})

const mapDispatch = (dispatch) => ({
  subForm (form) {

  },
  toggleModal (msg) {
    const action = commonActionCreators.toggleModal(msg || this.modalText)
    dispatch(action)
  }
})
export default connect(mapState, mapDispatch)(ChangePwd);