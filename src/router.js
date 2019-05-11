import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Home from '~/home'
import Page from '~/page'
import Counter from '../src/redux/counter'

const getRouters = () => {
  <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route path="/page" component={Page}></Route>
    <Route path="/counter" component={Counter}></Route>
  </Switch>
}

export default getRouters