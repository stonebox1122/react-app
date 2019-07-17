// 商品详情
import React, { PureComponent } from 'react';
import NavgationBar from '@/NavgationBar';
import Tab from '@/Tab';
import Scroll from '@/Scroll';
import NumberController from '@/NumberController'
import Swiper from 'swiper/dist/js/swiper.js';
import 'swiper/dist/css/swiper.min.css';
import style from './index.module.scss';
class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      num: 1
    }
  }
  componentDidMount() {
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
  render() { 
    return (
      <div className={style.detail}>
        <NavgationBar
          right = ""
        >
          <Tab 
            currentIndex={1}
            changeCurr={this.scrollTo}
            list={[{title:'商品', key: 1},{title:'详情', key: 2},{title:'评论', key: 3}]}/>
        </NavgationBar>
        <div className={style['scroll-wrap']}>
          <Scroll>
            <div className={style.container}>
              {/*轮播图部分  */}
              <div className={`swiper-container ${style['banner-h']}`}>
                <div className="swiper-wrapper">
                  <img alt="img" className="swiper-slide" src="https://ww1.sinaimg.cn/bmiddle/6ab21582gy1fitxfchiujj2334274hdz.jpg"/>
                  <img alt="img" className="swiper-slide" src="https://ww4.sinaimg.cn/bmiddle/6ab21582gy1fitxfyn3k0j21yq3347wn.jpg"/>
                  <img alt="img" className="swiper-slide" src="https://ww3.sinaimg.cn/bmiddle/6ab21582gy1fitxfso9fgj220e334kjs.jpg"/>
                </div>
                <div className='swiper-pagination'></div>
              </div>
              {/* 价格 */}
              <section className={`${style.price} ${style.card}`}>
                <p>$998<span>火爆热卖</span></p>
              </section>
              {/* 商品名 */}
              <section className={`${style.name} ${style.card}`}>
                蕙之魅乳康宝（复合果蔬饮品）蕙之魅乳康宝复合果蔬饮品
              </section>
              {/* tag */}
              <ul className={`${style.tag} ${style.card}`}>
                <li className={style.item}>正品保证</li>
                <li className={style.item}>官方发货</li>
                <li className={style.item}>急速退款</li>
              </ul>
              {/* 规格 */}
              <section className={`${style.sku} ${style.card}`}>
                <p className={style.title}>规格</p>
                <p className={style.title}>数量</p>
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
              </section>
              {/* 商品评价 */}
              <section className={`${style.introduce} ${style.card}`}>
                <p className={style.title}>商品评价</p>
              </section>
              {/* 图文详情 */}
              <section className={`${style.introduce} ${style.card}`}>
                <p className={style.title}>图文详情</p>
              </section>
            </div>
          </Scroll>
        </div>
        {/* 底部结算按钮 */}
        <div className={style.bottom}>
          <div className={style.server}>s</div>
          <div className={style.addCart}>加入购物车</div>
        </div>
      </div>
    );
  }
}
 
export default Detail;