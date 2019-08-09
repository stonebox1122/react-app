// 订单详情， 主要是订单的包含商品信息
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import Goods2 from '@/Goods/goods_2'

import style from './index.module.scss'
class OrderDetail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  orderState = (v) => {
    switch (v) {
      case 1:
        return '待付款';
      case 2:
        return '待发货';
      case 3:
        return '待收货';
      case 4:
        return '待评论';
      default:
        break;
    }
  }
  stateHandle = (v) => {
    switch (v) {
      case 1:
        return (
          <span className={style.tag}>付款</span>
        );
      case 2:
        return (
          <span className={style.tag}>提醒发货</span>
        );
      case 3:
        return (
          <span className={style.tag}>确认收货</span>
        );
      case 4:
        return (
          <span className={style.tag}>评价</span>
        );
      default:
        break;
    }
  }
  render() {
    let {info} = this.props
    return (
      <div className={style.card}>
        {
          info ? 
          <div>
            <header className={style.header}>
              <div className={style.left}>
                <div>{info.userno} {info.truename}</div>
                <div className={style.orderno}>订单编号：{info.orderno}</div>
              </div>
              <div className={style.state}>
                { this.orderState(info.orderstate) }
              </div>
            </header>
            <ul className={style.container}>
              {
                info.goodslist ?
                info.goodslist.map((e,i) => {
                  let {gimg:img, gtitle:title, gnum:sales, gprice:price, optiontype: subtitle} = e
                  let obj = {img, title,sales,price,subtitle}
                  return (
                    <li key = {i}>
                      <Goods2 height="80px"
                        info={obj}
                        bottom_left={<span>{e.gprice}</span>}
                        bottom_right={
                          <div className={style['bottom-right']}>
                          x{e.gnum}
                        </div>
                        }
                      />
                    </li>
                  )
                }) : ""
              }
              <div className={style.total}>
                共<span style={{color:"#000"}}>{info.goodscount}</span>件商品 &nbsp;&nbsp;
                <span style={{color:"#000"}}>合计：{info.sumamount}{info.deliveramount>0? "":"(免运费)"}</span>
              </div>
            </ul>
            <footer className={`${style.footer} border-top`}>
              <div className={style.left}>下单时间：{info.placeordertime}</div>
              <div>{ this.stateHandle(info.orderstate) }</div>
            </footer>
          </div>
          : ""
        }
      </div>
    );
  }
}

OrderDetail.propTypes = {
  info: PropTypes.object
}

export default OrderDetail;