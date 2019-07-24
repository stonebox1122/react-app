import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import * as homeActionCreators from '../../store/actionCreators'
import * as towerActionCreators from './store/actionCreators'
import { toFixed2 } from '$src/common/js/utils'
import NavgationBar from '@/NavgationBar'
import Scroll from '@/Scroll'
import Goods2 from '@/Goods/goods_2'
import { LoadMore } from 'react-weui';

import style from './index.module.scss'
class Course extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentDidMount() {
    this.getList()
  }

  getList = () => {
    let { token, currPage, pageSize, getTowerList, hasMore } = this.props
    if (hasMore) {
      let query = {
        token,
        currPage,
        pageSize,
        type: 2
      }
      getTowerList(query)
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
      <div className={style['bottom-price']}>￥{toFixed2(num)}</div>
    )
  }

  render() { 
    return (
      <section className={style['course-list']}>
        <NavgationBar
          handleLeft = {this.props.back}
          right = ""
        >能量课程</NavgationBar>
        <div className={style['list-wrap']}>
          <Scroll>
            <ul className={style.container}>
              { 
                this.props.list.map(e => {
                  return (
                    <li key = {e.title} className={style.item}>
                      <Goods2
                        info = {e}
                        bottom_left = { this.buyNum(1200) }
                        bottom_right = { this.setPrice(4999) }/>
                    </li>
                  )
                }) 
              }
              <LoadMore showLine>{this.props.loadText}</LoadMore>
            </ul>
          </Scroll>
        </div>
      </section>
    );
  }
}
// 将redux数据映射到props
const mapState = (state) => ({
  list: state.getIn(['course', 'list']).toJS(),
  token: state.getIn(['login', 'token']),
  loadText: state.getIn(['course', 'loadText']),
  hasMore: state.getIn(['course', 'hasMore']),
  currPage: state.getIn(['course', 'currPage']),
  pageSize: state.getIn(['course', 'pageSize'])
})
const mapDispatch = (dispatch) => ({
  back () {
    const action = homeActionCreators.toggleComponent();
    dispatch(action)
  },
  getTowerList (query) {
    const action = towerActionCreators.getTowerList(query);
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(Course);