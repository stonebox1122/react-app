// 根路由
import React, { PureComponent } from 'react';

class App extends PureComponent {
  render () {
    return (
      <div style={{height:"100vh"}}>
        { this.props.children }
      </div>
    )
  }
}

export default App;
