import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import NavgationBar from '@/NavgationBar'
import Goods2 from '@/Goods/goods_2'
import NumberController from '@/NumberController'
import { Cell, CellHeader, CellBody, CellFooter, TextArea, Icon } from 'react-weui'
import * as actionCreator from '../../store/actionCreator'

import style from './index.module.scss'
class ConfirmOrder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      payWay: 0
    }
  }
  renderAddress = () => {
    let {addressList} = this.props
    if (addressList.length>0) {
      return (
        <div className={style['address-info']}>
          address
        </div>
      )
    } else {
      return (
        <div className={style.noAddr}>
          还没有收获地址，去添加
        </div>
      )
    }
  }
  renderGoods = () => {
    const {list, changeNum} = this.props
    return (
      <div>
        <ul>
          {
            list.map(e => {
              return (
                <li key={e.id}>
                  <Goods2 height="80px"
                    // info={}
                    bottom_left={<span>{e.price}</span>}
                    bottom_right={
                      <div className={style['bottom-right']}>
                      <NumberController
                        num={e.num}
                        handleDecrease={() => changeNum({id: e.id, way: 'decrease'})}
                        handleIncrease={() => changeNum({id: e.id, way: 'increase'})}/>
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
          <CellFooter className={style.title}>快递￥250</CellFooter>
        </Cell>
        <Cell className={style.cell}>
          <CellBody>商品总额</CellBody>
          <CellFooter className={style.title}>￥250</CellFooter>
        </Cell>
        <Cell className={style.cell}>
          <CellBody>商城积分抵扣</CellBody>
          <CellFooter className={style.red}>-¥156.56</CellFooter>
        </Cell>
        <Cell className={style.cell}>
          <CellBody>配送费</CellBody>
          <CellFooter className={style.title}>¥250.00</CellFooter>
        </Cell>
        <Cell className={`${style.cell} ${style.total}`}>
          <CellBody>订单总价</CellBody>
          <CellFooter className={style.red}>¥250.00</CellFooter>
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
    const {toggleShowCom} = this.props
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
      </div>
    );
  }
}

const mapState = (state) => ({
  list: state.getIn(['cart', 'list']).toJS(),
  addressList: state.getIn(['cart', 'addressList'])
})

const mapDispatch = (dispatch) => ({
  // 是否显示子页面
  toggleShowCom () {
    const action = actionCreator.toggleComponent()
    dispatch(action)
  },
  // 修改
  changeNum (option) {
    const action=actionCreator.changeNum(option)
    dispatch(action)
  }
})
 
export default connect(mapState, mapDispatch)(ConfirmOrder);