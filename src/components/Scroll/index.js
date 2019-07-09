import React, { PureComponent } from 'react';
import BScroll from '@better-scroll/core'
import style from './index.module.scss'
class Scroll extends PureComponent {
  componentDidMount() {
    this.myScroll = new BScroll('.scroll', {
      pullUpLoad: true,
      wheel: true,
      scrollbar: true,
      click: true
    })
  }
  
  render() { 
    return (
      <div className={`${style.container} scroll`}>
        { this.props.children }
      </div>
    );
  }
}
 
export default Scroll;