import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import { Tabs, InputItem, Button } from 'antd-mobile';
import TransfromList from './list'
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
import style from './index.module.scss'
class Transform extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
      type: 0,
      flag: 0,
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
    let {back,purse} = this.props;
    let {type,flag,isShowCom} = this.state;
    const tabs = [
      { title: '转给自己', key: 0 },
      { title: '转给朋友', key: 1 },
    ];
    return (
      <div className={ style.Transform }>
        <NavgationBar handleLeft = {back} right="转账记录" handleRight={this.showCom}>转账</NavgationBar>
        <Tabs tabs={tabs} initialPage={type} onChange={(tab, index) => { this.setState({type:index, flag: 0})}}></Tabs>
        <section>
          <div className={style['card-wrap']} >
            <div onClick={() => this.setState({flag:0})} className={`${style.card} ${ flag=== 0 ? style.active: ""}`}>
              <p>分享利润转分享利润</p>
              <p className={style['sub-title']}>分享利润剩余{purse.profitsharing}</p>
            </div>
            {
              type === 1 ?
              <div onClick={() =>this.setState({flag:1})} className={`${style.card} ${ flag=== 1 ? style.active: ""}`}>
                <p>分享利润转购物积分</p>
                <p className={style['sub-title']}>分享利润剩余{purse.profitsharing}</p>
              </div>: ""
            }
          </div>
          {
            type === 0 ?
            <InputItem
              type="money"
              placeholder="0.00"
              extra="全部"
              clear
            >金额</InputItem>
            :
            <InputItem
              placeholder="请输入对方ID账号"
              clear
            >对方账户</InputItem>
          }
          
        </section>
        <Button className="paybtn">确认转账</Button>
        {
          isShowCom ? 
          <TransfromList  back={this.showCom} />: ""
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

Transform.propTypes = {
  back: PropTypes.func
}

export default connect(mapState,mapDispatch)(Transform);