// 商品详情
import React, { PureComponent } from 'react';
import NavgationBar from '@/NavgationBar';
import Tab from '@/Tab';
// import style from './index.module.scss'
class Detail extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  scrollTo = () => {

  }
  render() { 
    return (
      <div>
        <NavgationBar
          right = ""
        >
          <Tab 
            currentIndex={1}
            changeCurr={this.scrollTo}
            list={[{title:'商品', key: 1},{title:'详情', key: 2},{title:'评论', key: 3}]}/>
        </NavgationBar>
      </div>
    );
  }
}
 
export default Detail;