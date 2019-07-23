import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import NavgationBar from '@/NavgationBar'
import Scroll from '@/Scroll'
import Goods1 from '@/Goods/goods_1'
import { LoadMore } from 'react-weui';
import style from './index.module.scss'
import * as actionCreators from './store/actionCreators'
class GoodsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentDidMount() {
    // 初始化数据
    this.getlist()
  }
  
  getlist = () => {
    let query = {
      token: this.props.token,
      currPage: this.props.currPage,
      pageSize: this.props.pageSize
    }
    this.props.getList(query)
  }
  render() {
    let { load } = this.props
    return (
      <section className={style['goods-list']}>
        <NavgationBar
          left = ' '
          right= ''
        >全部商品</NavgationBar>
        <div className={style['list-wrap']}>
          <Scroll pullUpHandler={this.getlist}>
            <ul className={style.wrap}>
              {
                this.props.list.map((e,index) => {
                  // 这里对原价和折后价的key调换下，以适配组件显示
                  let { marketprice , price  } = e
                  e.price = marketprice
                  e.marketprice = price
                  return (
                    <li key = {index} className={style.item}>
                      <Goods1 info = {e}/>
                      <div className={style.bottom}>
                        <span className={style.hot}>火爆热卖</span>
                        <span className={style.discount}>优惠</span>
                        <span>{e.sales}人购买</span>
                      </div>
                    </li>
                  )
                })
              }
              {
                load ?
                (<LoadMore loading>{this.props.loadText}</LoadMore>)
                :
                (<LoadMore showLine>{this.props.loadText}</LoadMore>)
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
  list: state.getIn(['goods', 'list']),
  pageSize: state.getIn(['goods', 'pageSize']),
  currPage: state.getIn(['goods', 'currPage']),
  hasMore: state.getIn(['goods', 'hasMore']),
  token: state.getIn(['login', 'token']),
  loadText: state.getIn(['goods', 'loadText']),
  load: state.getIn(['goods', 'load'])
})

const mapDispatch = (dispatch) => ({
  getList (query) {
    if (this.hasMore) {
      const action = actionCreators.getList(query)
      dispatch(action)
    }
  }
})

export default connect(mapState, mapDispatch)(GoodsList);