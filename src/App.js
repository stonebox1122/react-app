// 根路由
import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import { getStore } from '$src/common/js/utils'
import * as actionCreators from './pages/common/login/store/actionCreators';

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
      </div>
    )
  }
}
const mapDispatch = (dispatch) => ({
  init (info) {
    dispatch(actionCreators.setInfo(info))
  }
})

export default connect(null, mapDispatch)(App);
