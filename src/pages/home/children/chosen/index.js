import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import * as homeActionCreators from '../../store/actionCreators'
import * as excellentActionCreators from './store/actionCreators'
import { LoadMore } from 'react-weui';

import NavgationBar from '@/NavgationBar'
import Goods1 from '@/Goods/goods_1'
import Scroll from '@/Scroll'
import style from './index.module.scss'
class Tower extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentDidMount() {
    this.getList()
  }

  getList = () => {
    let { token, currPage, pageSize, getList, hasMore } = this.props
    if (hasMore) {
      let query = {
        token,
        currPage,
        pageSize,
        type: 8
      }
      getList(query)
    }
  }
  
  render() { 
    return (
      <section className={style['tower-list']}>
        <NavgationBar
          handleLeft = {this.props.back}
          right = ""
        >精品区</NavgationBar>
        <div className={style['list-wrap']}>
          <Scroll pullUpHandler={this.getList}>
            <ul className={style.container}>
              {
                this.props.list.map(e => {
                  return (
                    <li key = {e.title} className={style.item}>
                      <Goods1 info = {e}/>
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
  list: state.getIn(['chosen', 'list']).toJS(),
  token: state.getIn(['login', 'token']),
  loadText: state.getIn(['chosen', 'loadText']),
  hasMore: state.getIn(['chosen', 'hasMore']),
  currPage: state.getIn(['chosen', 'currPage']),
  pageSize: state.getIn(['chosen', 'pageSize'])
})

const mapDispatch = (dispatch) => ({
  back () {
    const action = homeActionCreators.toggleComponent();
    dispatch(action)
  },
  getList (query) {
    const action = excellentActionCreators.getList(query);
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(Tower);