import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { InputItem, Button } from 'antd-mobile';

import NavgationBar from '@/NavgationBar'
import WithdrawList from './list'
import style from './index.module.scss'
class Withdraw extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      isShowCom: false
    }
  }
  showCom =()=> {
    let flag = this.state.isShowCom
    this.setState({
      isShowCom: !flag
    })
  }
  render() { 
    let {back} = this.props
    let {isShowCom} = this.state
    return (
      <div className={ style.withdraw }>
        <NavgationBar handleLeft={back} right="提现记录" handleRight={this.showCom}>分享利润提现</NavgationBar>
        <section className={style.in}>
          <p className={style.title}>提现金额</p>
          <InputItem
            type="money"
            placeholder="请输入提现金额"
            extra="¥"
            clear
          >金额</InputItem>
          <p className={style.leave}>
            <span>分享利润剩余 5623.89</span>
            <span style={{color: "#108EE9"}}>全部提现</span>
          </p>
        </section>
        <section className={style['bank-num']}>
          <p className={`${style.title} border-bottom`}>提现到</p>
        </section>
        <Button className="paybtn">申请提现</Button>
        {
          isShowCom ? 
          <WithdrawList  back={this.showCom} />: ""
        }
      </div>
    );
  }
}

const mapState = state => ({
})
 
const mapDispatch = dispatch => ({

})

Withdraw.propTypes = {
  back: PropTypes.func
}

export default connect(mapState,mapDispatch)(Withdraw);