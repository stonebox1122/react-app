import React, { Component } from 'react';
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
import Tab from '@/Tab'
import style from './index.module.scss'
class VideoList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: props.currentIndex,
      title: ''
    }
  }
  componentDidMount() {
    const index = this.props.currentIndex;
    let title;
    switch (index) {
      case 0:
        title = '全部视频'
        break;
      case 1:
        title = '免费视频'
        break;
      case 2:
        title = '精彩尝鲜'
        break;
      case 3:
        title = '精品推荐'
        break;
      default:
        title = '全部视频'
        break;
    }
    this.setState({
      title,
      currentIndex: index
    })
  }
  back = () => {
    // 让父组件隐藏
    console.log('hide')
  }
  changeTab = (index) => {
    this.setState({
      currentIndex: index
    })
  }
  render() {
    const TabList = [
      {title: '全部', key: 0},
      {title: '免费视频', key: 1},
      {title: '精彩尝鲜', key: 2},
      {title: '精品推荐', key: 3}
    ]
    return (
      <div className={style.container}>
        <NavgationBar
          right=""
          handleLeft = {this.back}
        >{this.state.title}</NavgationBar>
        <Tab list= {TabList} currentIndex = {this.state.currentIndex} changeCurr={this.changeTab}/>
        {/* 商品列表 */}
        
      </div>
    );
  }
}

VideoList.propTypes = {
  currentIndex: PropTypes.number
}
VideoList.defaultProps = {
  currentIndex: 0
}
export default VideoList;