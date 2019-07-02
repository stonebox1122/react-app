import React, { PureComponent } from 'react';
import BScroll from '@better-scroll/core'
import style from './index.module.scss'
class Scroll extends PureComponent {
  componentDidMount() {
    this.myScroll = new BScroll('#scroll', {
      pullUpLoad: true,
      wheel: true,
      scrollbar: true,
    })
  }
  
  render() { 
    return (
      <div id="scroll" className={style.container}>
        {/* <div> */}
          { this.props.children }
        {/* </div> */}
      </div>
    );
  }
}
 
export default Scroll;