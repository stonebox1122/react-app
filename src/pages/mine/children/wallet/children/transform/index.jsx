import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import { Tabs, InputItem, Button, Modal } from 'antd-mobile';
import TransfromList from './list'
import FriendMsg from './friendMsg'
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
import style from './index.module.scss'
import * as mineActionCreators from '~/mine/store/actionCreators'
import * as commonActionCreators from '~/common/store/actionCreators'

import {getFriendInfo} from '$src/api'
class Transform extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      type: 0,
      flag: 0,
      defaultNum: null,
      isShowCom: false,
      isDis: true,
      friendAcc: '',
      friendMsg: {},
      showFriend: false
    }
  }

  showCom =()=> {
    let flag = this.state.isShowCom
    this.setState({
      isShowCom: !flag
    })
  }
  setAll = () => {
    this.setState({
      defaultNum: this.props.purse.profitsharing
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
      defaultNum: v,
      isDis: flag
    })
  }

  // 下一步, 根据id获取朋友的信息
  next = () => {
    let {userid, token} = this.props 
    let query = {
      userid, token, rel_username: this.state.friendAcc
    }
    getFriendInfo(query).then(res => {
      if (res.code === '1') {
        this.setState({
          friendMsg: res.data,
          showFriend: true
        })
      } else {
        this.props.showModal(res.msg)
      }
    })
  }

  render() { 
    let {back,purse , transToSelf, token, userid} = this.props;
    let {type,flag,isShowCom,defaultNum, isDis,friendAcc, showFriend, friendMsg} = this.state;
    const tabs = [
      { title: '转给自己', key: 0 },
      { title: '转给朋友', key: 1 },
    ];
    return (
      <div className={ style.Transform }>
        <NavgationBar handleLeft = {back} right="转账记录" handleRight={this.showCom}>转账</NavgationBar>
        <Tabs tabs={tabs} initialPage={type} onChange={(tab, index) => { this.setState({type:index, flag: 0})}}></Tabs>
        <section>
          <div className={style['card-wrap']} >
            <div onClick={() => this.setState({flag:0})} className={`${style.card} ${ flag=== 0 ? style.active: ""}`}>
              <p>分享利润转购物积分</p>
              <p className={style['sub-title']}>分享利润剩余{purse.profitsharing}</p>
            </div>
            {
              type === 1 ?
              <div onClick={() =>this.setState({flag:1})} className={`${style.card} ${ flag=== 1 ? style.active: ""}`}>
                <p>分享利润转分享利润</p>
                <p className={style['sub-title']}>分享利润剩余{purse.profitsharing}</p>
              </div>: ""
            }
          </div>
          {
            type === 0 ?
            <InputItem
              type="money"
              placeholder="0.00"
              value={defaultNum}
              extra={<span onClick={this.setAll} style={{color:"#108EE9"}}>全部</span>}
              onChange={(v)=>this.changeNum(v)}
              moneyKeyboardAlign="left"
              clear
            >金额</InputItem>
            :
            <InputItem
              placeholder="请输入对方ID账号"
              value={friendAcc}
              clear
              onChange={v=>this.setState({friendAcc: v})}
            >对方账户</InputItem>
          }
          
        </section>
        {
          type === 0 ?
          <Button
            disabled={isDis}
            className="paybtn"
            onClick={() => 
              Modal.alert('转账',`是否确认转账给自己${defaultNum}`, [
                { text: '取消', onPress: () => console.log('cancel') },
                { text: '确定', onPress: () =>{transToSelf({userid,token,price_d: defaultNum, tel: "fxlr2gwjf"})} }
              ])
            }>确认转账</Button>
          :
          <Button 
            onClick={this.next}
            disabled={friendAcc.length > 0 ? false : true} 
            className="paybtn">下一步</Button>
        }
        {
          isShowCom ? 
          <TransfromList  back={this.showCom} />: ""
        }
        {
          showFriend ?
          <FriendMsg type={type} msg={friendMsg} back={() => this.setState({showFriend: false})} />:""
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
  transToSelf (query) {
    const action = mineActionCreators.transferToSelf(query)
    dispatch(action)
  }
})

Transform.propTypes = {
  back: PropTypes.func
}

export default connect(mapState,mapDispatch)(Transform);