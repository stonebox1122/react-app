import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import * as towerActionCreators from './store/actionCreators'
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
        token:token || 888888,
        currPage,
        pageSize,
        type: 1
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
        >能量塔</NavgationBar>
        <div className={style['list-wrap']}>
          <Scroll pullUpHandler={this.getList}>
            <ul className={style.container}>
              {
                this.props.list.map(e => {
                  return (
                    <li key = {e.title} className={style.item}>
                      <Link to = {`/detail/${e.gid}`}>
                        <Goods1 info = {e}/>
                      </Link>
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
Tower.propTypes = { 
  back: PropTypes.func
}
// 将redux数据映射到props
const mapState = (state) => ({
  list: state.getIn(['tower', 'list']).toJS(),
  token: state.getIn(['login', 'token']),
  loadText: state.getIn(['tower', 'loadText']),
  hasMore: state.getIn(['tower', 'hasMore']),
  currPage: state.getIn(['tower', 'currPage']),
  pageSize: state.getIn(['tower', 'pageSize'])
})

const mapDispatch = (dispatch) => ({
  getList (query) {
    const action = towerActionCreators.getList(query);
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(Tower);