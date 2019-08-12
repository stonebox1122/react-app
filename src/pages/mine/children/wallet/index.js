import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import NavgationBar from '@/NavgationBar'
import PropTypes from 'prop-types'
import Transform from './children/transform'
import Encharge from './children/encharge'
import Withdraw from './children/withdraw'
import { List } from 'antd-mobile';
import style from './index.module.scss'

const Item = List.Item;

class Wallet extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      showCom: false,
      name: ''
    }
  }

  // 子组件显示
  handleShowCom = (name="") => {
    let flag = this.state.isShowCom
    this.setState({
      comName: name,
      isShowCom: !flag,
    })
  }
  // 动态改变子组件
  showCom = () => {
    const name = this.state.comName
    switch (name) {
      case 'Transform':
        return <Transform back={this.handleShowCom}/>
      case 'Encharge':
        return <Encharge back={this.handleShowCom}/>
      case 'Withdraw':
        return <Withdraw back={this.handleShowCom}/>
      default:
        break;
    }
  }

  render() { 
    let {purse, back} = this.props
    return (
      <div className={ style.wallet }>
        <NavgationBar right="" handleLeft = {back}>钱包</NavgationBar>
        <div className={style.container}>
          <section className={style.card}>
            <p className={style.title}>分享利润</p>
            <div className={style['price-wrap']}>
              <p className={style.price}>
                <span style={{fontSize: "16px", display:"inline-block"}}>￥</span>
                {purse.profitsharing}
              </p>
              <div className={style.trans} onClick={()=>this.handleShowCom('Transform')}>转账</div> 
            </div>
            <div className={style.score}>
              <div>
                <p>购物积分</p>
                <p>{purse.shoppingpoints}</p>
              </div>
              <div>
                <p>商城积分</p>
                <p>{purse.mallpoints}</p>
              </div>
            </div>
          </section>
          <section className={style.io}>
            <div className={style.i} onClick={()=>this.handleShowCom('Encharge')}>
              <img src={require('./img/wallet_icon_recharge.png')} alt="icon"/>
              <p>商城积分充值</p>
            </div>
            <div className={style.i} onClick={()=>this.handleShowCom('Withdraw')}>
              <img src={require('./img/wallet_icon_withdraw.png')} alt="icon"/>
              <p>分享利润提现</p>
            </div>
          </section>
          <section className={style.list}>
            <List>
              <Item
                arrow="horizontal"
                thumb={require('./img/wallet_icon_exchange.png')}
                multipleLine
                onClick={()=>this.handleShowCom('Transform')}
              >
                利润转积分
              </Item>
              <Item
                arrow="horizontal"
                thumb={require('./img/wallet_icon_recharge_2.png')}
                multipleLine
                onClick={()=>this.handleShowCom('Encharge')}
              >
                购物积分充值
              </Item>
              <Item
                arrow="horizontal"
                thumb={require('./img/wallet_icon_transfer.png')}
                multipleLine
                onClick={()=>this.handleShowCom('Transform')}
              >
                购物积分转账
              </Item>
            </List>
          </section>
        </div>
        {/* 子组件 动态 */} 
        {
          this.state.isShowCom ?
          <section className={style['full-screen']}>
            { this.showCom() }
          </section>
          : ""
        }
      </div>
    );
  }
}

const mapState = state => ({
  purse: state.getIn(['mine', 'mineInfo', 'userpurse']).toJS()
})
 
const mapDispatch = dispatch => ({

})

Wallet.propTypes = {
  back: PropTypes.func
}

export default connect(mapState,mapDispatch)(Wallet);