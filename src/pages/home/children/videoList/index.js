import React, { Component } from 'react';
import { connect  } from 'react-redux';
import { toFixed2 } from '$src/common/js/utils'

import * as actionCreators from '../../store/actionCreators'
import PropTypes from 'prop-types'
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
      title: ''
    }
  }
  componentDidMount() {
    const index = this.props.currentIndex;
    let title;
    switch (index) {
      case 0:
        title = '全部视频'
        break;
      case 1:
        title = '免费视频'
        break;
      case 2:
        title = '精彩尝鲜'
        break;
      case 3:
        title = '精品推荐'
        break;
      default:
        title = '全部视频'
        break;
    }
    this.setState({
      title,
      currentIndex: index
    })
  }
  changeTab = (index) => {
    this.setState({
      currentIndex: index
    })
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
      <div className={style['bottom-price']}>￥{toFixed2(num)}</div>
    )
  }

  render() {
    const TabList = [
      {title: '全部', key: 0},
      {title: '免费视频', key: 1},
      {title: '精彩尝鲜', key: 2},
      {title: '精品推荐', key: 3}
    ]
    return (
      <div className={style.container}>
        <NavgationBar
          right=""
          handleLeft = {this.props.back}
        >{this.state.title}</NavgationBar>
        <Tab list= {TabList} currentIndex = {this.state.currentIndex} changeCurr={this.changeTab}/>
        {/* 商品列表 */}
        <div className={style['list-wrap']}>
          <Scroll>
            <ul>
              {
                this.props.list.map(e => {
                  return (
                    <li className={style.item}>
                      <Goods2
                        info = {e}
                        imgH="103px"
                        bottom_left = { this.buyNum(1200) }
                        bottom_right = { this.setPrice(4999) }/>
                    </li>
                  )
                }) 
              }
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
  list: state.getIn(['video', 'list']).toJS()
})

const mapDispatch = (dispatch) => ({
  back () {
    const action = actionCreators.toggleComponent();
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(VideoList);