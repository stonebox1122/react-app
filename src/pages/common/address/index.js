import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import {Icon} from 'react-weui'
import {Button} from 'antd-mobile';
import NavgationBar from '@/NavgationBar'
import Scroll from '@/Scroll'
import AddAddress from './children/addAddress'
import style from './index.module.scss'
import * as addressActionCreator from './store/actionCreators'
class Address extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      showCom: false,
      type: 'add',
      option: {}
    }
  }

  componentDidMount() {
    this._init()
  }
  _init = () => {
    let { userid, token, getList } = this.props
    let query = {
      userid,
      token
    }
    getList(query)
  }
  showCom = (value) => {
    let type = 'add'
    if (value && value.id) {
      type = 'edit'
      this.setState({
        option:value
      })
    }
    let flag = this.state.showCom
    this.setState({
      showCom: !flag,
      type
    })
  }
  // 切换选中的地址
  selectAddr = (e) => {
    this.props.selectAddress(e)
    this.props.back()
  }
  render() { 
    let { list } = this.props
    return (
      <div className={style.address}>
        <NavgationBar
          handleLeft={this.props.back}
          handleRight= {this.showCom}
          right = "新增地址"
        >
          我的收货地址
        </NavgationBar>
        {
          list.length > 0 ?
          <div className={style['list-wrap']}>
            <Scroll>
              <ul className={style.list}>
                {
                  list.map(e=>{
                    return (
                      <li className={style['list-item']} key={e.addressid}>
                        <div className={style.top}>
                          <Icon className={style.icon} onClick={this.selectAddr.bind(this,e)} size="small" value={e.is_default === '1'?"success": 'circle'}/>
                          <div className={style.info}>
                            <p className={style.title}>{e.username}&nbsp;{e.phone}</p>
                            <p>{e.address}</p>
                          </div>
                        </div>
                        <div className={style.bottom}>
                          <Button size="small" className={style.btn} style={{marginRight:"24px"}} type="ghost" inline>删除</Button>
                          <Button size="small" className={style.btn} type="ghost" inline>编辑</Button>
                        </div>
                      </li>
                    )
                  })
                }
              </ul>
            </Scroll>
          </div> : 
          <img src = { require('$static/img/empty_icon.png') }alt="noAddr"/>
        }
        {
          this.state.showCom ? 
          <AddAddress back={this.showCom} type={this.state.type} reloadList={this._init} option={this.state.option}/> : ""
        }
      </div>
    );
  }
}

Address.propTypes = {
  back: PropTypes.func
}

const mapState = (state) => ({
  list: state.getIn(['address', 'list']).toJS(),
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token'])
})

const mapDispatch = (dispatch) => ({
  getList (query) {
    const action = addressActionCreator.getList(query)
    dispatch(action)
  },
  selectAddress(query) {
    const action = addressActionCreator.changeCurrentAddr(query);
    dispatch(action)
  }
})
 
export default connect(mapState, mapDispatch)(Address);