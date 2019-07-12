// 根路由
import React, { PureComponent } from 'react';

class App extends PureComponent {
  render () {
    return (
      <div style={{height:"100vh", width:"100vw", position:"fixed"}}>
        { this.props.children }
      </div>
    )
  }
}

export default App;
