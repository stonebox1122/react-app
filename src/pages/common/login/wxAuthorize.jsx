import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import { withRouter } from 'react-router';
import * as loginActionCreators from '~/common/login/store/actionCreators'
import * as commonActionCreators from '../store/actionCreators';
import {GetQueryString,wechatLogingzh,testPhoneNum} from "$src/common/js/utils"
import {wxLogin, bindwx} from '$src/api'
import {LoadMore} from 'react-weui'
import NavgationBar from '@/NavgationBar'
import Cell from '@/Cell'
// import Verification from '@/Verification'
import style from './index.module.scss'

class Authorize extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      bind: true,
      unionid:"",
      phone: ''
      // code: ''
    }
  }
  componentDidMount() {
    let code = GetQueryString('code'); 
    if (code !== null) {
      // 利用code获取openid并保存在本地
      let query = {
        code,
        token: this.props.token
      }
      wxLogin(query).then(res => {
        this.props.setOpenid(res.data.openid)
        if (res.code === '1') {          
          this.props.setInfo({
            uid: res.data.uid,
            token: res.data.token
          })
          this.props.history.push("/tab/home")
        } else if (res.code === '9') {
          this.setState({
            bind: true,
            unionid: res.data.unionid
          })
        }
      })
    }
  }
  // 输入改变
  changeInputNum (options) {
    this.setState({
      [options.name]: options.v
    })
  }
  // 发送验证码
  // sendMsg = () => {
  //   // 先检测手机号对不对 对的话 发送验证码
  //   let phonenum = this.state.phone
  //   if (testPhoneNum(phonenum)) {
  //     let query = {
  //       mobile: phonenum,
  //       type: '7'
  //     }
  //     sendCode(query).then(res => {
  //       if (res.code !== '1') {
  //         this.props.toggleModal(res.msg)
  //       } else {
  //         // 调用子组件倒计时
  //         this.verification.countdown()
  //       }
  //     })
  //   } else {
  //     this.props.toggleModal('请输入正确的手机号')
  //   }
  // }
  bind = () => {
    let {phonenum, unionid} = this.state
    if (!testPhoneNum(phonenum)) {
      this.props.toggleModal('请输入正确的手机号')
      return
    }
    // if (code.length !== 6) {
    //   this.props.toggleModal('验证码不正确')
    //   return
    // }
    let query = {
      unionid,
      mobile: phonenum,
      type: 1
    }
    bindwx (query).then(res => {
      if (res.code === '1') {
        // 绑定成功重新拉授权
        wechatLogingzh()
      } else {
        this.props.toggleModal(res.msg)
      }
    })
  }
  
  render() { 
    return (<div>
      {
        this.state.bind ?
        <div>
          <NavgationBar right="">绑定手机号</NavgationBar>
          <section className={style['input-wrap']}>
          <Cell
            name="phone"
            placeHoder="请输入您的手机号"
            value={this.state.phone}
            label="手机号"
            changeInput= {this.changeInputNum.bind(this)}
          />
          {/* <Cell
            name="code"
            placeHoder="请输入验证码"
            label="验证码"
            slot= { <Verification ref={Verification => this.verification = Verification} sendMsg = { this.sendMsg }/> }
            changeInput= {this.changeInputNum.bind(this)}
          /> */}
        </section>
      
        {/* 登陆 */}
        <div className={style.login} onClick={this.bind}>确定</div>
        </div>
        :
        <LoadMore loading></LoadMore>
      }
    </div>);
  }
}
const mapState = (state) => ({
  // 这里获取的是合并后的home下的状态
  token: state.getIn(['login', 'token'])
})

const mapDispatch = (dispatch) => ({
  setOpenid (id) {
    const action = loginActionCreators.setOpenid(id)
    dispatch(action)
  },
  setInfo (info) {
    Object.assign(info,{islogin:true})
    const action = loginActionCreators.setInfo(info)
    dispatch(action)
  },toggleModal (msg) {
    const action = commonActionCreators.toggleModal(msg || this.modalText)
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(withRouter(Authorize))
