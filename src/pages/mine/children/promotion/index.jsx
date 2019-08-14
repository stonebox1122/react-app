// 推广
import React, { PureComponent } from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
import {getQr} from '$src/api'
import * as commonActionCreators from '~/common/store/actionCreators'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import style from './index.module.scss'
class Promotion extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: [],
      info: {}
    }
  }
  componentDidMount() {
    this._init()
  }
  componentDidUpdate () {
    // 初始化轮播图插件
    new Swiper('.swiper-container',{
      loop: true
    })
  }

  _init = () => {
    let {userid, token, showModal} = this.props
    let query = {
      userid, token
    }
    getQr(query).then(res => {
      if(res.code === '1') {
        this.setState({
          list: res.data.sharebackgroundimage,
          info: res.data
        })
      } else {
        showModal(res.msg)
      }
    })
  }

  render() { 
    let {back} = this.props
    let {list, info} = this.state
    return (
      <div className={style.bg}>
        <NavgationBar  handleLeft={back}
          right="">推广二维码</NavgationBar>
        
        {/*轮播图部分  */}
        <div className={`swiper-container ${style['banner-h']}`}>
          <div className={`swiper-wrapper ${style.wrap}`}>
            {
              list.map(item => {
                return (
                  <div className={`swiper-slide ${style.item}`} key = {item.imgpath}>
                    <div className={style.container}>
                      <img alt="img" className={style.img} src={item.imgpath}/>
                      <img alt="avatar" className={style.avatar} src={info.avatar}/>
                      <p className={style.truename}>我是<span  style={{color: "#FFC105"}}>{info.truename}</span></p>
                      <div className={style.info}>
                        <div className={style.msg}>
                          <p>ID:{info.ID}</p>
                          <p>下载吉善APP,注册会员，观看精彩视频，更有能量课程、健康福利等着你呦~</p>
                        </div>
                        <img src={info.sharepath} className={style.qr} alt="qr" />
                      </div>
                      <img style={{width:"100%"}} src={require('../../img/image.png')} alt="line"/>
                      <div className={style.bottom}>
                        <p>我在吉善APP等你，不见不散！</p>
                        <p style={{color: "#666666", fontSize:"12px"}}>长按或扫描二维码，注册吉善APP</p>
                      </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
        {/* <div className={style.save}>保存至相册</div> */}

      </div>
    );
  }
}

Promotion.propTypes = {
  back: PropTypes.func
}

const mapState = (state) => ({
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token'])
})

const mapDispatch = dispatch => ({
  showModal (msg, title) {
    const action = commonActionCreators.toggleModal(msg, title)
    dispatch(action)
  }
})


export default connect(mapState, mapDispatch)(Promotion);