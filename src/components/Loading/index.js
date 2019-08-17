import React, { PureComponent } from 'react';
import { LoadMore } from 'react-weui'
class Loading extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#fff' }}>
        <LoadMore loading></LoadMore>
      </div>
    );
  }
}
 
export default Loading;