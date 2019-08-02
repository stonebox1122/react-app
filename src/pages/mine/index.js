import React, { PureComponent } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import * as mineActionCreators from './store/actionCreators'
import style from './index.module.scss';

class Mine extends PureComponent {
  
  componentDidMount() {
    this.init()
  }
  init = () => {
    let {userid, token, initMine} = this.props
    let query = {
      userid,
      token
    }
    initMine(query)
  }
  
  render () {
    let {mine} = this.props
    let {userinfo} = mine
    return (
      <div>
        <section className={style.head}>
          {
            userinfo ? 
            <img src={userinfo.avatar} className={style.avatar} alt="avatar"/>
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
            <img className={style.setting} src={require("./img/personal_icon_setting.png")} alt="setting"/>
            <img className={style.sign} src={require("./img/personal_icon_qiandao.png")} alt="sign"/>
          </div>
        </section>
        <ul className={style.wallet}>
          <li>购物积分</li>
          <li>分享利润</li>
          <li>商城积分</li>
        </ul>
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
