import React, { PureComponent } from 'react';
import NavgationBar from '@/NavgationBar'

import style from './index.module.scss'
class Tower extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <section className={style['tower-list']}>
        <NavgationBar>能量塔</NavgationBar>
      </section>
    );
  }
}
 
export default Tower;