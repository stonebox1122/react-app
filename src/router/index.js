// 路由列表
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from '../store/index'
import App from '../App'
import Loadable from 'react-loadable'
import Loading from '@/Loading'
import Tabbar from '@/TabBar'

const Home = Loadable({
  loader: () => import('~/home'),
  loading: Loading
})

const Goods = Loadable({
  loader: () => import('~/goods'),
  loading: Loading
})

const Cart = Loadable({
  loader: () => import('~/cart'),
  loading: Loading
})

const Mine = Loadable({
  loader: () => import('~/mine'),
  loading: Loading
})

const Detail = Loadable({
  loader: () => import('~/goods/children/detail'),
  loading: Loading
})

const Login = Loadable({
  loader: () => import('~/common/login'),
  loading: Loading
})

const Registered = Loadable({
  loader: () => import('~/common/login/registered'),
  loading: Loading
})
const Video = Loadable({
  loader: () => import('~/home/children/video'),
  loading: Loading
})

const Share = Loadable({
  loader: () => import('~/common/share'),
  loading:Loading
})

const Authorize = Loadable({
  loader: () => import('~/common/login/wxAuthorize'),
  loading:Loading
})

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
            <Route path="/tab" exact component ={() =>
              <Redirect to="/tab/home"/>
            }/>
            <Route path="/tab/" component = {() => 
              <Tabbar>
                <Switch>
                  <Route path="/tab/home" component={Home}/>
                  <Route path="/tab/goods" component={Goods}/>
                  <Route path="/tab/cart" component={Cart}/>
                  <Route path="/tab/mine" component={Mine}/>
                </Switch>
              </Tabbar>
            }/>
            <Route path="/video/:id" component = {Video}/>
            <Route path="/detail/:id" component = {Detail}/>
            <Route path="/login" component = {Login}/>
            <Route path="/registered" component = {Registered}/>
            <Route path="/share/:id" component={Share}/> 
            <Route path="/wxAuthorize" component={Authorize}/>
          </App>
        </Router>        
      </Provider>
    )
  }
}