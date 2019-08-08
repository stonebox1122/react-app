// 我的订单
import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import Scroll from '@/Scroll'
import NavgationBar from '@/NavgationBar'
import { Tabs } from 'antd-mobile';
import style from './index.module.scss'
class MyOrder extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentDidMount() {
    console.log(this.props.type)
  }
  render() { 
    let {back} = this.props
    const tabs = [
      { title: '全部' },
      { title: '待付款'},
      { title: '待发货' },
      { title: '待收货' },
      { title: '待评价' },
    ];
    return (
      <div className={style.order}>
        <NavgationBar  handleLeft={back}
          right="">我的订单</NavgationBar>
        <Tabs tabs={tabs}
          tabBarActiveTextColor="#FFC105"
          tabBarUnderlineStyle={{borderColor:"#FFC105"}}
          initialPage={this.props.type}
          onChange={(tab, index) => { console.log('onChange', index, tab); }}
          onTabClick={(tab, index) => { console.log('onTabClick', index, tab); }}
        >
          <div className={style.item}>
            <Scroll>
              <div className={style['scroll-wrap']}>1</div>
            </Scroll>
          </div>
          <div className={style.item}>
            <Scroll>
              <div className={style['scroll-wrap']}>1</div>
            </Scroll>
          </div>
          <div className={style.item}>
            <Scroll>
              <div className={style['scroll-wrap']}>1</div>
            </Scroll>
          </div>
          <div className={style.item}>
            <Scroll>
              <div className={style['scroll-wrap']}>1</div>
            </Scroll>
          </div>
          <div className={style.item}>
            <Scroll>
              <div className={style['scroll-wrap']}>1</div>
            </Scroll>
          </div>
        </Tabs>
      </div>
    );
  }
}

MyOrder.propTypes = {
  back: PropTypes.func
}

export default MyOrder;