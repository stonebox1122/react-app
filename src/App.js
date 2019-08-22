// 根路由
import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import { getStore, getUA } from '$src/common/js/utils'
import * as loginActionCreators from '~/common/login/store/actionCreators';
import * as commonActionCreators from '~/common/store/actionCreators'
import * as cartActionCreator from '~/cart/store/actionCreators'
import { Toast } from 'react-weui'
import { Modal } from 'antd-mobile'

class App extends PureComponent {
  componentDidMount() {
    //  初始化本地缓存的信息
    let uid = getStore('uid');
    let token = getStore('token');
    let islogin = getStore('islogin');
    let cartList = getStore('cart');
    let openid = getStore('openid')
    let cartSelectAll = getStore('selectAll')
    let UA = getUA()
    let info = {
      uid: uid === 'null' ? '' : uid,
      token: token === 'null' ? '888888' : token,
      islogin: islogin === 'null' ? false : islogin
    }
    if (cartList === null) {
      cartList = []
    } else {
      cartList = JSON.parse(cartList)
    }
    if (cartSelectAll === null) {
      cartSelectAll = false
    }
    this.props.initInfo(info)
    this.props.setUa(UA)
    this.props.setOpenid(openid)
    this.props.initCart(cartList, cartSelectAll)
  }
  render () {
    let {children, loading, showModal, modalTitle, toggleModal, modalText } = this.props
    return (
      <div style={{height:"100vh", width:"100vw", position:"fixed", background: "#fff"}}>
        { children }
        {/* 全局的loading组件，api请求时 */}
        <Toast icon="loading" show={loading}>加载中</Toast>
        {/* 弹窗 */}
        <Modal
          visible={showModal}
          transparent
          maskClosable={true}
          title={modalTitle}
          footer={[{ text: '确定', onPress: () => { toggleModal() } }]}
        >
          { modalText }
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
  initInfo (info) {
    dispatch(loginActionCreators.setInfo(info))
  },
  initCart (List, selectAll) {
    dispatch(cartActionCreator.initCart(List, selectAll))
  },
  toggleModal () {
    const action = commonActionCreators.toggleModal()
    dispatch(action)
  },
  setUa (ua) {
    const action = loginActionCreators.setUa(ua)
    dispatch(action)
  },
  setOpenid (id) {
    const action = loginActionCreators.setOpenid(id)
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(App);
