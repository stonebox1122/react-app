import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
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
  // 全选/取消全选
  toggleSelectAll = () => {
    let flag = this.state.selectAll
    this.setState({
      selectAll: !flag
    })
  }
  // 删除模式/结算模式
  handlEdit = () => {
    let flag = this.state.navRight
    this.setState({
      navRight: !flag
    })
  }
  // 渲染购物车的商品列表
  renderList = () => {
    let { list } = this.props
    // 购物车为空时的占位
    if (list.length <= 0) {
      return (
        <li className={style.empty}>
          <img className={style.img} src={require(`$static/img/empty_icon.png`)} alt="购物车为空"/> 
        </li>
      )
    } else {
      return list.map(e => {
        return (
          <li >e.title</li>
        )
      })
    }
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
            <ul className={style.wrap}>
              { this.renderList() }
            </ul>
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
            <div className={`${style.btn} ${navRight ? '': style.del}`}>
              { navRight ? '结算': '删除' }
            </div>
          </div>
        </div>
      </section>
    );
  }
}
 
const mapState = (state) => ({
  list: state.getIn(['cart', 'list']).toJS()
})

export default connect(mapState,null)(Cart);