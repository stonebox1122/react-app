import React, { Component, Fragment } from 'react';
import { connect  } from 'react-redux';
import * as actionCreators from './store/actionCreators'
import Loadable from 'react-loadable';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router';
import { LoadMore } from 'react-weui';
import NavgationBar from '@/NavgationBar'
import Loading from '@/Loading'
import Title from '@/Title'
import Goods1 from '@/Goods/goods_1'
import Goods2 from '@/Goods/goods_2'
import Goods3 from '@/Goods/goods_3'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import style from './index.module.scss'

// 按需加载组件
const Course = Loadable({
  loader: () => import('./children/course'),
  loading: Loading
})
const Tower = Loadable({
  loader: () => import('./children/tower'),
  loading: Loading
})
const VideoList = Loadable({
  loader: () => import('./children/videoList'),
  loading: Loading
})
const Chosen = Loadable({
  loader: () => import('./children/chosen'),
  loading: Loading
})
const Excellent = Loadable({
  loader: () => import('./children/excellent'),
  loading: Loading
})
const Healthy = Loadable({
  loader: () => import('./children/healthy'),
  loading: Loading
})

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      comName: '',
      video_current_index: 0,
      menu: [{
        key: 'check',
        title: '签到',
        src: '',
        icon: './img/home_btn_check.png'
      },{
        key: 'hot',
        title: '最热',
        src: '',
        icon: './img/home_btn_hot.png'
      },{
        key: 'free',
        title: '免费',
        src: '',
        icon: './img/home_btn_free.png'
      },{
        key: 'all',
        title: '全部',
        src: '',
        icon: './img/home_btn_all.png'
      }]
    }
  }
  componentDidMount () {
    let {token,getHomeMsg} = this.props
    // 加载数据
    getHomeMsg({token : token || '888888'})
  }
  componentDidUpdate () {
    // 初始化轮播图插件
    new Swiper('.swiper-container',{
      loop: true,
      autoplay: {
        delay: 2500,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
      }
    })
  }
  // 购买人数
  buyNum = (num) => {
    return (
      <div className={style['bottom-num']}>
        <img src={require('./img/home_icon_hot.png')} alt="hot" className={style.hot}/>
        <span>{num}人购买</span>
      </div>
    )
  }
  // 设置价格
  setPrice = (num) => {
    return (
      <div className={style['bottom-price']}>{num}</div>
    )
  }
  // 设置标题
  setTitleClamp2 = (title) => {
    return (
      <p className={style.title}>{ title }</p>
    )
  }
  // setTitleClamp1
  setTitleClamp1 = (title) => {
    return (
      <p className={style.title1}>{ title }</p>
    )
  }
  setSubTitle = (subtitle) => {
    return (
      <p className={style.subtitle}>{ subtitle }</p>
    )
  }
  // 路由跳转
  // to = () => {
  //   this.props.history.push({
  //     pathname: '/video'
  //   })
  // }

  // 子组件显示
  handleShowCom = (name, info={}) => {
    this.setState({
      comName: name,
      video_current_index: info.index
    })
    // 通过redux控制显示子组件
    this.props.toggleCom()
  }
  // 数组切割
  spliceArr = (arr) => {
    let newArr = []
    for (let index = 0; index < arr.length; index+=2) {
      let subArr = []
      subArr.push(arr[index])
      if (arr[index+1]) {
        subArr.push(arr[index+1])
      }
      newArr.push(subArr)
    }
    return newArr
  }
  //  动态改变显示的动态组件
  showCom = () => {
    const name = this.state.comName
    switch (name) {
      case 'Course':
        return <Course/>
      case 'Tower':
        return <Tower/>
      case 'Chosen':
          return <Chosen/>
      case 'Healthy':
        return <Healthy/>
      case 'Excellent':
        return <Excellent/>
      case 'VideoList':
        return (
          <VideoList currentIndex={this.state.video_current_index}/>
        )
      default:
        break;
    }
  }
  render() {
    let { banners, list_nlt, list_nlkc, list_mfsp, list_jccx, list_jptj, list_nljk, list_ypq, list_jpq } = this.props
    list_jccx = this.spliceArr(list_jccx)
    return (
      <Fragment>
        <NavgationBar
          left=" "
          right=""
        />
        {/*轮播图部分  */}
        <div className={`swiper-container ${style['banner-h']}`}>
          <div className="swiper-wrapper">
            {
              banners.map(item => {
                return (
                  <img alt="img" className="swiper-slide" src={item.banner} key = {item.uid}/>
                )
              })
            }
          </div>
          <div className='swiper-pagination'></div>
        </div>
        {/* menu */}
        <ul className={style.menu}>
          {
            this.state.menu.map(item => {
              return (
              <li className={style.item} key = {item.key}>
                <img className={style.icon} src={require(`${item.icon}`)} alt={item.key}/>
                <p className={style.label}>{item.title}</p>
              </li>
              )
            })
          }
        </ul>
        {/* 能量塔 */}
        <section className={style['card-wrap']}>
          <Title title = "能量塔" to={() => this.handleShowCom('Tower')}/>
          <ul className={style['goods_wrap']}>
            {
              list_nlt.map(e => {
                return (
                  <li className = {style.goods} key = {e.gid}>
                    <Link to={`/detail/${e.gid}`}>
                      <Goods1 info={e}/>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </section>
        {/* 能量课程 */}
        <section className={style['card-wrap']}>
          <Title title = "能量课程"  to={() => this.handleShowCom('Course')}/>
          <ul className={style['goods2_wrap']}>
            {
              list_nlkc.map(e => {
                return (
                  <li className = {style.mb} key={e.gid}>
                    <Link to={`/detail/${e.gid}`}>
                      <Goods2 
                        info = {e}
                        bottom_left = { this.buyNum(`${e.sales}`) }
                        bottom_right = { this.setPrice(`${e.price}`) }
                      />
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </section>
        {/* 免费视频 */}
        <section className={style['card-wrap']}>
          <Title title= "免费视频" to={() => this.handleShowCom('VideoList', {index: 1})}/>
          <ul className={style['goods3_wrap']}>
            {
              list_mfsp.map(e => {
                return (
                  <li key = {e.gid} className = {style.goods}>
                    <Link to={`/video/${e.gid}`}>
                      <Goods3
                        imgH = "128px"
                        img={e.img}
                        title = { this.setTitleClamp2(`${e.title}`) }
                        sub_title = { this.buyNum(1200) }
                      />
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </section>
        {/* 精彩尝鲜 */}
        <section className={style['card-wrap']}>
          <Title title= "精彩尝鲜"  to={() => this.handleShowCom('VideoList', {index: 2})}/>
          {
            list_jccx.map((e,i) => {
              return (
                <ul className={style['goods3_wrap']} key = {i}>
                  {
                    e.map(item => {
                      return (
                        <li className = {style.goods} key = {item.gid}>
                          <Link to={`/video/${e.gid}`}>
                            <Goods3
                              imgH = "91px"
                              img={item.img}
                              title = { this.setTitleClamp1(`${item.title}`) }
                              sub_title = { this.setSubTitle(`${item.subtitle}`) }
                            />
                          </Link>
                        </li>
                      )
                    })
                  }
                </ul>
              )
            })
          }
        </section>
        {/* 精品推荐 */}
        <section className={style['card-wrap']}>
          <Title title="精品推荐"  to={() => this.handleShowCom('VideoList', {index: 3})}/>
          <ul className={style['goods4_wrap']}>
            {
              list_jptj.map(e => {
                return (
                  <li className={style.item} key = {e.gid}>
                    <Link to={`/video/${e.gid}`}>
                      <Goods3
                        imgH="115px"
                        img={e.img}
                        title = {
                          <p className={style.title}>{e.title}</p>
                        }
                        sub_title = {
                          <p className={style.sub_title}>{e.subtitle}</p>
                        }
                      />
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </section>
        {/* 能量健康 */}
        <section className={style['card-wrap']}>
          <Title title="能量健康" to={() => this.handleShowCom('Healthy')}/>
          <ul className={style['goods5_wrap']}>
            {
              list_nljk.map(e => {
                return (
                  <li key ={e.gid} className = {style.item}>
                    <Link to={`/detail/${e.gid}`}>
                      <Goods3
                        imgH="135px"
                        img={e.img}
                        title = {
                          <p className={style.title}>{e.title}</p>
                        }
                        sub_title = {
                          <p className={style.sub_title}>{e.subtitle}</p>
                        }
                      />
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </section>
        {/* 优品区 */}
        <section className={style['card-wrap']}>
          <Title title="优品区"  to={() => this.handleShowCom('Excellent')}/>
          <ul className={style['goods_wrap']}>
            {
              list_ypq.map(e => {
                return (
                  <li key = {e.gid} className = {style.goods}>
                    <Link to={`/detail/${e.gid}`}>
                      <Goods1 info={e}/>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </section>
        {/* 精品区 */}
        <section className={style['card-wrap']}>
          <Title title="精品区"  to={() => this.handleShowCom('Chosen')}/>
          <ul className={style['goods_wrap']}>
          {
              list_jpq.map(e => {
                return (
                  <li key = {e.gid} className = {style.goods}>
                    <Link to={`/detail/${e.gid}`}>
                      <Goods1 info={e}/>
                    </Link>
                  </li>
                )
              })
            }
          </ul>
        </section>
        {/* 动态组件 */}
        {
          this.props.isShowCom ? 
          <section className={style['full-screen']}>
            { this.showCom() }
          </section>
          : ''
        }
        <LoadMore showLine>没有更多了</LoadMore>
      </Fragment>
    )
  }
}

const mapState = (state) => ({
  // 这里获取的是合并后的home下的状态
  isShowCom: state.getIn(['home','isShowCom']),
  token: state.getIn(['login', 'token']),
  banners: state.getIn(['home', 'banners']).toJS(),
  list_nlt: state.getIn(['home', 'list_nlt']).toJS(),
  list_nlkc: state.getIn(['home', 'list_nlkc']).toJS(),
  list_mfsp: state.getIn(['home', 'list_mfsp']).toJS(),
  list_jccx: state.getIn(['home', 'list_jccx']).toJS(),
  list_jptj: state.getIn(['home', 'list_jptj']).toJS(),
  list_nljk: state.getIn(['home', 'list_nljk']).toJS(),
  list_ypq: state.getIn(['home', 'list_ypq']).toJS(),
  list_jpq: state.getIn(['home', 'list_jpq']).toJS(),
})

const mapDispatch = (dispatch) => ({
  // 切换子组件的显隐
  toggleCom () {
    const action = actionCreators.toggleComponent();
    dispatch(action)
  },
  // 请求首页数据
  getHomeMsg (query) {
    const action = actionCreators.getHomeMsg(query)
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(withRouter(Home))
