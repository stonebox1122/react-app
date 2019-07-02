import React, { PureComponent } from 'react';
import NavgationBar from '@/NavgationBar'

import style from './index.module.scss'
class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <section className={style['goods-list']}>
        <NavgationBar
          left = ' '
          right= ''
        >购物车</NavgationBar>
        <div className={style['list-wrap']}>
          1
        </div>
      </section>
    );
  }
}
 
export default Cart;