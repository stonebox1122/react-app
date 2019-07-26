import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import * as actionCreator from './store/actionCreators'
import NavgationBar from '@/NavgationBar';
import Scroll from '@/Scroll';
import Goods2 from '@/Goods/goods_2'
import NumberController from '@/NumberController'
import ConfirmOrder from '~/cart/children/ConfirmOrder'
import {toFixed2} from '$src/common/js/utils'
import {Icon} from 'react-weui';
import style from './index.module.scss';
import { Toast } from 'antd-mobile';
class Cart extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      navRight: true
    }
  }

  // 删除模式/结算模式
  handlEdit = () => {
    let flag = this.state.navRight
    this.setState({
      navRight: !flag
    })
  }
  // 提交
  sub = () => {
    let { list } =  this.props
    let flag = list.some((e)=> {
      return e.selected === true
    })
    if (this.state.navRight) {
      if (flag) {
        this.props.toggleShowCom()
      } else {
        Toast.fail('请先选择要结算的商品', 1)
      }
    } else {
      if (flag) {
        this.props.del()
      } else {
        Toast.fail('请先选择要删除的商品', 1)
      }
    }
  }
  // 设置结算价格
  setNum = () => {
    let { list } = this.props
    let num = 0;
    list.forEach(e => {
      if (e.selected) {
        num += e.price * e.num
      }
    });
    return (
      <span>{toFixed2(num)}</span>
    )
  }
  // 结算
  selected = () => {
    let { list } = this.props
    let num = 0;
    list.forEach(e => {
     if (e.selected) {
       num+=1
     }
    })
    return (
      <span>结算({num})</span>
    )
  }
  // 渲染购物车的商品列表
  renderList = () => {
    let { list, toggleSelect, changeNum } = this.props
    // 购物车为空时的占位
    if (list.length <= 0) {
      return (
        <li className={style.empty}>
          <img className={style.img} src={require(`$static/img/empty_icon.png`)} alt="购物车为空"/> 
        </li>
      )
    } else {
      const newList = list.map((e,i) => {
        return (
          <li className={style.item} key={`${e.gid}${i}`}>
            <Icon onClick = {() => toggleSelect(e)} value={e.selected ? "success" : "circle"}/>
            <div className={style.goods}>
              <Goods2
                height="90px" 
                info ={e}
                bottom_left = {
                  <div>{e.pricestr}</div>
                }
                bottom_right = {
                  <div className={style['bottom-right']}>
                    <NumberController
                      num={e.num}
                      handleDecrease={() => changeNum({id: e.gid, way: 'decrease'})}
                      handleIncrease={() => changeNum({id: e.gid, way: 'increase'})}/>
                  </div>
                }
              />
            </div>
          </li>
        )
      })
      return newList
    }
  }

  render() { 
    const { navRight } = this.state
    const  { selectAll, toggleSelectAll, isShowCom } = this.props
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
          <div className={style.select} onClick={toggleSelectAll}>
            <Icon value={selectAll? 'success': 'circle'}/>
            <span className={style.text}>全选</span>
          </div>
          <div className={style.menu}>
            {
              navRight ?
              <div className={style.info}>
                合计：{this.setNum()}
              </div>
              : ''
            }
            <div className={`${style.btn} ${navRight ? '': style.del}`} onClick={this.sub}>
              { navRight ? this.selected(): '删除' }
            </div>
          </div>
        </div>
        {/* 确认订单页面 */}
        {
          isShowCom ? <ConfirmOrder/> : ''
        }
      </section>
    );
  }
}
 
const mapState = (state) => ({
  list: state.getIn(['cart', 'list']).toJS(),
  selectAll: state.getIn(['cart', 'selectAll']),
  isShowCom: state.getIn(['cart', 'isShowCom'])
})

const mapDispatch = (dispatch) => ({
  toggleSelect (e) {
    const action = actionCreator.toggleSelect(e)
    dispatch(action)
  },
  // 全选/取消全选
  toggleSelectAll () {
    const action = actionCreator.toggleSelectAll()
    dispatch(action)
  },
  // 改变购物车中的数量
  changeNum (option) {
    const action=actionCreator.changeNum(option)
    dispatch(action)
  },
  // 是否显示子页面
  toggleShowCom () {
    const action = actionCreator.toggleComponent()
    dispatch(action)
  },
  del () {
    const action = actionCreator.del()
    dispatch(action)
  }
})
export default connect(mapState,mapDispatch)(Cart);