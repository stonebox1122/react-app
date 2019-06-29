import React, { PureComponent } from 'react';
import NavgationBar from '@/NavgationBar'

import style from './index.module.scss'
class Tower extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  back = () => {
    // 让父组件隐藏
    console.log('hide')
  }
  render() { 
    return (
      <section className={style['tower-list']}>
        <NavgationBar
          handleLeft = {this.back}
          right = ""
        >能量塔</NavgationBar>
      </section>
    );
  }
}
 
export default Tower;