import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import * as actionCreators from '../../store/actionCreators'

import NavgationBar from '@/NavgationBar'
import Goods1 from '@/Goods/goods_1'
import Scroll from '@/Scroll'
import style from './index.module.scss'
class Tower extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  // 商品列表
  mapList = (list) => {
    return list.map(e => {
      return (
        <li key = {e.title} className={style.item}>
          <Goods1 info = {e}/>
        </li>
      )
    })
  }
  render() { 
    return (
      <section className={style['tower-list']}>
        <NavgationBar
          handleLeft = {this.props.back}
          right = ""
        >能量塔</NavgationBar>
        <div className={style['list-wrap']}>
          <Scroll>
            <ul className={style.container}>
              { this.mapList(this.props.list) }
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

export default connect(mapState, mapDispatch)(Tower);