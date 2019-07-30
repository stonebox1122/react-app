import React, { useState } from 'react'
import { Button  } from 'antd-mobile';

const Mine = () => {
  const [count, setCount] = useState(0)
  return (
    <div>
      <Button onClick={e => setCount(count => count + 1)}>mine{count}</Button>
    </div>
  )
}

export default Mine

// import React, { Component } from 'react';
// import { Button  } from 'antd-mobile';
// import style from './index.module.scss'
// export default class Mine extends Component {
//   render() {
//     return (
//       <div>
//         这是mine<Button>Start</Button>
//       </div>
//     )
//   }
// }
