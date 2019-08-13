//  转账记录
import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
import Scroll  from '@/Scroll'
import { getTransList } from '$src/api'
import style from './list.module.scss'
import * as commonActionCreators from '~/common/store/actionCreators'


class TransfromList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      page: 1,
      hasMore: true,
      loadMsg: '上拉加载更多',
      list: []
    }
  }
  componentDidMount() {

    this.getList(this.props.type)
  }

  getList = () => {
    let {page, hasMore, list} = this.state
    if (hasMore) {
      this.setState({
        loadMsg: '加载中'
      })
      let {token, userid} = this.props
      let query = {
        token, userid,  currPage: page, pageSize: 10
      }
      getTransList(query).then(res => {
        if (res.code === '1') {
          if (res.data.list.length === 10) {
            this.setState({
              page: ++page,
              loadMsg: '上拉加载更多'
            })
          } else {
            this.setState({
              hasMore: false,
              loadMsg: '已加载全部'
            })
          }
          let newList = list.concat(res.data.list)
          this.setState({
            list: newList
          })
        } else {
          this.props.showModal(res.msg)
        }
      })
    } else {
      this.setState({
        loadMsg: '没有更多了'
      })
    }
  }
  render() { 
    let {back} = this.props
    let { list} = this.state
    return (
      <div className={style.list}>
        <NavgationBar handleLeft={back} right="">转账记录</NavgationBar>
        <div className={style['list-wrap']}>
          <Scroll pullUpHandler = {this.getList}>
            <ul className={style.container}>
              {/* <li className={`${style.item} border-bottom`}>
                <p><span>支付宝-购物积分</span><span style={{color: "#999999"}}>2018-11-32 15:36</span></p>
                <p><span>购物积分余额：52687</span><span>+8126.44</span></p>
              </li> */}
              {
                list.length > 0 ?
                list.map((e,i) => {
                  return (
                    <li className={`${style.item} border-bottom`} key={i}>
                      <p><span>{e.t_type}[{e.cashes_desc}]</span><span style={{color: "#999999"}}>{e.cashes_time}</span></p>
                      <p><span>本次账户结余：{e.cashes_surplus}</span><span>{e.cashes_amount}</span></p>
                    </li>
                  )
                }) : <img style={{width: "100%"}} src = {require('$static/img/empty_icon.png')} alt="nothing"/>
              }
            </ul>
          </Scroll>
        </div>
      </div>
    );
  }
}

const mapState = state => ({
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token'])
})
 
const mapDispatch = dispatch => ({
  showModal (msg, title) {
    const action = commonActionCreators.toggleModal(msg, title)
    dispatch(action)
  }
})

TransfromList.propTypes = {
  back: PropTypes.func
}

export default connect(mapState,mapDispatch)(TransfromList);