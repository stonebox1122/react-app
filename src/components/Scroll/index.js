import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import BScroll from '@better-scroll/core'
import Pullup from '@better-scroll/pull-up'
import style from './index.module.scss'

BScroll.use(Pullup)
class Scroll extends PureComponent {
  componentDidMount() {
    this.myScroll = new BScroll('.scroll', {
      pullUpLoad: {
        threshold: 30
      },
      wheel: true,
      scrollbar: true,
      click: true,
      scrollY: true
    })
    this.myScroll.on('pullingUp', this.pullingUpHandler.bind(this))
  }
  // 数据更新完render之后再刷新
  componentDidUpdate () {
    this.myScroll.refresh()
  }
  // 监听上拉事件
  async pullingUpHandler() {
    await this.props.pullUpHandler()
    this.myScroll.finishPullUp()
    
    this.myScroll.refresh()
  }
  render() { 
    return (
      <div className={`${style.container} scroll`}>
        { this.props.children }
      </div>
    );
  }
}

Scroll.propTypes = {
  pullUpHandler: PropTypes.func
}

Scroll.defaultProps = {
  pullUpHandler: () => {
    console.log('pull up ')
  }
}

export default Scroll;