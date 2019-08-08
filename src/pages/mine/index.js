import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { TabBar, Grid  } from 'antd-mobile';
import Set from './children/set'
import PersonInfo from './children/personInfo'
import ServerNode from './children/serverNode'
import ApplicationVip from './children/applicationVip'
import * as mineActionCreators from './store/actionCreators'
import style from './index.module.scss';

class Mine extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {
      isShowCom: false,
      comName: '',
      walletIcons: [{
        icon: require('./img/personal_icon_transfer.png'),
        text: '转账'
      },{
        icon: require('./img/personal_icon_recharge.png'),
        text: '充值'
      },{
        icon: require('./img/personal_icon_cash.png'),
        text: '提现'
      },{
        icon: require('./img/personal_icon_exchange.png'),
        text: '利润转积分'
      },{
        icon: require('./img/personal_icon_integral.png'),
        text: '充值购物积分'
      },{
        icon: require('./img/personal_icon_pt.png'),
        text: '购物积分转账'
      }],
      managerCenter: [{
        icon: require('./img/personal_icon_gm.png'),
        text: '一代会员',
        key: 'ServerNode'
      },{
        icon: require('./img/personal_icon_sgm.png'),
        text: '二代会员',
        key: 2
      },{
        icon: require('./img/personal_icon_promotion.png'),
        text: '推广二维码',
        key: 3
      },{
        icon: require('./img/personal_icon_proxy.png'),
        text: '申请代理',
        key: 4
      },{
        icon: require('./img/personal_icon_sc.png'),
        text: '申请服务中心',
        key: 5
      },{
        icon: require('./img/personal_icon_member.png'),
        text: '申请会员',
        key: 'ApplicationVip'
      },{
        icon: require('./img/personal_icon_video.png'),
        text: '已购买视频',
        key: 7
      }]
    }
  }
  componentDidMount() {
    if (this.props.mine) {
      this.init()
    }
  }
  init = () => {
    let {userid, token, initMine} = this.props
    let query = {
      userid,
      token
    }
    initMine(query)
  }

  // 子组件显示
  handleShowCom = (name="Set") => {
    let flag = this.state.isShowCom
    this.setState({
      comName: name,
      isShowCom: !flag
    })
  }
  // 动态改变子组件
  showCom = () => {
    const name = this.state.comName
    switch (name) {
      case 'Set':
        return <Set back={this.handleShowCom}/>
      case 'PersonInfo':
        return <PersonInfo back={this.handleShowCom}/>
      case 'ServerNode':
        return <ServerNode back={this.handleShowCom}/>
      case 'ApplicationVip':
        return <ApplicationVip back={this.handleShowCom}/>
      default:
        break;
    }
  }

  // 菜单的点击
  handleManager = (el) => {
    switch (el.key) {
      case "ServerNode":
        this.handleShowCom(el.key)
        break;
      case "ApplicationVip":
        this.handleShowCom(el.key)
        break;
      default:
        break;
    }
  }
  
  render () {
    let {mine} = this.props
    let {userinfo, userpurse, ordercount} = mine
    let {walletIcons,managerCenter} = this.state
    return (
      <div style={{backgroundColor: "#F5F6F7"}}>
        <section className={style.head}>
          {
            userinfo ? 
            <img onClick={()=>this.handleShowCom("PersonInfo")} src={userinfo.avatar} className={style.avatar} alt="avatar"/>
            :          
            <img src={require("./img/personal_btn_avatar.png")} className={style.avatar} alt="acatar"/>
          }
          <div className={style.info}>
            {
              userinfo ? 
              <div className={style.detail}>
                <p className={style.title}>
                  {userinfo.userno}
                  <img className={style.vip} src={require('./img/personal_icon_vip.png')} alt="vip"/>
                </p>
                <p className={style.title}>
                  <span className={style.tag}>{userinfo.levelname}</span>
                  <img className={style.vip} src={require('./img/personal_icon_shop.png')} alt="vip"/>
                </p>
              </div>
              :<Link to="/login">点击登录</Link>
            }
          </div>
          <div className={style.right}>
            <img
              className={style.setting}
              onClick={()=>this.handleShowCom("Set")}
              src={require("./img/personal_icon_setting.png")}
              alt="setting"/>
            <img className={style.sign} src={require("./img/personal_icon_qiandao.png")} alt="sign"/>
          </div>
        </section>
        <ul className={style.wallet}>
          <li className={style.item}>
            <p>{userpurse && userpurse.shoppingpoints}</p>
            <p>购物积分</p>
          </li>
          <li className={style.item}>
            <p>{userpurse && userpurse.profitsharing}</p>
            <p>分享利润</p>
          </li>
          <li className={style.item}>
            <p>{userpurse && userpurse.mallpoints}</p>
            <p>商城积分</p>
          </li>
        </ul>
        <section className={style['course-vip']}>
          <img className={style.banner} src={require("./img/personal_btn_vip.png")} alt="sign"/>
        </section>
        <section className={style['order-type']}>
          <TabBar
            tabBarPosition="top"
          >
            <TabBar.Item
              title="全部订单"
              key="all"
              icon={
                <img style={{width: "22px"}} src={require("./img/personal_icon_all.png")} alt="icon"/>
              }
            />
            <TabBar.Item
              title="待付款"
              key="waitPay"
              icon={
                <img style={{width: "22px"}} src={require("./img/personal_icon_wait.png")} alt="icon"/>
              }
              badge={ordercount && ordercount.count_dfk}
            />
            <TabBar.Item
              title="待发货"
              key="waitTrans"
              icon={
                <img style={{width: "22px"}} src={require("./img/personal_icon_transport.png")} alt="icon"/>
              }
              badge={ordercount && ordercount.count_dfh}
            />
            <TabBar.Item
              title="待收货"
              key="waitrec"
              icon={
                <img style={{width: "22px"}} src={require("./img/personal_icon_receipt.png")} alt="icon"/>
              }
              badge={ordercount && ordercount.count_dsh}
            />
            <TabBar.Item
              title="待评价"
              key="waitCommit"
              icon={
                <img style={{width: "22px"}} src={require("./img/personal_icon_evaluation.png")} alt="icon"/>
              }
              badge={ordercount && ordercount.count_dpj}
            />
          </TabBar>
        </section>
        {/* 我的钱包 */}
        <section className={style['my-wallet']}>
          <p>我的钱包</p>
          <Grid data={walletIcons} hasLine={false} />
        </section>
        <section className={style['my-wallet']}>
          <p>管理中心</p>
          <Grid data={managerCenter} onClick={_el => this.handleManager(_el)} hasLine={false} />
        </section>
        {/* 子组件 动态 */} 
        {
          this.state.isShowCom ?
          <section className={style['full-screen']}>
            { this.showCom() }
          </section>
          : ""
        }
      </div>
    )
  }
}

const mapState = (state) => ({
  isLogin: state.getIn(['login', 'islogin']),
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token']),
  mine: state.getIn(['mine','mineInfo']).toJS()
})

const mapDispatch = dispatch => ({
  initMine (query) {
    const action = mineActionCreators.loadMineInfo(query);
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(Mine);
