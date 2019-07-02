import React, { PureComponent } from 'react';
import NavgationBar from '@/NavgationBar';
import Scroll from '@/Scroll';
import {Icon} from 'react-weui';
import style from './index.module.scss';
class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      selectAll: true,
      navRight: true
    }
  }
  toggleSelectAll = () => {
    let flag = this.state.selectAll
    this.setState({
      selectAll: !flag
    })
  }
  handlEdit = () => {
    let flag = this.state.navRight
    this.setState({
      navRight: !flag
    })
  }
  render() { 
    const {selectAll, navRight} = this.state
    return (
      <section className={style['goods-list']}>
        <NavgationBar
          left = ' '
          right= {navRight ? '管理' : '完成'}
          handleRight={this.handlEdit}
        >购物车</NavgationBar>
        {/* 购物车列表 */}
        <div className={style['list-wrap']}>
          <Scroll>
            <ul></ul>
          </Scroll>
        </div>
        {/* 编辑 */}
        <div className = {style.edit}>
          <div className={style.select} onClick={this.toggleSelectAll}>
            <Icon value={selectAll? 'success': 'circle'}/>
            <span className={style.text}>全选</span>
          </div>
          <div className={style.menu}>
            {
              navRight ?
              <div className={style.info}>122</div>
              : ''
            }
            <div className={`${style.btn} ${navRight? '': style.del}`}>
              {navRight ? '结算': '删除'}
            </div>
          </div>
        </div>
      </section>
    );
  }
}
 
export default Cart;