import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { Tabs, InputItem, Button } from 'antd-mobile';
import NavgationBar from '@/NavgationBar'
import EnchargeList from './list'
import style from './index.module.scss'
import './index.scss'
class Encharge extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      type: 0,
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
    const tabs = [
      { title: '充值商城积分', key: 0 },
      { title: '充值购物积分', key: 1 },
    ];
    let {back} = this.props
    let {type, isShowCom} = this.state
    return (
      <div className={ style.encharge }>
        <NavgationBar handleLeft = {back} right="充值记录" handleRight={this.showCom}>充值</NavgationBar>
        <Tabs tabs={tabs} initialPage={type} onChange={(tab, index) => { this.setState({type:index})}}></Tabs>
        <InputItem
          type="money"
          placeholder="0.00"
          extra="¥"
          clear
        >金额</InputItem>
        <section className={style.card}>
          <p className={style.title}>支付方式</p>
          <div className={style.tag}>微信</div>
        </section>
        <Button className="paybtn">立即支付</Button>
        {
          isShowCom ? 
          <EnchargeList type={type} back={this.showCom} />: ""
        }
      </div>
    );
  }
}

const mapState = state => ({
})
 
const mapDispatch = dispatch => ({

})

Encharge.propTypes = {
  back: PropTypes.func
}

export default connect(mapState,mapDispatch)(Encharge);