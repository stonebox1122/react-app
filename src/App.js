// 根路由
import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import { getStore } from '$src/common/js/utils'
import * as actionCreators from './pages/common/login/store/actionCreators';
import { Toast } from 'react-weui'

class App extends PureComponent {
  componentDidMount() {
    //  初始化本地缓存的信息
    let uid = getStore('uid');
    let token = getStore('token');
    let islogin = getStore('islogin');
    let info = {
      uid, token, islogin
    }
    this.props.init(info)
  }
  render () {
    return (
      <div style={{height:"100vh", width:"100vw", position:"fixed", background: "#fff"}}>
        { this.props.children }
        <Toast icon="loading" show={this.props.loading}>加载中</Toast>
      </div>
    )
  }
}

const mapState = (state) => ({
  loading: state.getIn(['home', 'loading'])
})

const mapDispatch = (dispatch) => ({
  init (info) {
    dispatch(actionCreators.setInfo(info))
  }
})

export default connect(mapState, mapDispatch)(App);
