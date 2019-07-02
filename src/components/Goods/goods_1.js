import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { toFixed2 } from '../../common/js/utils'

import style from './goods1.module.scss'
class Goods1 extends PureComponent {
  render() {
    const { info } = this.props
    return (
      <section>
        <div className={style['container']}>
          <div className = {style['img-wrap']}>
            <img className={style.img} src={info.img} alt="img"/>
          </div>
        </div>
        <div className={style['info-wrap']}>
          <p className={style.title}>
            { info.title }
          </p>
          <p className={style.price}>
            <span>￥{ toFixed2(info.price) }</span>
            {
              info.del_price ?
              <span className={style.del}>￥{toFixed2(info.price)}</span>
              : ""
            }
          </p>
        </div>
      </section>
    );
  }
}

Goods1.propTypes = {
  info: PropTypes.object
}

Goods1.defaultProps = {
  info: {
    img: 'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
    title: '商品标题商品标题商品标题商品标题商品标题商品标题',
    price: 123.1
  }
}
 
export default Goods1;