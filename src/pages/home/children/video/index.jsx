// 视频详情
import React, { Component } from 'react';
import Scroll from '@/Scroll'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import {getVideo, toggleZan} from '$src/api'
import { Tabs, Icon, Toast, Modal, List, Radio } from 'antd-mobile';
import style from './video.module.scss'
import * as commonActionCreators from '~/common/store/actionCreators'
class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      list: [],
      play: false,
      mp4Src: "",
      showBuyModal: false
    }
    this._video = React.createRef();
  }
  componentDidMount() {
    this.getVideoMsg(this.props.match.params.id)
  }
  back = () => {
    this.props.history.goBack();
  }
  getVideoMsg (id) {
    let query = {
      id,
      token: this.props.token || 888888
    }
    getVideo(query).then(res => {
      if (res.code === '1') {
        this.setState({
          info: res.data,
          list: res.data.catalogs
        })
      } else {
        this.props.showModal(res.msg)
      }
    })
  }
  zan = () => {
    if (this.state.s_islike === -1) {
      this.props.showModal('登陆后才可以点赞哦')
      return
    }
    let {userid, token} = this.props
    let query = {
      userid, token, 
      id: this.state.info.s_id
    }
    toggleZan(query).then(res => {
      if (res.code === '1') {
        let {info} = this.state
        info.s_islike === 1 ? info.s_like -= 1 : info.s_like += 1
        info.s_islike === 1 ? info.s_islike = 0 : info.s_islike = 1
        
        this.setState({
          info
        })
      } else {
        this.props.showModal(res.msg)
      }
    })
  }
  play = (e) => {
    if (this.state.info.s_checklook=== 0) {
      Toast.fail('付费视频请先购买')
      return
    }
    this.setState({
      play: true,
      mp4Src: e.v_path
    })
    if (this._video.current !== null) {
      this._video.current.load()
    }
    console.log( this._video.current === null);
  }

  wxPay = () => {
    console.log('微信支付');
    this.setState({
      showBuyModal: false
    })
  }
  
  render() { 
    const tabs = [{ title: '简介', sub: '1' },{ title: '目录', sub: '2' }]
    let {info, list,play, mp4Src} = this.state
    return ( 
      <div className={style.video}>
        <Icon onClick={this.back} style={{position:"absolute"}} type="left" size="lg" color="#fff"/>
        {
          play ?
          <video className={style.cover} controls autoPlay ref={this._video}>
            <source src={mp4Src} type="video/mp4"/>
          </video>:
          <img className={style.cover} src={info.s_cover} alt="cover"/>
        }
        
        <Tabs tabs={tabs}
          style={{flex: 1}}
          initialPage={1}
        >
          <div dangerouslySetInnerHTML={{__html:`${info.s_introduce}`}}></div>
          <div>
            <Scroll>
              <ul>
                {
                  list.length > 0?
                  list.map((e,i) => {
                    return (
                      <li className={style.item} key={i} onClick={this.play.bind(this,e)}>
                        <div className={style['title-wrap']}>
                          <p className={style.title}> {e.v_title}</p>
                          <img className={style.img} src={require('../../img/video_btn_lock.png')} alt="lock" />
                        </div>
                        {
                          info.s_checklook === 1 ? "" :
                          <p className={style['sub-title']}>{e.v_date}{e.v_len}</p>
                        }
                      </li>
                    )
                  }):""
                }
              </ul>
            </Scroll>
          </div>
        </Tabs>
        {
          info.s_type === 1 ? "" :
          <img className={style.vip} onClick={()=>this.setState({showBuyModal: true})} src={require('../../img/video_btn_vip.png')} alt='buyVip'/>
        }
        
        <div className={`${style.zan} border-top`}>
          {
            info.s_islike === 0 ? 
            <img className={style.icon} onClick={() => this.zan()} src={require('../../img/video_btn_zan.png')} alt='zan'/>
            :
            <img className={style.icon} onClick={() => this.zan()} src={require('../../img/video_btn_zan_pre.png')} alt='zan'/>
          }
          <p>{info.s_like}</p>
        </div>
        <Modal
          visible={this.state.showBuyModal}
          transparent
          closable
          maskClosable={true}
          onClose={()=>this.setState({showBuyModal: false})}
          title={`购买:${info.s_title}`}
          footer={[{ text: '立即支付', onPress: this.wxPay}]}
        >
          <div >
            <p style={{color:"red"}}>{info.s_show_price}</p>
            <List>
              <Radio.RadioItem checked>
                <img src={require('../../img/video_icon_weixin.png')} alt=""/>
                &nbsp;
                微信支付</Radio.RadioItem>
            </List>
          </div>
        </Modal>
      </div>
     );
  }
}

const mapState = state => ({
  token: state.getIn(['login', 'token']),
  userid: state.getIn(['login', 'uid'])
})

const mapDispatch = dispatch => ({
  showModal (msg, title) {
    const action = commonActionCreators.toggleModal(msg, title)
    dispatch(action)
  }
})
 
export default connect(mapState, mapDispatch)(withRouter(Video));