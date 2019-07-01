import React, { PureComponent } from 'react';
import { connect  } from 'react-redux';
import * as actionCreators from '../../store/actionCreators'

import NavgationBar from '@/NavgationBar'

import style from './index.module.scss'
class Course extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  // back = () => {
  //   // 让父组件隐藏
  //   console.log('hide')
  // }
  render() { 
    return (
      <section className={style['course-list']}>
        <NavgationBar
          handleLeft = {this.props.back}
          right = ""
        >能量课程</NavgationBar>
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

export default connect(null,mapDispatch)(Course);