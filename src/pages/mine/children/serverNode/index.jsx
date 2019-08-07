// 服务关系
import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
import { getServerNodes } from '$src/api'
import * as commonActionCreators from '~/common/store/actionCreators'

class ServerNode extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      loadMsg: '上拉加载更多',
      hasMore: true,
      pageSize: 10,
      currPage: 1,
      list: []
    }
  }
  componentDidMount() {
    
  }
  // 加载
  getlist = (rel_username) => {
    let { hasMore, pageSize, currPage, list} = this.state
    let {userid, token, showModal} = this.props
    let query = {
      userid,
      token,
      pageSize,
      currPage,
      rel_username
    }
    if (hasMore) {
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
          
          this.setState({
            list: list.concat(res.data.list) 
          })
        } else {
          showModal(res.msg)
        }
      })
    }
  }
  render() { 
    let {back} = this.props
    return (
      <div>
        <NavgationBar
          handleLeft={back}
          right=""
        >服务关系</NavgationBar>
      </div>
    );
  }
}

ServerNode.propTypes = {
  back: PropTypes.func
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

export default connect(mapState, mapDispatch)(ServerNode);