// 视频详情
import React, { Component } from 'react';
import Scroll from '@/Scroll'
import {connect} from 'react-redux'
import { withRouter } from 'react-router'
import {getVideo} from '$src/api'
import { Tabs, Icon } from 'antd-mobile';
import {toggleZan} from '$src/api'
import style from './video.module.scss'
import * as commonActionCreators from '~/common/store/actionCreators'
class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      info: {},
      list: []
    }
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
    console.log(e);
  }
  
  render() { 
    const tabs = [{ title: '简介', sub: '1' },
                  { title: '目录', sub: '2' }]
    let {info, list} = this.state
    return ( 
      <div className={style.video}>
        <Icon onClick={this.back} style={{position:"absolute"}} type="left" size="lg" color="#fff"/>
        <img className={style.cover} src={info.s_cover} alt="cover"/>
        <Tabs tabs={tabs}
        style={{flex: 1}}
          initialPage={1}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '150px', backgroundColor: '#fff' }}>
            Content of first tab
          </div>
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
        <div className={`${style.zan} border-top`}>
          {
            info.s_islike === 0 ? 
            <img className={style.icon} onClick={() => this.zan()} src={require('../../img/video_btn_zan.png')} alt='zan'/>
            :
            <img className={style.icon} onClick={() => this.zan()} src={require('../../img/video_btn_zan_pre.png')} alt='zan'/>
          }
          <p>{info.s_like}</p>
        </div>
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