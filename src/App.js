// 根路由
import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import { getStore } from '$src/common/js/utils'
import * as loginActionCreators from '~/common/login/store/actionCreators';
import * as commonActionCreators from '~/common/store/actionCreators'
import { Toast } from 'react-weui'
import { Modal } from 'antd-mobile'

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
        {/* 全局的loading组件，api请求时 */}
        <Toast icon="loading" show={this.props.loading}>加载中</Toast>
        {/* 弹窗 */}
        <Modal
          visible={this.props.showModal}
          transparent
          maskClosable={true}
          title={this.props.modalTitle}
          footer={[{ text: '确定', onPress: () => {  this.props.toggleModal() } }]}
        >
          { this.props.modalText }
        </Modal>
      </div>
    )
  }
}

const mapState = (state) => ({
  loading: state.getIn(['common', 'loading']),
  showModal: state.getIn(['common', 'showModal']),
  modalText: state.getIn(['common', 'modalText']),
  modalTitle: state.getIn(['common', 'modalTitle'])
})

const mapDispatch = (dispatch) => ({
  init (info) {
    dispatch(loginActionCreators.setInfo(info))
  },
  toggleModal (msg) {
    const action = commonActionCreators.toggleModal(msg || this.modalText)
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(App);
