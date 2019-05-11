import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { increment, decrement, reset } from './actions';

class Counter extends PureComponent {
  render () {
    return (
      <div>
        <div>当前计数为{this.props.count}</div>
        <button onClick={() => this.props.increment()}>自增
        </button>
        <button onClick={() => this.props.decrement()}>自减
        </button>
        <button onClick={() => this.props.reset()}>重置
        </button>
      </div>
    )
  }
}

const mapState = (state) => ({

})

const mapDispatch = (dispatch) => ({
  increment: () => {
    dispatch(increment())
  },
  decrement: () => {
    dispatch(decrement())
  },
  reset: () => {
    dispatch(reset())
  }
})

export default connect(mapState, mapDispatch)(Counter)