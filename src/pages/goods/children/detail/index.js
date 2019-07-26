// 商品详情
import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'
import { Icon, Toast } from 'antd-mobile';
import { Badge } from 'react-weui'
import NavgationBar from '@/NavgationBar';
// import Tab from '@/Tab';
import Scroll from '@/Scroll';
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
      kind: {}
    }
  }
  componentDidMount() {
    let query = {
      token: this.props.token,
      gid: this.props.match.params.id
    }
    this.props.getDetail(query)
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
  
  scrollTo = () => {

  }
  selectKind = (e) => {
    this.setState({
      kind: e
    })
  }
  // 加入购物车
  addCart = () => {
    let {kind, num} = this.state
    if (kind.valueid) {
      let query = {
        gid: this.props.match.params.id,
        img: this.props.detail.share_img,
        num,
        title: this.props.detail.title,
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
        <Link to={`/tab/cart`}>
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
    let { detail } = this.props
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
                {
                  detail.tailimgs ? 
                  detail.tailimgs.map(e => {
                    return (
                      <img className={style['bottom-img']} src={e.img} alt="img" key={e.imgid}/>
                    )
                  }): ""
                }
              </section>
            </div>
          </Scroll>
        </div>
        {/* 底部结算按钮 */}
        <div className={style.bottom}>
          <div className={style.server} onClick={this.props.showPhone.bind(this, detail)}>
            <img src={require('../../img/server.png')} alt='server'/>
            <p>客服</p>
          </div>
          <div className={style.addCart} onClick={this.addCart}>加入购物车</div>
        </div>
      </div>
    );
  }
}

const mapState = (state) => ({
  token: state.getIn(['login', 'token']),
  detail: state.getIn(['goods', 'detail']),
  cart: state.getIn(['cart', 'list']).toJS()
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
  }
})
 
export default connect(mapState, mapDispatch)(Detail);