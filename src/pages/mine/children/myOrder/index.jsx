// 我的订单
import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Scroll from '@/Scroll'
import NavgationBar from '@/NavgationBar'
import OrderDetail from '@/OrderDetail'
import { Tabs } from 'antd-mobile';
import { getOrderList } from '$src/api'
import * as commonActionCreators from '~/common/store/actionCreators'

import style from './index.module.scss'
class MyOrder extends Component {
  constructor(props) {
    super(props);
    this.state = {
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

  render() { 
    let {back} = this.props
    let {data} = this.state
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
        <Tabs tabs={tabs}
          tabBarActiveTextColor="#FFC105"
          tabBarUnderlineStyle={{borderColor:"#FFC105"}}
          initialPage={this.props.type }
          // onChange={(tab, index) => { console.log('onChange', index, tab); }}
          // onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div className={style.item}>
            <Scroll>
              <ul className={style['scroll-wrap']}>
                {
                  data[0].list.length>0 ?
                  data[0].list.map(e => {
                    return (
                      <li className={style.card} key={e.orderno}>
                        <OrderDetail info={e}/>
                      </li>
                    )
                  }) : '暂无数据'
                }
              </ul>
            </Scroll>
          </div>
          <div className={style.item}>
            <Scroll>
              <ul className={style['scroll-wrap']}>
                {
                  data[2].list.length>0 ?
                  data[2].list.map(e => {
                    return (
                      <li className={style.card} key={e.orderno}>
                        <OrderDetail info={e}/>
                      </li>
                    )
                  }) : '暂无数据'
                }
              </ul>
            </Scroll>
          </div>
          <div className={style.item}>
            <Scroll>
              <ul className={style['scroll-wrap']}>
                {
                  data[3].list.length>0 ?
                  data[3].list.map(e => {
                    return (
                      <li className={style.card} key={e.orderno}>
                        <OrderDetail info={e}/>
                      </li>
                    )
                  }) : '暂无数据'
                }
              </ul>
            </Scroll>
          </div>
          <div className={style.item}>
            <Scroll>
              <ul className={style['scroll-wrap']}>
                {
                  data[4].list.length>0 ?
                  data[4].list.map(e => {
                    return (
                      <li className={style.card} key={e.orderno}>
                        <OrderDetail info={e}/>
                      </li>
                    )
                  }) : '暂无数据'
                }
              </ul>
            </Scroll>
          </div>
          <div className={style.item}>
            <Scroll>
              <ul className={style['scroll-wrap']}>
                {
                  data[5].list.length>0 ?
                  data[5].list.map(e => {
                    return (
                      <li className={style.card} key={e.orderno}>
                        <OrderDetail info={e}/>
                      </li>
                    )
                  }) : '暂无数据'
                }
              </ul>
            </Scroll>
          </div>
        </Tabs>
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