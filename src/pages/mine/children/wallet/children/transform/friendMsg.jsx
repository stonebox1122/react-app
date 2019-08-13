import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { InputItem, Button } from 'antd-mobile';
import Cell from '@/Cell'
import NavgationBar from '@/NavgationBar'
import Verification from '@/Verification'
import {sendCode, tranferTofriend} from '$src/api'
import * as commonActionCreators from '~/common/store/actionCreators';
import * as mineActionCreators from '~/mine/store/actionCreators'
import style from './friend.module.scss'
class FriendMsg extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      defaultNum: null,
      isDis: true,
      code: "",
      codeDis: true
    }
  }

  changeNum = (v) => {
    let flag = false
    if (v <= 0 || parseFloat(v)> parseFloat(this.props.purse.profitsharing)) {
      flag = true
    } else {
      flag = false
    }
    this.setState({
      defaultNum: v,
      isDis: flag
    })
  }
  // 输入改变
  changeInputNum (options) {
    let { v } = options
    switch (options.name) {
      case 'code':
        if (v.length===6) {
          this.setState({
            code: v,
            codeDis: false
          })
        } else {
          this.setState({
            codeDis: true
          })
        }
        break;
      default:
        break;
    }
  }
  // 发送验证码
  sendMsg = () => {
    // 先检测手机号对不对 对的话 发送验证码
    let phonenum = this.props.userinfo.mobile
    let query = {
      mobile: phonenum,
      type: '4'
    }
    sendCode(query).then(res => {
      if (res.code !== '1') {
        this.props.toggleModal(res.msg)
      } else {
        // 调用子组件倒计时
        this.verification.countdown()
      }
    })
  }

  next = () => {
    let {userid,token, type,msg, payed, toggleModal} = this.props
    let {defaultNum,code} = this.state
    let query = {
      userid, token, 
      price_d: defaultNum,
      tel: type === '0' ? 'fxlr2gwjf' : 'fxlr2fxlr',
      rel_userid: msg.userid,
      code
    }
    tranferTofriend(query).then(res => {
      if (res.code=== '1') {
        payed(defaultNum)
        toggleModal('转账成功')
      } else {
        toggleModal(res.msg)
      }
    })
  }
  
  render() { 
    let {back, type, msg, purse} = this.props
    let {defaultNum, isDis, codeDis} = this.state
    console.log(isDis, codeDis)
    return (
      <div className={ style.frind }>
        <NavgationBar handleLeft={back} right="" >{type === 0 ? '分享利润转购物积分' : '分享利润转分享利润'}</NavgationBar>
        <section className={style.info}>
          <img src={msg.avatar} alt="avatar"/>
          <p>{msg.username}</p>
          <p style={{color: "#999", fontSize:"12px"}}>{msg.userno}</p>
        </section>
        <InputItem
          type="money"
          placeholder={`分享利润剩余${purse.profitsharing}`}
          value={defaultNum}
          extra={<span onClick={()=>this.setState({defaultNum:purse.profitsharing ,isDis: false})} style={{color:"#108EE9"}}>全部</span>}
          onChange={(v)=>this.changeNum(v)}
          moneyKeyboardAlign="left"
          clear
        >金额</InputItem>

        <p className={style.tag}>预计<span>2小时</span>到账</p>
        <div className={style['cell-wrap']}>
          <Cell
            name="code"
            label = "验证码"
            placeHoder="请输入验证码"
            changeInput= {this.changeInputNum.bind(this)}
            slot= { <Verification ref={Verification => this.verification = Verification} sendMsg = { this.sendMsg }/> }
            />
        </div>
        
        <Button 
          onClick={this.next}
          disabled={isDis === true || codeDis === true ? true : false } 
          className="paybtn">确认转账</Button>
      </div>
    );
  }
}

const mapState = state => ({
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token']),
  purse: state.getIn(['mine', 'mineInfo', 'userpurse']).toJS(),
  userinfo: state.getIn(['mine', 'mineInfo', 'userinfo']).toJS(),
})
 
const mapDispatch = dispatch => ({
  toggleModal (msg) {
    const action = commonActionCreators.toggleModal(msg,'成功')
    dispatch(action)
  },
  payed (num) {
    const action = mineActionCreators.changeShare(num,'decrease')
    dispatch(action)
  }
})

FriendMsg.propTypes = {
  back: PropTypes.func
}

export default connect(mapState,mapDispatch)(FriendMsg);