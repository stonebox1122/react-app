import React from 'react';

import {Route, Switch} from 'react-router-dom';

import Home from '~/home'
import Page from '~/page'

const getRouters = () => {
  <Switch>
    <Route exact path="/" component={Home}></Route>
    <Route exact path="/" component={Page}></Route>
  </Switch>
}

export default getRouters