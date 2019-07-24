import React, { Component } from 'react';
import { connect  } from 'react-redux';
import * as homeActionCreators from '../../store/actionCreators'
import * as videoActionCreators from './store/actionCreators'
import PropTypes from 'prop-types'
import { LoadMore } from 'react-weui';
import NavgationBar from '@/NavgationBar'
import Tab from '@/Tab'
import Scroll from '@/Scroll'
import Goods2 from '@/Goods/goods_2'
import style from './index.module.scss'
class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: props.currentIndex,
      title: '',
      currentData: {}
    }
  }
  componentDidMount() {
    const index = this.props.currentIndex;
    this.changeTab(index)
  }
  
  // 改变tab的时候
  changeTab = (index) => {
    let title = null;
    let type = null;
    let flag = null;
    switch (index) {
      case 0:
        title = '全部视频';
        type = 10;
        flag = this.props.all;
        break;
      case 1:
        title = '免费视频';
        type = 3;
        flag = this.props.free;
        break;
      case 2:
        title = '精彩尝鲜';
        type = 4;
        flag = this.props.wonderful;
        break;
      case 3:
        title = '精品推荐';
        type = 5;
        flag = this.props.chosen;
        break;
      default:
        title = '全部视频'
        type=10;
        flag = this.props.all;
        break;
    }
    this.setState({
      title,
      currentIndex: index
    })
    // 这里对当前请求需要判断  页面为空并且未加载过
    if (flag.hasMore && flag.list.length === 0) {
      let query = {
        token: this.props.token,
        type,
        currPage: flag.currPage,
        pageSize: flag.pageSize
      }
      this.props.getList(query)
    }
  }
  // 上拉加载数据
  getList = () => {
    let { all, free, wonderful, chosen } = this.props
    let flag = null;
    switch (this.state.currentIndex) {
      case 0:
        flag = all;
        break;
      case 1:
        flag = free;
        break;
      case 2:
        flag = wonderful;
        break;
      case 3:
        flag = chosen;
        break;
      default:
        flag = all;
        break;
    }
    if (flag.hasMore) {
      let query = {
        token: this.props.token,
        type: this.state.currentIndex,
        currPage: flag.currPage,
        pageSize: flag.pageSize
      }
      this.props.getList(query)
    }
  }
  
  // 购买人数
  buyNum = (num) => {
    return (
      <div className={style['bottom-num']}>
        <img src={require('../../img/home_icon_hot.png')} alt="hot" className={style.hot}/>
        <span>{num}人购买</span>
      </div>
    )
  }
  // 设置价格
  setPrice = (num) => {
    return (
      <div className={style['bottom-tag']}>{num}</div>
    )
  }
  subTime = (time) => {
    return (
      <div className={style['bottom-num']}>{time.substring(0,10)}</div>
    )
  }
  render() {
    const TabList = [
      {title: '全部', key: 0},
      {title: '免费视频', key: 1},
      {title: '精彩尝鲜', key: 2},
      {title: '精品推荐', key: 3}
    ]
    let { all, free, wonderful, chosen } = this.props
    let list = null;
    switch (this.state.currentIndex) {
      case 0:
        list = all;
        break;
      case 1:
        list = free;
        break;
      case 2:
        list = wonderful;
        break;
      case 3:
        list = chosen;
        break;
      default:
        list = all;
        break;
    }
    return (
      <div className={style.container}>
        <NavgationBar
          right=""
          handleLeft = {this.props.back}
        >{this.state.title}</NavgationBar>
        <Tab list= {TabList} currentIndex = {this.state.currentIndex} changeCurr={this.changeTab}/>
        {/* 商品列表 */}
        <div className={style['list-wrap']}>
          <Scroll pullUpHandler={this.getList}>
            <ul>
              {
                list.list.map(e => {
                  return (
                    <li className={style.item} key = {e.gid}>
                      <Goods2
                        info = {e}
                        imgH="103px"
                        tag = { this.setPrice(e.price) }
                        bottom_left = { this.subTime(e.datetime) }
                        bottom_right = { this.buyNum(e.sales) }/>
                    </li>
                  )
                }) 
              }
              <LoadMore showLine>{list.loadText}</LoadMore>
            </ul>
          </Scroll>
        </div>
      </div>
    );
  }
}

VideoList.propTypes = {
  currentIndex: PropTypes.number
}
VideoList.defaultProps = {
  currentIndex: 0
}
// 将redux数据映射到props
const mapState = (state) => ({
  token: state.getIn(['login', 'token']),
  all: state.getIn(['video', 'all']).toJS(),
  free: state.getIn(['video', 'free']).toJS(),
  wonderful: state.getIn(['video', 'wonderful']).toJS(),
  chosen: state.getIn(['video', 'chosen']).toJS(),
})

const mapDispatch = (dispatch) => ({
  back () {
    const action = homeActionCreators.toggleComponent();
    dispatch(action)
  },
  getList (query) {
    const action = videoActionCreators.getList(query);
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(VideoList);