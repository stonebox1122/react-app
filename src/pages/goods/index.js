import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import NavgationBar from '@/NavgationBar'
import Scroll from '@/Scroll'
import Goods1 from '@/Goods/goods_1'
import style from './index.module.scss'
class GoodsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  // 商品列表
  mapList = (list) => {
    return list.map((e, index) => {
      return (
        <li key = {e.title} className={style.item} key={index}>
          <Goods1 info = {e}/>
          <div className={style.bottom}>
          
          </div>
        </li>
      )
    })
  }
  render() {
    return (
      <section className={style['goods-list']}>
        <NavgationBar
          left = ' '
          right= ''
        >全部商品</NavgationBar>
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

export default connect(mapState)(GoodsList);