// 服务关系
import React, { Component } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
import Scroll from '@/Scroll'
import { getServerNodes } from '$src/api'
import * as commonActionCreators from '~/common/store/actionCreators'
import { Steps,List } from 'antd-mobile';
import style from './index.module.scss'
const Step = Steps.Step;
const Item = List.Item;
const Brief = Item.Brief;

class ServerNode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loadMsg: '上拉加载更多',
      hasMore: true,
      pageSize: 10,
      currPage: 1,
      index: 0,
      list: [],
      curruser: {},
      currList: [{
        title: '请选择服务客户',
        sub_title: ''
      }]
    }
  }
  componentDidMount() {
    this.getlist(this.props.userinfo.userno)
  }
  // 加载
  getlist = (rel_username) => {
    let { hasMore, pageSize, currPage, list, currList} = this.state
    let {userid, token, showModal} = this.props
    console.log(rel_username, hasMore);
    let query = {
      userid,
      token,
      pageSize,
      currPage,
      rel_username
    }
    // if (hasMore) {
      this.setState({
        loadMsg: '加载中'
      })
      getServerNodes(query).then(res => {
        if (res.code === '1') {
          if (res.data.list.length >= 10) {
            this.setState({
              loadMsg: '上拉加载更多'
            })
          } else {
            this.setState({
              loadMsg: '已加载全部',
              hasMore: false
            })
          }
          let newList = currList
          if (newList.length === 1) {
            newList.unshift({
              title: `${res.data.curruser.username}/${res.data.curruser.usertruename}/${res.data.curruser.levelname}`,
              sub_title: ""
            })
          }
          
          this.setState({
            list: list.concat(res.data.list),
            curruser: res.data.curruser,
            currList: newList
          })
        } else {
          showModal(res.msg)
        }
      })
    // }
  }

  add =(e) => {
    // 将点击的添加到上边列表并判断长度是否大于三,
    let {currList,index} = this.state
    let newList = currList
    let {username, usertruename, levelname, activetime} = e
    let obj = {
      title: `${username}/${usertruename}/${levelname}`,
      sub_title: activetime
    }
    let last = newList.pop()
    newList.push(obj)
    if (newList.length< 3) {
      newList.push(last)
    }
    this.setState({
      currList: newList,
      index: index+=1,
      list: [],
      hasMore: true
    })
    this.getlist(e.username)
  }
  render() { 
    let {back} = this.props
    let {list,currList,index} = this.state
    return (
      <div className={style['server-node']}>
        <NavgationBar
          handleLeft={back}
          right=""
        >服务关系</NavgationBar>
        <div className={style.step}>
          <Steps size="small" current={index}>
            {
              currList ?
              currList.map(e => {
                return (
                  <Step title={e.title} key = {e.title} 
                  description={e.sub_title} />
                )
              }) : ""
            }
          </Steps>

          <div className={style['scroll-wrap']}>
            <Scroll>
              <div>
                <div className={style.wrap}>
                  {
                    list ?
                    <List
                      renderHeader="选择服务客户"
                    >
                      {list.map(e => {
                        return (
                          <Item
                            arrow={e.ref_count=== 1 ? "horizontal" : "empty"}
                            multipleLine
                            onClick={() => {this.add(e)}}
                            key = {e.username}>
                            <p>{e.username}/{e.usertruename}/{e.levelname}</p>
                            <Brief>{e.activetime}</Brief>
                          </Item>
                        )
                      })}
                    </List>
                    : ""
                  }
                </div>
              </div>
            </Scroll>
          </div>
        </div>
      </div>
    );
  }
}

ServerNode.propTypes = {
  back: PropTypes.func
}
 
const mapState = state => ({
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token']),
  userinfo: state.getIn(['mine','mineInfo', 'userinfo']).toJS()
})

const mapDispatch = dispatch => ({
  showModal (msg, title) {
    const action = commonActionCreators.toggleModal(msg, title)
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(ServerNode);