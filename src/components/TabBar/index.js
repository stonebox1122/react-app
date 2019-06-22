import React, { Component } from 'react';

export default class Tabbar extends Component {
  render() {
    return (
      <div>
        这是tabbar
        {this.props.children}
      </div>
    )
  }
}