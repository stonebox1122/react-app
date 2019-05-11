import React from 'react';
import ReactDom from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import Nav from './components/Nav';
import getRouters from './router'
ReactDom.render(
    <Router>
        <Nav/>
        { getRouters }
    </Router>, 
    document.getElementById('app'));
