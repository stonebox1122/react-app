// 路由列表
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import App from '../App'
import Tabbar from '../components/TabBar'
import Home from '../pages/home'
import Goods from '../pages/goods'
import Cart from '../pages/cart'
import Mine from '../pages/mine'

import Login from '../pages/common/login'
export default class Routers extends Component {
  render() {
    return (
      <Router>
        <App>
          <Route path="/tab" component = {() => 
            <Tabbar>
              <Switch>
                <Route path="/tab/home" component={Home}/>
                <Route path="/tab/goods" component={Goods}/>
                <Route path="/tab/cart" component={Cart}/>
                <Route path="/tab/mine" component={Mine}/>
              </Switch>
            </Tabbar>
          }/>
          <Route path="/login" component ={Login}/>
        </App>
      </Router>
    )
  }
}