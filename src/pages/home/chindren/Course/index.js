import React, { PureComponent } from 'react';
import NavgationBar from '@/NavgationBar'

import style from './index.module.scss'
class Course extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    return (
      <section className={style['course-list']}>
        <NavgationBar>能量课程</NavgationBar>
      </section>
    );
  }
}
 
export default Course;