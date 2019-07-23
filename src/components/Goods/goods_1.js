import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

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
            <span>{ info.price }</span>
            {
              info.marketprice ?
              <span className={style.del}>{info.marketprice}</span>
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
    gid: '',
    img: '',
    title: '',
    subtitle: '1231231',
    price: 0,
    marketprice: 0,
    sales: 0
  }
}
 
export default Goods1;