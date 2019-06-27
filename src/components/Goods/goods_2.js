import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import style from './goods2.module.scss'
class Goods2 extends PureComponent {
  render() { 
    const { info, height, tag, bottom_left, bottom_right } = this.props
    return (
      <section className = {style['goods-wrap']} style={{height:height}}>
        <img src = {info.img} className={style.img} alt="img"/>
        <div className={style['info-wrap']}>
          <p className={style.title}>{info.title}</p>
          <p className={style['sub-title']}>{info.sub_title}</p>
          <div className={style.tag}>
            { tag }
          </div>
          <div className={style.bottom}>
            <div>
              { bottom_left }
            </div>
            <div>
              { bottom_right }
            </div>
          </div>
        </div>
      </section>
    );
  }
}
 
Goods2.propTypes = {
  info: PropTypes.object,         // 基本信息(图片,标题,介绍)
  height: PropTypes.string,       // 高度 这里不需要x2
  tag: PropTypes.element,         // tag jsx元素
  bottom_left: PropTypes.element, // 底部左边
  bottom_right: PropTypes.element // 底部右边
}

Goods2.defaultProps = {
  info: {
    img: 'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
    title: '商品标题商品标题商品标题商品标题商品标题商品标题',
    sub_title: 123.11
  },
  height: '128px'
}
 
export default Goods2;