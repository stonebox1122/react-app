//  转账记录
import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
import Scroll  from '@/Scroll'
import { withdrawList } from '$src/api'
import style from './list.module.scss'
import * as commonActionCreators from '~/common/store/actionCreators'


class WithdrawList extends PureComponent {
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

    this.getList()
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
      withdrawList(query).then(res => {
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
        <NavgationBar handleLeft={back} right="">分享利润提现记录</NavgationBar>
        <div className={style['list-wrap']}>
          <Scroll pullUpHandler = {this.getList}>
            <ul className={style.container}>
              {
                list.length > 0 ?
                list.map((e,i) => {
                  return (
                    <li className={`${style.item} border-bottom`} key={i}>
                      <p className={style['item-p']}>
                        <span style={{fontSize:"15px"}}>{e.to_path}</span>
                        <span style={{fontSize:"13px"}}>{e.cashes_amount}</span>
                      </p>
                      <p className={style['item-p']}>
                        <span style={{fontSize:"12px"}}>{e.cashes_jieyu}</span>
                        <span style={{fontSize:"12px"}}>{e.cashes_fee}</span>
                      </p>
                      <p className={style['item-p']}>
                        <span style={{fontSize:"10px", color:"#999"}}>{e.cashes_time}</span>
                        {
                          e.cashes_state === '打款中' ? 
                          <span style={{fontSize:"16px", color:"#108EE9"}}>{e.cashes_state}</span> 
                          :<span style={{fontSize:"16px"}}>{e.cashes_state}</span>
                        }
                        
                      </p>
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

WithdrawList.propTypes = {
  back: PropTypes.func
}

export default connect(mapState,mapDispatch)(WithdrawList);