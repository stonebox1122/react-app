// 我的订单
import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Scroll from '@/Scroll'
import NavgationBar from '@/NavgationBar'
import OrderDetail from '@/OrderDetail'
import OrderDetailPage from '~/common/orderDetail'
import { Tabs } from 'antd-mobile';
import { LoadMore } from 'react-weui';
import { getOrderList } from '$src/api'
import * as commonActionCreators from '~/common/store/actionCreators'

import style from './index.module.scss'
class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showCom: false,
      orderid: '',
      i: 0,
      data: {
        0: {
          hasMore: true,
          list: [],
          page: 1,
          loadMsg: '上拉加载'
        },
        2: {   // 没有状态为1的 具体看文档
          hasMore: true,
          list: [],
          page: 1,
          loadMsg: '上拉加载'
        },
        3: {
          hasMore: true,
          list: [],
          page: 1,
          loadMsg: '上拉加载'
        },
        4: {
          hasMore: true,
          list: [],
          page: 1,
          loadMsg: '上拉加载'
        },
        5: {
          hasMore: true,
          list: [],
          page: 1,
          loadMsg: '上拉加载'
        }
      }
    }
  }
  componentDidMount() {
    console.log(this.props.type);
    // 初始化
    if (this.props.type !== 'undefined') {
      let i = this.props.type
      i = i === 0 ? i : i += 1
      this.getList(i)
    }
  }

  getList =(orderstate) => {
    let {userid, token, toggleModal} = this.props
    let {data} = this.state
    let dataCopy = data // 这里应该深复制 ==
    if (data[orderstate].hasMore) {
      dataCopy[orderstate].loadMsg = '加载中'
      this.setState({
        data: dataCopy
      })
      let query = {
        userid,
        token,
        orderstate,
        pageSize: 10,
        currPage: data[orderstate].page
      }
      getOrderList(query).then(res => {
        if (res.code === '1') {
          if (res.data.list.length === 10) {
            dataCopy[orderstate].loadMsg = '上拉加载更多'
            dataCopy[orderstate].page += 1
          } else {
            dataCopy[orderstate].loadMsg = '已加载全部'
            dataCopy[orderstate].hasMore = false
          }
          // dataCopy[orderstate].list = dataCopy[orderstate].list.concat(res.data.list)
          dataCopy[orderstate].list = [...dataCopy[orderstate].list, ...res.data.list]
          this.setState({
            data: dataCopy
          })
        } else {
          toggleModal(res.msg)
        }
      })
    }
  }

  // 点击切换tab的时候加载
  changeTab = (i) => {
    /**
     * 节流处理
     * 处理后台返回的奇葩参数 跳过了1
     * 判断该tab下是否为空  并且hasMore为true
     * 以免点击就加载
     */
    i = i === 0 ? i : i += 1
    this.setState({i:i})
    if (this.state.data[i].hasMore && this.state.data[i].list.length === 0) {
      this.getList(i)
    }
  }

  // 传给子组件 点击显示订单详情
  showDetailPage = ( orderid="") => {
    console.log('orderid :', orderid);
    // let flag = this.state.showCom
    this.setState({
      showCom: true,
      orderid
    })
  }
  hide = () => {
    this.setState({
      showCom: false
    })
  }

  onRef = (ref) => {
    console.log(ref)
  }

  render() { 
    let {back} = this.props
    let {data, showCom, orderid, i} = this.state
    const tabs = [
      { title: '全部' },
      { title: '待付款'},
      { title: '待发货' },
      { title: '待收货' },
      { title: '待评价' },
    ];
    return (
      <div className={style.order}>
        <NavgationBar  handleLeft={back}
          right="">我的订单</NavgationBar>
          <div>
            <Tabs tabs={tabs}
              tabBarActiveTextColor="#FFC105"
              tabBarUnderlineStyle={{borderColor:"#FFC105"}}
              initialPage={this.props.type }
              onTabClick={(tab, index) => this.changeTab(index)}
            ></Tabs>
          </div>
        {
          i === 0 ? 
          <div className={style.item}>
            <Scroll pullUpHandler={()=>this.getList(0)}>
              <ul className={style['scroll-wrap']}>
                {
                  data[0].list.length>0 ?
                  data[0].list.map((e,i) => {
                    return (
                      <li className={style.card}
                          key={`${e.orderno}${i}`}
                          onClick={() => this.showDetailPage(e.orderid)}>
                        <OrderDetail info={e}/>
                      </li>
                    )
                  }) : 
                  <img className={style.nothing} src = {require('$static/img/empty_icon.png')} alt="nothing"/>
                }
                {
                  data[0].list.length>0 ?<LoadMore showLine>{data[0].loadMsg}</LoadMore> : ""
                }
              </ul>
            </Scroll>
          </div> : ""
        }
        {
          i === 2 ?
          <div className={style.item}>
            <Scroll pullUpHandler={()=>this.getList(2)}>
              <ul className={style['scroll-wrap']}>
                {
                  data[2].list.length>0 ?
                  data[2].list.map((e,i) => {
                    return (
                      <li className={style.card} key={`${e.orderno}${i}`} onClick={() => this.showDetailPage(e.orderid)}>
                        <OrderDetail info={e}/>
                      </li>
                    )
                  }) : <img className={style.nothing} src = {require('$static/img/empty_icon.png')} alt="nothing"/>
                }
                {
                  data[2].list.length>0 ?<LoadMore showLine>{data[2].loadMsg}</LoadMore> : ""
                }
              </ul>
            </Scroll>
          </div>:""
        }
        {
          i === 3 ?
          <div className={style.item}>
            <Scroll pullUpHandler={()=>this.getList(3)}>
              <ul className={style['scroll-wrap']}>
                {
                  data[3].list.length>0 ?
                  data[3].list.map((e,i) => {
                    return (
                      <li className={style.card}  key={`${e.orderno}${i}`} onClick={() => this.showDetailPage(e.orderid)}>
                        <OrderDetail info={e}/>
                      </li>
                    )
                  }) : <img className={style.nothing} src = {require('$static/img/empty_icon.png')} alt="nothing"/>
                }
                {
                  data[3].list.length>0 ?<LoadMore showLine>{data[3].loadMsg}</LoadMore> : ""
                }
              </ul>
            </Scroll>
          </div> : ""
        }
        {
          i === 4 ?
          <div className={style.item}>
            <Scroll pullUpHandler={()=>this.getList(4)}>
              <ul className={style['scroll-wrap']}>
                {
                  data[4].list.length>0 ?
                  data[4].list.map((e,i)=> {
                    return (
                      <li className={style.card} key={`${e.orderno}${i}`}onClick={() => this.showDetailPage(e.orderid)}>
                        <OrderDetail info={e}/>
                      </li>
                    )
                  }) : <img className={style.nothing} src = {require('$static/img/empty_icon.png')} alt="nothing"/>
                }
                { 
                  data[4].list.length>0 ?<LoadMore showLine>{data[4].loadMsg}</LoadMore> : ""
                }
              </ul>
            </Scroll>
          </div> :""
        }
        {
          i === 5 ?
          <div className={style.item}>
            <Scroll pullUpHandler={()=>this.getList(5)}>
              <ul className={style['scroll-wrap']}>
                {
                  data[5].list.length>0 ?
                  data[5].list.map((e,i) => {
                    return (
                      <li className={style.card} key={`${e.orderno}${i}`} onClick={() => this.showDetailPage(e.orderid)}>
                        <OrderDetail info={e}/>
                      </li>
                    )
                  }) : <img className={style.nothing} src = {require('$static/img/empty_icon.png')} alt="nothing"/>
                }
                {
                  data[5].list.length>0 ?<LoadMore showLine>{data[5].loadMsg}</LoadMore> : ""
                }
              </ul>
            </Scroll>
          </div> : ""
        }
        {
          showCom ?
          <OrderDetailPage orderid= {orderid} back={this.hide}/> : ""
        }
        
      </div>
    );
  }
}

MyOrder.propTypes = {
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

export default connect(mapState, mapDispatch)(MyOrder);