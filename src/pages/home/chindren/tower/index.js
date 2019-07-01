import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import * as actionCreators from '../../store/actionCreators'

import NavgationBar from '@/NavgationBar'

import style from './index.module.scss'
class Tower extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <section className={style['tower-list']}>
        <NavgationBar
          handleLeft = {this.props.back}
          right = ""
        >能量塔</NavgationBar>
      </section>
    );
  }
}

const mapDispatch = (dispatch) => ({
  back () {
    const action = actionCreators.toggleComponent();
    dispatch(action)
  }
})

export default connect(null,mapDispatch)(Tower);