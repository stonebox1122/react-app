import React, { Component } from 'react';
import NavgationBar from '@/NavgationBar'
import Tab from '@/Tab'
import style from './index.module.scss'
class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  changeTab (index) {
    console.log(index)
  }
  render() {
    const TabList = [
      {title: '全部', key: 0},
      {title: '免费视频', key: 1},
      {title: '精彩尝鲜', key: 2},
      {title: '精彩视频', key: 3}
    ]
    return (
      <div className={style.container}>
        <NavgationBar
          right=""
        >免费视频</NavgationBar>
        <Tab list= {TabList} currentIndex = "1" changeCurr={this.changeTab}/>
        {/* 商品列表 */}
        
      </div>
    );
  }
}
 
export default VideoList;