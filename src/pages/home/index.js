import React, { Component, Fragment } from 'react';
import Loadable from 'react-loadable';
import { withRouter } from 'react-router';
import NavgationBar from '@/NavgationBar'
import Loading from '@/Loading'
import Title from '@/Title'
import Goods1 from '@/Goods/goods_1'
import Goods2 from '@/Goods/goods_2'
import Goods3 from '@/Goods/goods_3'

import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import style from './index.module.scss'

const Course = Loadable({
  loader: () => import('./chindren/Course'),
  loading:Loading
})

class Home extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showCom: false,
      comName: ''
    }
  }
  componentDidMount () {
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
      <div className={style['bottom-price']}>￥{num}</div>
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
  // 跳转
  to = (index) => {
    this.props.history.push({
      pathname: '/video',
      state: {index}
    })
  }

  // 子组件显示
  handleShowCom = (name) => {
    this.setState({
      showCom: true,
      comName: name
    })
  }
  //  动态改变显示的动态组件
  showCom = () => {
    const name = this.state.comName
    switch (name) {
      case 'Course':
        return <Course/>
      default:
        break;
    }
  }

  render() {
    return (
      <Fragment>
        <NavgationBar
          left=" "
          right=""
        />
        {/*轮播图部分  */}
        <div className={`swiper-container ${style['banner-h']}`}>
          <div className="swiper-wrapper">
            <img alt="img" className="swiper-slide" src="http://f.hiphotos.baidu.com/image/h%3D300/sign=00af05b334f33a87816d061af65d1018/8d5494eef01f3a29f863534d9725bc315d607c8e.jpg"/>
            <img alt="img" className="swiper-slide" src="http://g.hiphotos.baidu.com/image/h%3D300/sign=b5e4c905865494ee982209191df4e0e1/c2cec3fdfc03924590b2a9b58d94a4c27d1e2500.jpg"/>
            <img alt="img" className="swiper-slide" src="http://g.hiphotos.baidu.com/image/h%3D300/sign=342e12b86563f624035d3f03b745eb32/203fb80e7bec54e7f0e0839fb7389b504fc26a27.jpg"/>
          </div>
          <div className='swiper-pagination'></div>
        </div>
        {/* menu */}
        <ul className={style.menu}>
          <li className={style.item}>
            <img className={style.icon} src={require('./img/home_btn_check.png')} alt="check"/>
            <p className={style.label}>签到</p>
          </li>
          <li className={style.item}>
            <img className={style.icon} src={require('./img/home_btn_hot.png')} alt="hot"/>
            <p className={style.label}>最热</p>
          </li>
          <li className={style.item}>
            <img className={style.icon} src={require('./img/home_btn_free.png')} alt="free"/>
            <p className={style.label}>免费</p>
          </li>
          <li className={style.item}>
            <img className={style.icon} src={require('./img/home_btn_all.png')} alt="all"/>
            <p className={style.label}>全部</p>
          </li>
        </ul>
        {/* 能量塔 */}
        <section className={style['card-wrap']}>
          <Title title = "能量塔"/>
          <ul className={style['goods_wrap']}>
            <li className = {style.goods}>
              <Goods1/>
            </li>
            <li className = {style.goods}>
              <Goods1/>
            </li>
          </ul>
        </section>
        {/* 能量课程 */}
        <section className={style['card-wrap']}>
          <Title title = "能量课程"  to={() => this.handleShowCom('Course')}/>
          <ul className={style['goods2_wrap']}>
            <li>
              <Goods2 
                bottom_left = { this.buyNum(1200) }
                bottom_right = { this.setPrice(4999.00) }
              />
            </li>
          </ul>
        </section>
        {/* 免费视频 */}
        <section className={style['card-wrap']}>
          <Title title= "免费视频" to={() => this.to(1)}/>
          <ul className={style['goods3_wrap']}>
            <li className = {style.goods}>
              <Goods3
                imgH = "128px"
                title = { this.setTitleClamp2('wishing你爸爸wishing你爸爸') }
                sub_title = { this.buyNum(1200) }
              />
            </li>
            <li className = {style.goods}>
              <Goods3
                imgH = "128px"
                title = { this.setTitleClamp2('wishing你爸爸wishing你爸爸') }
                sub_title = { this.buyNum(1200) }
              />
            </li>
            <li className = {style.goods}>
              <Goods3
                imgH = "128px"
                title = { this.setTitleClamp2('wishing你爸爸wishing你爸爸') }
                sub_title = { this.buyNum(1200) }
              />
            </li>
          </ul>
        </section>
        {/* 精彩尝鲜 */}
        <section className={style['card-wrap']}>
          <Title title= "精彩尝鲜"  to={() => this.to(2)}/>
          <ul className={style['goods3_wrap']}>
            <li className = {style.goods}>
              <Goods3
                imgH = "91px"
                title = { this.setTitleClamp1('wishing你爸爸wishing你爸爸') }
                sub_title = { this.setSubTitle(1200) }
              />
            </li>
            <li className = {style.goods}>
              <Goods3
                imgH = "91px"
                title = { this.setTitleClamp1('wishing你爸爸wishing你爸爸') }
                sub_title = { this.setSubTitle(1200) }
              />
            </li>
          </ul>
          <ul className={style['goods3_wrap']}>
            <li className = {style.goods}>
              <Goods3
                imgH = "91px"
                title = { this.setTitleClamp1('wishing你爸爸wishing你爸爸') }
                sub_title = { this.setSubTitle(1200) }
              />
            </li>
            <li className = {style.goods}>
              <Goods3
                imgH = "91px"
                title = { this.setTitleClamp1('wishing你爸爸wishing你爸爸') }
                sub_title = { this.setSubTitle(1200) }
              />
            </li>
          </ul>
        </section>
        {/* 精品推荐 */}
        <section className={style['card-wrap']}>
          <Title title="精品推荐"  to={() => this.to(3)}/>
          <ul className={style['goods4_wrap']}>
            <li className={style.item}>
              <Goods3
                imgH="115px"
                title = {
                  <p className={style.title}>丰厚的覅uafha撒旦教爱搜if骄傲的说法丰厚的覅uafha撒旦教爱搜if骄傲的说法</p>
                }
                sub_title = {
                  <p className={style.sub_title}>丰厚的覅uafha撒旦教爱搜if骄傲的说法丰厚的覅uafha撒旦教爱搜if骄傲的说法丰厚的覅uafha撒旦教爱搜if骄傲的说法</p>
                }
              />
            </li>
          </ul>
        </section>
        {/* 能量健康 */}
        <section className={style['card-wrap']}>
          <Title title="能量健康"/>
        </section>
        {/* 优品区 */}
        <section className={style['card-wrap']}>
          <Title title="优品区"/>
          <ul className={style['goods_wrap']}>
            <li className = {style.goods}>
              <Goods1/>
            </li>
            <li className = {style.goods}>
              <Goods1/>
            </li>
          </ul>
        </section>
        {/* 精品区 */}
        <section className={style['card-wrap']}>
          <Title title="精品区"/>
          <ul className={style['goods_wrap']}>
            <li className = {style.goods}>
              <Goods1/>
            </li>
            <li className = {style.goods}>
              <Goods1/>
            </li>
          </ul>
        </section>
        {/* 动态组件 */}
        {
          this.state.showCom ? 
          <section className={style['full-screen']}>
            { this.showCom() }
          </section>
          : ''
        }
      </Fragment>
    )
  }
}

export default withRouter(Home)
