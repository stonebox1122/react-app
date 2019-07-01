import React, { PureComponent } from 'react';
import NavgationBar from '@/NavgationBar'

import style from './index.module.scss'
class GoodsList extends PureComponent {
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
        >全部商品</NavgationBar>
      </section>
    );
  }
}
 
export default GoodsList;