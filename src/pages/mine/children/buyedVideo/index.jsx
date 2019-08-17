import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
import Scroll from '@/Scroll'
import Goods2 from '@/Goods/goods_2'
import { LoadMore } from 'react-weui';
import { Link } from 'react-router-dom'
import { buyedViodeList } from '$src/api'
import * as commonActionCreators  from '~/common/store/actionCreators'
import style from './index.module.scss'

class BuyedVideo extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      currPage: 1,
      pageSize: 10,
      hasMore: true,
      list: [],
      loadText: '上拉加载'
    }
  }
  componentDidMount() {
    this.getList()
  }

  getList = () => {
    let { currPage, pageSize, hasMore, list } = this.state
    let {token,userid,showModal} = this.props
    if (hasMore) {
      this.setState({
        loadText: '加载中'
      })
      let query = {
        token,
        currPage,
        pageSize,
        userid
      }
      buyedViodeList(query).then(res => {
        if (res.code === '1') {
          this.setState({
            list: list.concat(res.data.list)
          })
          if (res.data.list.length === 10) {
            this.setState({
              loadText: '上拉加载',
              currPage: ++currPage
            })
          } else {
            this.setState({
              loadText: '没有更多了',
              hasMore:false
            })
          }
        } else {
          showModal(res.msg)
        }
      })
    }
  }

  render() { 
    return (
      <section className={style['course-list']}>
        <NavgationBar
          handleLeft = {this.props.back}
          right = ""
        >已购买视频</NavgationBar>
        <div className={style['list-wrap']}>
          <Scroll>
            <ul className={style.container}>
              { 
                this.state.list.map(e => {
                  let {suite_img:img, suite_title:title, suite_subtitle: subtitle} = e
                  let obj = {img, title, subtitle}
                  return (
                    <li key = {e.suite_id} className={style.item}>
                      <Link to={`/detail/${e.suite_id}`}>
                        <Goods2
                          info = {obj}
                          bottom_left = { e.expire_date }
                          bottom_right = { '续费' }/>
                      </Link>
                    </li>
                  )
                }) 
              }
              <LoadMore showLine>{this.state.loadText}</LoadMore>
            </ul>
          </Scroll>
        </div>
      </section>
    );
  }
}

BuyedVideo.propTypes = {
  back: PropTypes.func
}
// 将redux数据映射到props
const mapState = (state) => ({
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token'])
})
const mapDispatch = (dispatch) => ({
  showModal (query) {
    const action = commonActionCreators.toggleModal(query)
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(BuyedVideo);