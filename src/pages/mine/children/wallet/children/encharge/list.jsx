//  充值记录
import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
import Scroll  from '@/Scroll'
import { Popover, Icon } from 'antd-mobile';
import { enchargeList } from '$src/api'
import style from './list.module.scss'
import * as commonActionCreators from '~/common/store/actionCreators'

const Item = Popover.Item;

class EnchargeList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      visible: false,
      type: '0',
      page: 1,
      hasMore: true,
      loadMsg: '上拉加载更多',
      list: []
    }
  }
  componentDidMount() {
    this.setState({
      type: this.props.type
    })
    this.getList(this.props.type)
  }

  getList = (type) => {
    let {page, hasMore, list} = this.state
    if (hasMore) {
      this.setState({
        loadMsg: '加载中'
      })
      let {token, userid} = this.props
      let query = {
        token, userid,  currPage: page, pageSize: 10,
        type: ++type
      }
      enchargeList(query).then(res => {
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

  // 点击切换
  onSelect = (opt) => {
    if (opt.props.value === this.state.type) {
      this.setState({
        visible: false
      });
    } else {
      this.setState({
        visible: false,
        type: opt.props.value,
        hasMore: true,
        page: 1,
        loadMsg: '上拉加载更多',
        list: []
      });
      this.getList(opt.props.value)
    }
  };
  render() { 
    let {back} = this.props
    let {type, visible, list} = this.state
    return (
      <div className={ style['list'] }>
        <NavgationBar handleLeft = {back} right={
          <Popover mask
            overlayClassName="fortest"
            overlayStyle={{ color: 'currentColor' }}
            visible={visible}
            overlay={[
              (<Item key="0" value="0">
                <span style={{ marginRight: 5 }}>商城积分充值记录</span>
              </Item>),
              (<Item key="1" value="1">
                <span style={{ marginRight: 5 }}>购物积分充值记录</span>
              </Item>)
            ]}
            align={{
              overflow: { adjustY: 0, adjustX: 0 },
              offset: [-10, 0],
            }}
            onVisibleChange={(visible)=>this.setState({visible})}
            onSelect={this.onSelect}
          >
            <div style={{
              height: '100%',
              padding: '0 15px',
              marginRight: '-15px',
              display: 'flex',
              justifyContent: 'flex-end',
              alignItems: 'center',
            }}
            >
              <Icon type="ellipsis" />
            </div>
          </Popover>
        }>{
          type === '0' ? '商城积分充值记录' : '购物积分充值记录'
        }</NavgationBar>
        <div className={style['list-wrap']}>
          <Scroll pullUpHandler = {this.getList(type)}>
            <ul className={style.container}>
              {/* <li className={`${style.item} border-bottom`}>
                <p><span>支付宝-购物积分</span><span style={{color: "#999999"}}>2018-11-32 15:36</span></p>
                <p><span>购物积分余额：52687</span><span>+8126.44</span></p>
              </li> */}
              {
                list.length > 0 ?
                list.map(e => {
                  return (
                    <li className={`${style.item} border-bottom`}>
                      <p><span>{e.recharge_note}</span><span style={{color: "#999999"}}>{e.recharge_time}</span></p>
                      <p><span>购物积分余额：{e.recharge_surplus}</span><span>{e.recharge_amount}</span></p>
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

EnchargeList.propTypes = {
  back: PropTypes.func
}

export default connect(mapState,mapDispatch)(EnchargeList);