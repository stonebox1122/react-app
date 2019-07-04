import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './index.module.scss'
class NumController extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }
  render() {
    let {num, handleIncrease, handleDecrease } = this.props
    return (
      <div className={style.container}>
        <span onClick={handleDecrease} className={style.decrease}></span>
        <span className={style.num}>{num}</span>
        <span onClick={handleIncrease} className={style.increase}></span>
      </div>
    );
  }
}

NumController.propTypes = {
  num: PropTypes.number,
  handleBtn: PropTypes.func
}

NumController.defaultTypes = {
  num: 1
}

export default NumController;