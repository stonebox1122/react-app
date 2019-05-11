import React, {PureComponent} from 'react';
import { Link } from 'react-router-dom';

export default class Nav extends PureComponent {
  render () {
    return (
      <div>
        <ul>
          <li><Link to="/">首页</Link></li>
          <li><Link to="/page">page</Link></li>
          <li><Link to="/counter">counter</Link></li>
          {/* {
            this.props.children
          } */}
        </ul>
      </div>
    )
  }
}