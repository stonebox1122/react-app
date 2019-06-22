import React, { Component, Fragment } from 'react';
import style from './index.module.scss'
export default class Tabbar extends Component {
  render() {
    return (
      <Fragment>
        {this.props.children}
        <div className={style['tabbar-wrap']}>111</div>
      </Fragment>
    )
  }
}