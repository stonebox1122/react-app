import React, { PureComponent } from 'react'
import { connect  } from 'react-redux';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';
import NavgationBar from '@/NavgationBar'
import {wxshare} from '$src/common/js/wxShare'
import Cell from '@/Cell'
import Verification from '@/Verification'
import { testPhoneNum, GetQueryString } from '$src/common/js/utils'
import * as actionCreators from './store/actionCreators';
import * as commonActionCreators from '../store/actionCreators';
import { sendCode, subRegistered, initPer } from '$src/api'
import style from './index.module.scss'

class Registered extends PureComponent {
  constructor (props) {
    super(props)
    this.state = {
      truename: '',
      share: '',
      phone: '',
      code: '',
      id: ''
    }
  }
  componentDidMount() {
    let id = GetQueryString('id');
    this.setState({
      id
    })
    this.initPerson(id)
    wxshare({
      imgUrl: require("$static/img/icon-72@2x.png"),
      desc: '注册加入吉善商城',
      title: '吉善商城-注册',
      link: "http://js.qiankaiwangluo.com/registered"
    })
  }
  
  // 注册
  registered = () => {
    // 表单校验
    let { share, phone, code, id } = this.state

    if (!testPhoneNum(phone)) {
      this.props.toggleModal('请输入正确的手机号')
      return
    }
    if (code.length !== 6) {
      this.props.toggleModal('请输入正确的验证码')
      return
    }
    let query = {
      refno: id === '' ? share : id,
      mobile: phone,
      code
    }
    this.props.subForm(query)
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
      case 'share':
        this.setState({
          share: v
        })
        // 这里调接口查询
        if (v.length>=4) {
          this.initPerson(v)
        }
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
  initPerson (refno) {
    if (!refno) return
    initPer({refno}).then(res => {
      console.log(res);
      if (res.code === '1') {
        this.setState({
          truename: res.data.truename
        })
      } else {
        this.setState({
          truename: '没有该分享人'
        })
      }
    })
  }
  render () {
    // navbar的右侧
    const rightItem = <Link to="/login" className={style['right-item']}>登录</Link>
    return (
      <div className={style.cover}>
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
            value={this.state.id ? this.state.id : this.state.share}
            disabled={this.state.id ? true : false}
            changeInput= {this.changeInputNum.bind(this)}
            slot={<span>{this.state.truename}</span>}
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
            slot= { <Verification ref={Verification => this.verification = Verification} sendMsg = { this.sendMsg }/> }
          />
        </section>
        {/* 登陆 */}
        <div className={style.login} onClick={this.registered}>立即注册</div>

        {/* 底部花边 */}
        <img className={style.footer} alt="img" src={require('./img/login_image.png')}></img>
      </div>
    )
  }
}

const mapDispatch = (dispatch) => ({
  subForm (form) {
    subRegistered(form).then(res => {
      if (res.code === '1') {
        let info = Object.assign(res.data, {islogin: true})
        dispatch(actionCreators.setInfo(info))
        console.log(this);
        this.history.push({
          pathname: '/tab/mine'
        })
      } else {
        dispatch(commonActionCreators.toggleModal(res.msg))
      }
    })
    // const action =  actionCreators.registered(form)
    // dispatch(action)
  },
  toggleModal (msg) {
    const action = commonActionCreators.toggleModal(msg || this.modalText)
    dispatch(action)
  }
})

export default connect(null, mapDispatch)(withRouter(Registered))
