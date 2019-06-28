import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './goods3.module.scss'
class Goods3 extends PureComponent {
  render() {
    const { img, imgH, title, sub_title } = this.props
    return (
      <section>
        <div className={style['container']}>
          <img style={{height:imgH}} className={style.img} src={ img } alt="img"/>
        </div>
        <div className={style['info-wrap']}>
          <div>
            { title }
          </div>
          <div>
            { sub_title }
          </div>
        </div>
      </section>
    );
  }
}

Goods3.propTypes = {
  img: PropTypes.string,
  imgH: PropTypes.string,
  title: PropTypes.element,
  sub_title: PropTypes.element
}

Goods3.defaultProps = {
  img: 'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg'
}
 
export default Goods3;