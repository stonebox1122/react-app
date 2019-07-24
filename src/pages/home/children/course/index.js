import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import * as actionCreators from '../../store/actionCreators'
import { toFixed2 } from '$src/common/js/utils'
import NavgationBar from '@/NavgationBar'
import Scroll from '@/Scroll'
import Goods2 from '@/Goods/goods_2'

import style from './index.module.scss'
class Course extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
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
            </ul>
          </Scroll>
        </div>
      </section>
    );
  }
}
// 将redux数据映射到props
const mapState = (state) => ({
  list: state.getIn(['goods', 'list']).toJS()
})
const mapDispatch = (dispatch) => ({
  back () {
    const action = actionCreators.toggleComponent();
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(Course);