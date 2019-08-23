import React from 'react';
import ReactDOM from 'react-dom';
import Router from '../src/router';
import 'weui';
import 'react-weui/build/packages/react-weui.css';
import './common/css/index.scss'
// import VConsole from 'vconsole/dist/vconsole.min.js' //import vconsole
/* eslint-disable */
// let vConsole = new VConsole() // 初始化
ReactDOM.render(<Router />, document.getElementById('root'));