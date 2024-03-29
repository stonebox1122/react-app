// 商品详情
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { Icon, Toast } from 'antd-mobile';
import { Badge } from 'react-weui'
import NavgationBar from '@/NavgationBar';
import {wxshare} from '$src/common/js/wxShare'
import Scroll from '@/Scroll';
import ConfirmOrder from '~/cart/children/ConfirmOrder'
import NumberController from '@/NumberController'
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import style from './index.module.scss';
import * as goodsActionCreators from '../../store/actionCreators'
import * as cartActionCreators from '~/cart/store/actionCreators'
import * as commonActionCreator from '~/common/store/actionCreators'
class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      num: 1,
      tags: [{
        key: 0,
        name: '正品保证'
      },{
        key: 1,
        name: '官方发货'
      },{
        key: 2,
        name: '极速退款'
      }],
      kind: {},
      info: [] // 传递给子页面的商品信息
    }
  }
  componentDidMount() {
    let query = {
      token: this.props.token || 888888,
      gid: this.props.match.params.id
    }
    this.props.getDetail(query)

    // 设置分享
    wxshare({
      imgUrl: this.props.detail.img,
      desc: this.props.detail.subtitle,
      title: this.props.detail.title,
      link: window.location.href
    })
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
  
  buyNow = () => {
    if (!this.props.userid || !this.props.token) {
      Toast.fail('请先登陆', .8)
      this.props.history.push('/login')
      return
    }
    if (!this.state.kind.valueid) {
      Toast.fail('请选择规格', 1)
      return
    }
    let {gid, img,title, price:pricestr, is_active } = this.props.detail
    let obj = {
      num: this.state.num,
      gid,
      img,
      title,
      pricestr,
      price: this.state.kind.price,
      valueid: this.state.kind.valueid,
      is_active
    }
    let arr = [obj]
    this.setState({
      info: arr
    })
    this.props.toggleShowCom()
  }
  selectKind = (e) => {
    this.setState({
      kind: e
    })
  }
  // 加入购物车
  addCart = () => {
    let {kind, num} = this.state
    let {match,detail} = this.props
    if (kind.valueid) {
      let query = {
        gid: match.params.id,
        img: detail.share_img,
        num,
        title: detail.title,
        is_entity: detail.is_entity,
        is_active: detail.is_active,
        pricestr: kind.pricestr,
        price: kind.price,
        selected: false,
        valueid: kind.valueid
      }
      this.props.addCart(query)
    } else {
      Toast.fail('请选择规格')
    }
  }
  numController = (flag) => {
    let num = this.state.num
    if (flag) {
      this.setState({
        num: ++num
      })
    } else {
      if (num>1) {
        this.setState({
          num: --num
        })
      }
    }
  }
  navRight = () => {
    return (
      <div className={style.cart}>
        <Link to='/tab/cart/'>
          {
            this.props.cart.length > 0 ? 
            <Badge preset="header">{this.props.cart.length}</Badge> : ""
          }
          <img className={style['cart-icon']} src={require('@/TabBar/img/tab_shop.png')} alt='cart'/>
        </Link>
      </div>
    )
  }
  render() {
    let { detail, isShowCom } = this.props
    return (
      <div className={style.detail}>
        <NavgationBar
          right = {this.navRight()}
        >
          商品详情
          {/* <Tab 
            currentIndex={1}
            changeCurr={this.scrollTo}
            list={[{title:'商品', key: 1},{title:'详情', key: 2},{title:'评论', key: 3}]}/> */}
        </NavgationBar>
        <div className={style['scroll-wrap']}>
          <Scroll>
            <div className={style.container}>
              {/*轮播图部分  */}
              <div className={`swiper-container ${style['banner-h']}`}>
                <div className="swiper-wrapper">
                  {
                    detail.hradimgs ?
                    detail.hradimgs.map(e => {
                      return (
                        <img alt="img" className="swiper-slide" src={e.img} key={e.imgid}/>
                      )
                    })
                    : ''
                  }
                </div>
                <div className='swiper-pagination'></div>
              </div>
              {/* 价格 */}
              <section className={`${style.price} ${style.card}`}>
                <span className={style.marketprice}>{detail.marketprice}</span>
                <span className={style.tag}>火爆热卖</span>
              </section>
              {/* 商品名 */}
              <section className={`${style.title} ${style.card}`}>
                {detail.title}
              </section>
              {/* tag */}
              <ul className={`${style.tag} ${style.card}`}>
                {
                  this.state.tags.map(e => {
                    return (
                      <li className={style.item} key={e.key}>
                        <Icon color="#FFC105" type="check-circle-o" size="xxs"/>
                        &nbsp;&nbsp;{e.name}
                      </li>
                    )
                  })
                }
              </ul>
              {/* 规格 */}
              <section className={`${style.sku} ${style.card}`}>
                <p className={style.title}>{detail.haskey ? detail.haskey.keyname : ''}</p>
                <ul>
                  {
                    detail.haskey && detail.haskey.values ?
                    detail.haskey.values.map(item => {
                      return (
                        <li key={item.valueid}
                            className={
                              `${style.kind}
                               ${this.state.kind.valueid === item.valueid ? style.active: ''}
                              ` 
                            }
                            onClick={this.selectKind.bind(this, item)}>
                          {item.valuename}
                        </li>
                      )
                    }) : ''
                  }
                </ul>
                <p className={ `${style.title} ${style.num}`}>数量</p>
                <div className={style['num-wrap']}>
                  <NumberController
                    num={this.state.num}
                    handleIncrease={() => this.numController(true)}
                    handleDecrease={() => this.numController(false)}
                  />
                </div>
              </section>
              {/* 商品介绍 */}
              <section className={`${style.introduce} ${style.card}`}>
                <p className={style.title}>商品介绍</p>
                <ul>
                  {
                    detail.keys.length>0 ?
                    detail.keys.map(e => {
                      return (
                        <li className={style['intro-item']} key={e.key}>
                          <span className={style['intro-item-title']}>{e.key}</span>
                          <span className={style.val}>{e.value}</span>
                        </li>
                      )
                    }): ""
                  }
                </ul>
              </section>
              {/* 商品评价 */}
              {
                detail.evas ?
                <section className={`${style.introduce} ${style.card}`}>
                  <p className={style.title}>商品评价</p>
                </section> : "" 
              }
              {/* 图文详情 */}
              <section className={`${style.introduce} ${style.card}`}>
                <p className={style.title}>图文详情</p>
              </section>
              {
                detail.tailimgs ? 
                detail.tailimgs.map(e => {
                  return (
                    <img className={style['bottom-img']} src={e.img} alt="img" key={e.imgid}/>
                  )
                }): ""
              }
            </div>
          </Scroll>
        </div>
        {/* 底部结算按钮 */}
        <div className={style.bottom}>
          <div className={style.server} onClick={this.props.showPhone.bind(this, detail)}>
            <img src={require('../../img/server.png')} alt='server'/>
            <p>客服</p>
          </div>
          {
            detail.is_active  === 1 ?
            <div className={style['buy-now']}>
              <div className={style.label} onClick={this.addCart}>加入购物车</div>
              <div className={style.label} onClick={this.buyNow}>立即购买</div>
            </div>
            :
            <div className={style.addCart} onClick={this.buyNow}>立即购买</div>
          }
        </div>
        {/* 直接购买确认按钮 */}
        {
          isShowCom ? <ConfirmOrder
            info={this.state.info}
          /> : ''
        }
      </div>
    );
  }
}

const mapState = (state) => ({
  token: state.getIn(['login', 'token']),
  detail: state.getIn(['goods', 'detail']),
  cart: state.getIn(['cart', 'list']).toJS(),
  isShowCom: state.getIn(['cart', 'isShowCom'])
})

const mapDispatch = (dispatch) => ({
  getDetail (query) {
    const action = goodsActionCreators.getDetail(query)
    dispatch(action)
  },
  addCart (query) {
    const action = cartActionCreators.addCart(query)
    dispatch(action)
  },
  showPhone (detail) {
    console.log(detail);
    const action = commonActionCreator.toggleModal(detail.support_staff, '客服电话')
    dispatch(action)
  },
  // 是否显示子页面
  toggleShowCom () {
    const action = cartActionCreators.toggleComponent()
    dispatch(action)
  },
})
 
export default connect(mapState, mapDispatch)(withRouter(Detail));