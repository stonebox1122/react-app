import React, { Component, Fragment } from 'react';
import { Tab, TabBar, TabBarItem, TabBody } from 'react-weui'
import {withRouter} from 'react-router';
// import style from './index.module.scss'

// 引入tabicon
import Home_n from './img/tab_home.png'
import Home_s from './img/tab_home_pre.png'
import Goods_n from './img/tab_product.png'
import Goods_s from './img/tab_product_pre.png'
import Cart_n  from './img/tab_shop.png'
import Cart_s from './img/tab_shop_pre.png'
import Mine_n from './img/tab_personal.png'
import Mine_s from './img/tab_personal_pre.png'

class Tabbar extends Component {
  constructor (props) {
    super(props)
    this.state = {
      tab: 0
    }
  }
  
  // 点击改变tab页面
  handleChangeTab  (index)  {
    this.setState({
      tab: index
    })
    switch (index) {
      case 0:
        // 使用这个api要引用withRouter
        this.props.history.push('/tab/home');
        break;
      case 1:
        this.props.history.push('/tab/goods');
        break;
      case 2:
        this.props.history.push('/tab/cart');
        break;
      case 3:
        this.props.history.push('/tab/home');
        break;
      default:
          this.props.history.push('/tab/home');
        break;
    }
  }
  render() {
    return (
      <Fragment>
        <Tab>
          <TabBody>{this.props.children}</TabBody>
          <TabBar>
            <TabBarItem 
              label="home" 
              icon={<img src={ this.state.tab === 0 ? Home_s : Home_n } alt="home"/>}
              active={this.state.tab === 0}
              onClick = {() => {this.handleChangeTab(0) }}
              />
            <TabBarItem
              label="goods"
              icon={<img src={ this.state.tab === 1 ? Goods_s : Goods_n } alt="goods"/>}
              active={this.state.tab === 1}
              onClick = {() => {this.handleChangeTab(1)}}/>
            <TabBarItem
              label="cart"
              icon={<img src={ this.state.tab === 2 ? Cart_s : Cart_n } alt="cart"/>}
              active={this.state.tab === 2}
              onClick = {() => {this.handleChangeTab(2)}}/>
            <TabBarItem
              label="mine"
              icon={<img src={ this.state.tab === 3 ? Mine_s : Mine_n } alt="mine"/>}
              active={this.state.tab === 3}
              onClick = {() => {this.handleChangeTab(3)}}/>
          </TabBar>
        </Tab>
      </Fragment>
    )
  }
}

export default withRouter(Tabbar)