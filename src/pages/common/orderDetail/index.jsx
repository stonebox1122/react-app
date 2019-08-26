// 订单详情
import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import NavgationBar from '@/NavgationBar'
import { TextareaItem } from 'antd-mobile';
import Goods2 from '@/Goods/goods_2'
import style from './index.module.scss'
import { getOrderDetail } from '$src/api'
import * as commonActionCreators from '~/common/store/actionCreators'

class OrderDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {}
    }
  }

  componentDidMount() {
    this.initDetail()
  }
  // 加载数据
  initDetail () {
    let {userid, token, orderid, showModal} = this.props
    let query = {
      userid, token, orderid
    }
    getOrderDetail(query).then(res => {
      if (res.code === '1') {
        this.setState({
          data: res.data
        })
      } else {
        showModal(res.msg)
      }
    })
  }

  // 根据订单状态返回对应的dom 
  setStateType (type) {
    switch (type) {
      case 1:
        return (
          <div className={style.state}>
            <img src={require('./img/wait.png')} alt="cancle"/>
            <p>订单已取消</p>
          </div>
        )
      case 2:
        return (
          <div className={style.state}>
            <img src={require('./img/wait.png')} alt="wait"/>
            <p>待付款</p>
          </div>
        )
      case 3:
        return (
          <div className={style.state}>
            <img src={require('./img/payed.png')} alt="wait"/>
            <p>待发货</p>
          </div>
        )
      case 4:
        return (
          <div className={style.state}>
            <img src={require('./img/send.png')} alt="cancle"/>
            <p>待收货</p>
          </div>
        )
      case 5:
        return (
          <div className={style.state}>
            <img src={require('./img/wait.png')} alt="cancle"/>
            <p>待评价</p>
          </div>
        )
      case 6:
        return (
          <div className={style.state}>
            <img src={require('./img/over.png')} alt="cancle"/>
            <p>已完成</p>
          </div>
        )
      default:
        break;
    }
  }
  
  // 根据订单状态返回对应的dom 底部操作
  setStateType2 (type) {
    switch (type) {
      case 1:
        return (
          <div className={style['btn-cover']}>
            <div className={style.btn}>
              删除订单
            </div>
          </div>
        )
      case 2:
        return (
          <div className={style['btn-cover']}>
            <div className={`${style.btn} ${style.active}`}>
              去付款
            </div>
            <div className={`${style.btn}`}>
              取消订单
            </div>
          </div>
        )
      case 3:
        return (
          <div className={style['btn-cover']}>
            <div className={style.btn}>
              提醒发货
            </div>
          </div>
        )
      case 4:
        return (
          <div className={style['btn-cover']}>
            <div className={style.btn}>
              确认收货
            </div>
          </div>
        )
      case 5:
        return (
          <div className={style['btn-cover']}>
            <div className={style.btn}>
              评价
            </div>
          </div>
        )
      case 6:
        return (
          <div className={style['btn-cover']}>
            <div className={style.btn}>
              删除订单
            </div>
          </div>
        )
      default:
        break;
    }
  }

  render() { 
    let {back} = this.props
    let { data:{order, address, ordergoods}} = this.state
    return (
      <div >
        {
          order ?
          <div className={style.cover}>
            <NavgationBar handleLeft={back} right="">订单详情</NavgationBar>
            <div className={style.wrap}>
              <header className={style.header}>
                {this.setStateType(order.orderstate)}
              </header>
              <section className={style.address}> 
                <img src={require('./img/details_image_adderss.png')} className={style['location-icon']} alt="location"/>
                <div className={style.location}>
                  <p>{address.reciver_name} <span style={{color:"#999"}}>{address.reciver_mobile}</span></p>
                  <p>{address.reciver_address}</p>
                </div>
              </section>
              <section className={style['order-detail']}>
                <ul className={style.container}>
                  {
                    ordergoods ?
                    ordergoods.map((e,i) => {
                      let {gimg:img, gtitle:title, gnum:sales, gprice:price, optiontype: subtitle, gorigprice} = e
                      let obj = {img, title,sales,price,subtitle}
                      return (
                        <li key = {i} style={{marginBottom: "12px"}}>
                          <Goods2 height="80px"
                            info={obj}
                            bottom_left={<p><span>{e.gprice} </span> <del style={{color:"#999999"}}>{gorigprice}</del></p>}
                            bottom_right={<div className={style['bottom-right']}> x{e.gnum}</div>}/>
                        </li>
                      )
                    }) : ""
                  }
                </ul>
                <ul className={style.infos}>
                  <li className={style.item}>
                    <span>商品总额</span>
                    <span>{order.goodssumprice}</span> 
                  </li>
                  <li className={style.item}>
                    <span>商城积分抵扣</span> 
                    <span>{order.ferentialprice}</span>
                  </li>
                  <li className={style.item}>
                    <span>配送费</span> 
                    <span>{order.deliverprice}</span>
                  </li>
                  <li className={`${style.item} ${style.total} border-top`}>
                    <span>订单总价</span> 
                    <span style={{color:"#FF2121"}}>{order.ordersumprice}</span>
                  </li>
                </ul>
              </section>
              <section className={style.leaveMsg}>
                <TextareaItem
                  title="买家留言："
                  disabled
                  defaultValue={order.m_message}
                  autoHeight
                />
              </section>
              <section className={style['order-msg']}>
              <p className={style.title}>订单信息</p>
              <ol>
                <li className={style.item}>
                  <span>订单编号：</span> <span>{order.orderno}</span>
                </li>
                <li className={style.item}>
                  <span>创建时间：</span> <span>{order.create_time}</span>
                </li>
                {/* <li className={style.item}>
                  <span>付款时间：</span> <span>{order.orderno}</span>
                </li>
                <li className={style.item}>
                  <span>发货时间：</span> <span>{order.orderno}</span>
                </li>
                <li className={style.item}>
                  <span>成交时间：</span> <span>{order.orderno}</span>
                </li> */}
              </ol>
            </section>
            </div>
            <section className={style.bottom}>
              {this.setStateType2(order.orderstate)}
            </section>
          </div> 
          : ""
        }
      </div>
    );
  }
}

OrderDetail.propTypes = {
  back: PropTypes.func
}

const mapState = state => ({
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token'])
})

const mapDispatch = dispatch => ({
  showModal (msg, title) {
    const action = commonActionCreators.toggleModal(msg, title)
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(OrderDetail);