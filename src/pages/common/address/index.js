import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
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
    let { userid, token, getList } = this.props
    let query = {
      userid,
      token
    }
    getList(query)
  }
  showCom = (value) => {
    console.log('value :', value);
    let type = 'add'
    if (value.id) {
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
                <li></li>
              </ul>
            </Scroll>
          </div> : 
          <img src = { require('$static/img/empty_icon.png') }alt="noAddr"/>
        }
        {
          this.state.showCom ? 
          <AddAddress back={this.showCom} type={this.state.type} option={this.state.option}/> : ""
        }
      </div>
    );
  }
}

Address.propTypes = {
  back: PropTypes.func
}

const mapState = (state) => ({
  list: state.getIn(['address', 'list']),
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token'])
})

const mapDispatch = (dispatch) => ({
  getList (query) {
    const action = addressActionCreator.getList(query)
    dispatch(action)
  }
})
 
export default connect(mapState, mapDispatch)(Address);