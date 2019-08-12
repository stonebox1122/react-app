import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import NavgationBar from '@/NavgationBar'
import PropTypes from 'prop-types'
import { List } from 'antd-mobile';
import style from './index.module.scss'
const Item = List.Item;

class Wallet extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    let {purse} = this.props
    return (
      <div className={ style.wallet }>
        <NavgationBar right="">钱包</NavgationBar>
        <div className={style.container}>
          <section className={style.card}>
            <p className={style.title}>分享利润</p>
            <div className={style['price-wrap']}>
              <p className={style.price}>
                <span style={{fontSize: "16px", display:"inline-block"}}>￥</span>
                {purse.profitsharing}
              </p>
              <div className={style.trans}>转账</div> 
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
            <div className={style.i}>
              <img src={require('./img/wallet_icon_recharge.png')} alt="icon"/>
              <p>商城积分充值</p>
            </div>
            <div className={style.i}>
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
                onClick={() => {}}
              >
                利润转积分
              </Item>
              <Item
                arrow="horizontal"
                thumb={require('./img/wallet_icon_recharge_2.png')}
                multipleLine
                onClick={() => {}}
              >
                购物积分充值
              </Item>
              <Item
                arrow="horizontal"
                thumb={require('./img/wallet_icon_transfer.png')}
                multipleLine
                onClick={() => {}}
              >
                购物积分转账
              </Item>
            </List>
          </section>
        </div>
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