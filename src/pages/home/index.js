import React, { Component, Fragment } from 'react';
import NavgationBar from '@/NavgationBar'
import Title from '@/Title'
import Swiper from 'swiper/dist/js/swiper.js'
import 'swiper/dist/css/swiper.min.css'
import style from './index.module.scss'
export default class Home extends Component {
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
        <section className={style.wrap}>
          <Title title = "能量塔"/>
        </section>
      </Fragment>
    )
  }
}