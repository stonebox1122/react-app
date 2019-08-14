import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { InputItem, Button,List } from 'antd-mobile';
import NavgationBar from '@/NavgationBar'
import WithdrawList from './list'
import Verification from '@/Verification'
import {initWithdraw, sendCode, withdraw} from '$src/api'
import Cell from '@/Cell'
import * as commonActionCreators from '~/common/store/actionCreators'
import * as mineActionCreators from '~/mine/store/actionCreators'

import style from './index.module.scss'

const Item = List.Item;
const Brief = Item.Brief;

class Withdraw extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      isShowCom: false,
      num: null,
      isDis: true,
      defaultInfo: null,
      code: "",
      codeDis: true
    }
  }

  componentDidMount() {
    this.getInfo()
  }
  
  getInfo = () => {
    let {userid, token, showModal} = this.props
    let query = {
      userid, token
    }
    initWithdraw(query).then(res => {
      if (res.code === '1') {
        this.setState({
          defaultInfo: res.data
        })
        // console.log(res.data)
      } else {
        showModal(res.msg)
      }
    })
  }

  showCom =()=> {
    let flag = this.state.isShowCom
    this.setState({
      isShowCom: !flag
    })
  }
  changeNum = (v) => {
    let flag = false
    if (v <= 0 || parseFloat(v)> parseFloat(this.props.purse.profitsharing)) {
      flag = true
    } else {
      flag = false
    }
    this.setState({
      num: v,
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
    let query = {
      mobile: this.state.defaultInfo.mobile,
      type: '5'
    }
    sendCode(query).then(res => {
      if (res.code !== '1') {
        this.props.showModal(res.msg)
      } else {
        // 调用子组件倒计时
        this.verification.countdown()
      }
    })
  }
  withdraw = () => {
    let { userid, token, showModal,withdrawSuccess } = this.props;
    let { code, num:price } = this.state
    let query = {userid, token, code, price}
    withdraw(query).then(res => {
      if (res.code === '1') {
        showModal('已成功提交提现申请','成功')
        withdrawSuccess(price)
      } else {
        showModal(res.msg)
      }
    })
  } 
  
  render() { 
    let {back, purse} = this.props
    let {isShowCom, num, isDis, defaultInfo, codeDis } = this.state
    return (
      <div className={ style.withdraw }>
        <NavgationBar handleLeft={back} right="提现记录" handleRight={this.showCom}>分享利润提现</NavgationBar>
        <section className={style.in}>
          <p className={style.title}>提现金额</p>
          <InputItem
            type="money"
            value={num}
            placeholder="请输入提现金额"
            moneyKeyboardAlign="left"
            extra="¥"
            onChange={v=>this.changeNum(v)}
            clear
          >金额</InputItem>
          <p className={style.leave}>
            <span>分享利润剩余 {purse.profitsharing}</span>
            <span style={{color: "#108EE9"}} onClick={()=>this.onChange({num: purse.profitsharing})}>全部提现</span>
          </p>
        </section>
        <section className={style['bank-num']}>
          <p className={`${style.title}`}>提现到</p>
          {
            defaultInfo !== null ? 
              <List>
                <Item
                  arrow="horizontal"
                  thumb={require('../../img/wallet_withdraw_icon_card.png')}
                  onClick={() => {}}
                >
                  {defaultInfo.bankname}({defaultInfo.bankaccount.substring(defaultInfo.bankaccount.length-4)}) <Brief>提现收取5%手续费</Brief>
                </Item>
              </List>
            : <div>暂未添加银行卡</div>
          }
        </section>

        <section className={style['bank-num']}>
          <Cell
            name="code"
            label = "验证码"
            placeHoder="请输入验证码"
            changeInput= {this.changeInputNum.bind(this)}
            slot= { <Verification ref={Verification => this.verification = Verification} sendMsg = { this.sendMsg }/> }
            />
            <p className={style.todate}>预计收益到账时间<span style={{color:"red"}}>{defaultInfo&&defaultInfo.todate}</span></p>
        </section>

        <Button onClick={this.withdraw} disabled={isDis === true || codeDis === true ? true : false } className="paybtn">申请提现</Button>
        {
          isShowCom ? 
          <WithdrawList back={this.showCom} />: ""
        }
      </div>
    );
  }
}

const mapState = state => ({
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token']),
  purse: state.getIn(['mine', 'mineInfo', 'userpurse']).toJS()
})
 
const mapDispatch = dispatch => ({
  showModal (msg, title) {
    const action = commonActionCreators.toggleModal(msg, title)
    dispatch(action)
  },
  withdrawSuccess (num) {
    const action = mineActionCreators.changeShare(num,'decrease')
    dispatch(action)
  }
})

Withdraw.propTypes = {
  back: PropTypes.func
}

export default connect(mapState,mapDispatch)(Withdraw);