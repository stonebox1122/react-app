import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import NavgationBar from '@/NavgationBar'
import Goods2 from '@/Goods/goods_2'
import Address from '~/common/address'
import { Cell, CellHeader, CellBody, CellFooter, TextArea, Icon } from 'react-weui'
import * as cartActionCreators from '../../store/actionCreators'
import { formatArr } from '$src/common/js/utils'

import style from './index.module.scss'
class ConfirmOrder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      payWay: 0,
      isShowAddress: false
    }
  }

  componentDidMount() {
    let { userid, token, info } = this.props
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
      tel: 2 
    }
    this.props.getOrder(query)
  }
  showAddr = () => {
    let flag = this.state.isShowAddress
    this.setState({
      isShowAddress: !flag
    })
  }
  renderAddress = () => {
    let {addressList} = this.props
    if (addressList.length>0) {
      return (
        <div className={style['address-info']}>
          <div className={style['address-msg']}>
            收货人申东旭
          </div>
          <img className={style.icon} src={require('$static/img/arrow-right.png')} alt="local"/>
        </div>
      )
    } else {
      return (
        <div className={style.noAddr} onClick={this.showAddr}>
          <img className={style.icon} src={require('$static/img/location.png')} alt="local"/>
          还没有收获地址，去添加
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
          <CellBody>商城积分抵扣</CellBody>
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
            <TextArea></TextArea>
          </CellFooter>
        </Cell>
      </div>
    )
  }
  selectPayWay = (way) => {
    this.setState({
      payWay: way
    })
  }
  render() { 
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
              <CellBody>购物积分</CellBody>
              <CellFooter>
                <Icon value={this.state.payWay=== 1 ?'success' : 'circle'}></Icon>
              </CellFooter>
            </Cell>
          </section>
          <p className={style.msg}>温馨提示：当天17:00之前下订单，第二天正常发货，超过17:00，延迟一天发货，周日不发货哦亲!</p> 
        </div>
        <div className={style.footer}>
          <div className={style['left-msg']}>
            <p>合计金额：<span>￥1848.25</span></p>
            <p>商城积分抵扣：12, 含配送费￥121312</p>
          </div>
          <div className={style['right-msg']}>
            提交订单
          </div>
        </div>
        {
          this.state.isShowAddress?
          <Address back={this.showAddr}/>:"" 
        }
      </div>
    );
  }
}

const mapState = (state) => ({
  // list: state.getIn(['cart', 'list']).toJS(),
  addressList: state.getIn(['cart', 'addressList']),
  order: state.getIn(['cart', 'order']).toJS(),
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token'])
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
  }
})
 
export default connect(mapState, mapDispatch)(ConfirmOrder);