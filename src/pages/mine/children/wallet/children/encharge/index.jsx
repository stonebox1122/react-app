import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Tabs, InputItem, Button, Toast } from 'antd-mobile';
import NavgationBar from '@/NavgationBar'
import EnchargeList from './list'
import {wxEncharge} from '$src/api'
import {wxGZHpay} from '$src/common/js/wxPay'
import * as commonActionCreators from '~/common/store/actionCreators'
import * as mineActionCreators from '~/mine/store/actionCreators'
import style from './index.module.scss'
import './index.scss'
class Encharge extends Component {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
      isShowCom: false,
      dis: true,
      num: 0
    }
  }
  showCom =()=> {
    let flag = this.state.isShowCom
    this.setState({
      isShowCom: !flag
    })
  }
  setVal = (v) => {
    if (v=== '') {
      this.setState({
        dis:true
      })
    } else {
      this.setState({
        num: v,
        dis: false
      })
    }
  }
  encharge = () => {
    let {userid, token, ua, showModal, openid} = this.props
    let type = this.state.type
    if (ua !== 'wechat') {
      showModal('请在微信中打开')
      return
    }
    let query = {
      userid, token, 
      title: type === 0 ? '充值商城积分' : '充值购物积分',
      amount: this.state.num,
      sys_type: 3,
      openid,
      pay_type: type+=1
    }
    wxEncharge(query).then(res => {
      if (res.code === '1') {
        wxGZHpay(res.data, this.cb)
      } else {
        showModal(res.msg)
      }
    })
  }
  // 微信支付的回调
  cb = (type) => {
    if (type === 'success') {
      Toast.success('充值成功')
      // 充值成功,修改本地钱包数据
      if (this.state.type === 0) {
        this.props.changeMallPoint(this.state.num, 'increase')
      } else {
        this.props.changeShopPoint(this.state.num, 'increase')
      }
    } else {
      this.props.showModal(type)
    }
  }
  render() { 
    const tabs = [
      { title: '充值商城积分', key: 0 },
      { title: '充值购物积分', key: 1 },
    ];
    let {back} = this.props
    let {type, isShowCom, dis} = this.state
    return (
      <div className={ style.encharge }>
        <NavgationBar handleLeft = {back} right="充值记录" handleRight={this.showCom}>充值</NavgationBar>
        <Tabs tabs={tabs} initialPage={type} onChange={(tab, index) => { this.setState({type:index})}}></Tabs>
        <InputItem
          type="money"
          placeholder="0.00"
          extra="¥"
          clear
          onChange= {this.setVal}
        >金额</InputItem>
        <section className={style.card}>
          <p className={style.title}>支付方式</p>
          <div className={style.tag}>微信</div>
        </section>
        <Button disabled={dis} className="paybtn" onClick={this.encharge}>立即支付</Button>
        {
          isShowCom ? 
          <EnchargeList type={type} back={this.showCom} />: ""
        }
      </div>
    );
  }
}

const mapState = state => ({
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token']),
  openid: state.getIn(['login', 'openid']),
  ua: state.getIn(['login', 'ua'])
})
 
const mapDispatch = dispatch => ({
  showModal (msg, title) {
    const action = commonActionCreators.toggleModal(msg, title)
    dispatch(action)
  },
  changeMallPoint (num, flag) {
    const action = mineActionCreators.changeMallpoint(num, flag)
    dispatch(action)
  },
  changeShopPoint (num, flag) {
    const action = mineActionCreators.changeShoppoint(num, flag)
    dispatch(action)
  }
})

Encharge.propTypes = {
  back: PropTypes.func
}

export default connect(mapState,mapDispatch)(Encharge);