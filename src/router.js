import React from 'react';
import {Route, Switch} from 'react-router-dom';
// 按需加载
import loadable from 'react-loadable';
import Loading from '@/Loading/loading'

const Home = loadable({
  loader: () => import('~/home'),
  loading: Loading,
  timeout: 10000,
})
const Page = loadable({
  loader: () => import('~/Page'),
  loading: Loading,
  timeout: 10000,
})

const NotFound = loadable({
  loader: () => import('~/notFound'),
  loading: Loading,
  timeout: 10000
})

const getRouters = () => {
  <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route path="/page" component={Page}></Route>
    <Route component={NotFound} />
  </Switch>
}

export default getRouters