// 确认订单
import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import NavgationBar from '@/NavgationBar'
import Goods2 from '@/Goods/goods_2'
import Address from '~/common/address'
import OrderDetail from '~/common/orderDetail'
import { Cell, CellHeader, CellBody, CellFooter, Icon } from 'react-weui'
import { TextareaItem, Toast } from 'antd-mobile';
import * as cartActionCreators from '../../store/actionCreators'
import * as commonActionCreators from '~/common/store/actionCreators'
import { formatArr } from '$src/common/js/utils'
import {confirmOrder,pointPay} from '$src/api'
import style from './index.module.scss'
class ConfirmOrder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      payWay: 0,
      isShowAddress: false,
      isShowDetail:false,
      orderid: "",
      leaveMsg: '',
      type: 1 // 1激活还是2复销
    }
  }

  componentDidMount() {
    let { userid, token, info } = this.props
    let type = info[0].is_active
    this.setState({
      type
    })
    let currList = info.map(e => {
      let { gid, num, valueid } = e
      return {
        gid, num, valueid
      }
    })
    // 生成订单信息
    let query = {
      userid,
      token,
      idandnumstr: formatArr(currList),
      tel: type === 1 ? 2 : 1
    }
    this.props.getOrder(query)
  }
  subOrder = () => {
    if (this.state.payWay === 1) {
      let num = this.props.order.ordersumprice
      num = num.substring(1)
      if (this.props.order.shoppingpoints >= parseFloat(num)) {
        this.confirmOrderPre(this.pointPay) // 传入积分支付
      } else {
        this.props.showModal('购物积分不足', '失败')
      }
    } else {
      this.confirmOrderPre(this.wxPay) // 传入微信支付
    }
  }
  // 确认下单 3.2 确认订单（预付单）
  confirmOrderPre = (cb) => {
    let {info, userid, token, currentAddress} = this.props
    let newArr = info.map(e => {
      let {gid,num, valueid} = e
      return {gid, num, valueid}
    })
    let query = {
      userid, token, 
      idandnumstr: encodeURI(JSON.stringify(newArr)),
      addressid: currentAddress.addressid,
      buycontent: '',
      tel: this.state.type === 1 ? 2 : 1
    }
    confirmOrder(query).then(res=> {
      if (res.code === '1') {
        cb(res.data)
      } else {
        this.props.showModal(res.msg)
      }
    })
  }
  // 积分支付
  pointPay = (query) => {
    let {orderno, amount:price, orderid} = query
    let info = {
      userid: this.props.userid,
      token: this.props.token,
      orderno, price
    }
    pointPay(info).then(res=> {
      if(res.code === '1') {
        Toast.success('支付成功')
        // 积分支付成功
      } else {
        this.props.showModal(res.msg)
      }
      this.setState({
        isShowDetail: true,
        orderid
      })
    })
  }
  // wx支付
  wxPay = () => {
    
  }
  changeMsg = (e) => {
    this.setState({
      leaveMsg:e
    })
  }
  showAddr = () => {
    let flag = this.state.isShowAddress
    this.setState({
      isShowAddress: !flag
    })
  }
  selectPayWay = (way) => {
    this.setState({
      payWay: way
    })
  }
  renderAddress = () => {
    let {currentAddress} = this.props
    if (currentAddress) {
      return (
        <div className={style['address-info']}>
          <div className={style['address-msg']}>
            <p className={style.title}>收货人：{currentAddress.username}&nbsp;&nbsp;{currentAddress.phone}</p>
            <p className={style.addr}>{currentAddress.address}</p>
          </div>
          <img onClick={this.showAddr} className={style.icon} src={require('$static/img/arrow-right.png')} alt="local"/>
        </div>
      )
    } else {
      return (
        <div className={style.noAddr} onClick={this.showAddr}>
          <img className={style.icon} src={require('$static/img/location.png')} alt="local"/>
          还没有收货地址，去添加
        </div>
      )
    }
  }
  renderGoods = () => {
    let {info,order} = this.props
    return (
      <div>
        <ul>
          {
            info.map((e, i) => {
              return (
                <li key={`${e.gid}${i}`} className={style.item}>
                  <Goods2 height="80px"
                    info={e}
                    bottom_left={<span>{e.pricestr}</span>}
                    bottom_right={
                      <div className={style['bottom-right']}>
                      x{e.num}
                    </div>
                    }
                  />
                </li>
              )
            })
          }
        </ul>
        <Cell className={`${style.cell} ${style.head}`} access>
          <CellBody>配送方式</CellBody>
          <CellFooter className={style.title}>快递{order.deliverprice}</CellFooter>
        </Cell>
        <Cell className={style.cell}>
          <CellBody>商品总额</CellBody>
          <CellFooter className={style.title}>{order.goodssumprice}</CellFooter>
        </Cell>
        <Cell className={style.cell}>
          <CellBody>{order.goodssumpreferential_title}</CellBody>
          <CellFooter className={style.red}>{order.goodssumpreferential}</CellFooter>
        </Cell>
        <Cell className={style.cell}>
          <CellBody>配送费</CellBody>
          <CellFooter className={style.title}>{order.deliverprice}</CellFooter>
        </Cell>
        <Cell className={`${style.cell} ${style.total}`}>
          <CellBody>订单总价</CellBody>
          <CellFooter className={style.red}>{order.ordersumprice}</CellFooter>
        </Cell>
        <Cell className={`${style.cell}`}>
          <CellBody>买家留言：</CellBody>
          <CellFooter>
            <TextareaItem onChange={this.changeMsg.bind(this)}></TextareaItem>
          </CellFooter>
        </Cell>
      </div>
    )
  }
  render() { 
    let {order} = this.props
    const {toggleShowCom } = this.props
    return (
      <div className={style['confirm-order']}>
        <NavgationBar handleLeft={toggleShowCom} right="">
          确认订单
        </NavgationBar>
        <div className={style.wrap}>
          <section className={style.address}>
            {this.renderAddress()}
          </section>
          <section className={style['cart-info']}>
            {this.renderGoods()}
          </section>
          <section className={style['pay-way']}>
            <Cell className={style.cell} onClick={()=>{this.selectPayWay(0)}}>
              <CellHeader>
                <img className={style.img} src={require('$static/img/order_icon_weixin.png')} alt='wechat'/>
              </CellHeader>
              <CellBody>微信</CellBody>
              <CellFooter>
                <Icon value={this.state.payWay=== 0 ?'success' : 'circle'}></Icon>
              </CellFooter>
            </Cell>
            <Cell className={style.cell} onClick={()=>{this.selectPayWay(1)}}>
              <CellHeader>
                <img className={style.img} src={require('$static/img/order_icon_jifen.png')} alt='wechat'/>
              </CellHeader>
              <CellBody>
                <p>购物积分</p>
                <p>剩余{order.shoppingpoints}</p>
              </CellBody>
              <CellFooter>
                <Icon value={this.state.payWay=== 1 ?'success' : 'circle'}></Icon>
              </CellFooter>
            </Cell>
          </section>
          <p className={style.msg}>温馨提示：当天17:00之前下订单，第二天正常发货，超过17:00，延迟一天发货，周日不发货哦亲!</p> 
        </div>
        <div className={style.footer}>
          <div className={style['left-msg']}>
            <p>合计金额：<span className={style.total}>{order.ordersumprice}</span></p>
            <p className={style.discount}>{order.goodssumpreferential_title}:{order.goodssumpreferential}, 含配送费{order.deliverprice}</p>
          </div>
          <div className={style['right-msg']} onClick={this.subOrder}>
            提交订单
          </div>
        </div>
        {
          this.state.isShowAddress?
          <Address back={this.showAddr}/>:"" 
        }
        {
          this.state.isShowDetail ?
          <OrderDetail orderid={this.state.orderid} back={this.showAddr}/>: ""
        }
      </div>
    );
  }
}

const mapState = (state) => ({
  addressList: state.getIn(['cart', 'addressList']),
  order: state.getIn(['cart', 'order']).toJS(),
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token']),
  currentAddress: state.getIn(['address', 'currentAddress']).toJS()
})

const mapDispatch = (dispatch) => ({
  // 是否显示子页面
  toggleShowCom () {
    const action = cartActionCreators.toggleComponent()
    dispatch(action)
  },
  getOrder (query) {
    const action = cartActionCreators.getOrder(query)
    dispatch(action)
  },
  showModal (msg, title) {
    const action = commonActionCreators.toggleModal(msg, title)
    dispatch(action)
  }
})
 
export default connect(mapState, mapDispatch)(ConfirmOrder);