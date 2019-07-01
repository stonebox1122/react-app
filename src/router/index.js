// 路由列表
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/index'
import App from '../App'
import Tabbar from '../components/TabBar'
import Home from '../pages/home'
import Goods from '../pages/goods'
import Cart from '../pages/cart'
import Mine from '../pages/mine'

import Login from '../pages/common/login'
import Registered from '../pages/common/login/registered'
export default class Routers extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <App>
            {/* 访问根路径直接定向到首页 */}
            <Route path="/" exact component ={() =>
              <Redirect to="/tab/home"/>
            }/>
            <Route path="/tab" component = {() => 
              <Tabbar>
                <Redirect to="/tab/home"/>
                <Switch>
                  <Route path="/tab/home" component={Home}/>
                  <Route path="/tab/goods" component={Goods}/>
                  <Route path="/tab/cart" component={Cart}/>
                  <Route path="/tab/mine" component={Mine}/>
                </Switch>
              </Tabbar>
            }/>
            <Route path="/login" component = {Login}/>
            <Route path="/registered" component = {Registered}/>
          </App>
        </Router>        
      </Provider>
    )
  }
}