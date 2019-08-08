// 申请会员
import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import { List, InputItem, Button, Picker, Toast } from 'antd-mobile';
import { createForm } from 'rc-form';
import NavgationBar from '@/NavgationBar'
import * as addressActionCreators from '~/common/address/store/actionCreators'
import * as commonActionCreators from '~/common/store/actionCreators'
import { initApplicetionVip, subApplicetionVip } from '$src/api'
import './index.scss'
const Item = List.Item;

class ApplicationVip extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      initData: {},
      sBank: ''
    }
  }

  componentDidMount() {
    this.init()
    this.props.getCitys()
  }

  init = () => {
    let {userid, token, toggleModal} = this.props
    let query = {
      userid, token
    }
    initApplicetionVip(query).then(res=> {
      if (res.code === '1') {
        if (res.data.have_sign > 0) {
          this.setState({
            initData: res.data.sign_data
          })
        } else {

        }
      } else {
        toggleModal(res.msg)
      }
    })
  }
  
  onSubmit = () => {
    let {userid, token, back, showModal} = this.props
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        let data = this.props.form.getFieldsValue();
        let bankid = data.bankid[0];
        let provinceid = data.cityList[0];
        let cityid = data.cityList[0];
        let areaid = data.cityList[0];
        Object.assign(data, {
          bankid, provinceid, cityid, areaid, userid, token
        })
        // 提交表单
        subApplicetionVip(data).then(res => {
          if (res.code === '1') {
            Toast.success('申请成功')
            setTimeout(() => {
              back()
            }, 1000);
          } else {
            showModal(res.msg)
          }
        })
      } else {
        Toast.fail('输入有误，请检查输入无误后再提交');
      }
    });
  }

  validateIDcard = (rule, value, callback) => {
    if (value.length === 15 || value.length === 18) {
      callback();
    } else {
      // 验证失败 抛出错误，再点击错误按钮时展示
      callback(new Error('请输入15或18位的身份证号'));
    }
  }
  validateCenterno = (rule, v, cb) => {
    if (v.length >=4  && v.length <= 6) {
      cb();
    } else {
      cb(new Error('请输入4至6位服务中心编号'));
    }
  }
  validateAddress = (rule, v, cb) => {
    if (v.length >=2 ) {
      cb();
    } else {
      cb(new Error('请至少输入2个字符'));
    }
  }
  validateBankcardnum = (rule, v, cb) => {
    if (v.length >=16 && v.length<=18 ) {
      cb();
    } else {
      cb(new Error('请输入正确的卡号'));
    }
  }
  
  render() { 
    const { getFieldProps, getFieldError } = this.props.form;
    let { initData: {userno, usermobile, openlevlename, banks} } = this.state
    let {back, cityList} = this.props
    if (banks) {
      banks = banks.map(e => {
        let {bankname, bankid} = e
        return {
          label: bankname,
          value: bankid
        }
      })
    }

    return (
      <div>
        <NavgationBar
          handleLeft={back}
          right=""
        >申请会员</NavgationBar>
        <form>
          <List>
            <InputItem disabled {...getFieldProps('sid',{
              initialValue: userno,
            })}>ID账号</InputItem>
            <InputItem disabled {...getFieldProps('vipLev', {
              initialValue: openlevlename,
            })}>会员级别</InputItem>
            <InputItem disabled {...getFieldProps('mobile', {
              initialValue: usermobile,
            })}>手机号</InputItem>
            <InputItem
              {...getFieldProps('idcard', {
                rules: [
                  { required: true, message: '请输入身份证号' },
                  { validator: this.validateIDcard },
              ]})}
              clear
              error={getFieldError('idcard')}
              onErrorClick={() => {
                // 接收到验证失败的提示，点击错误时展示
                Toast.fail(getFieldError('idcard'))
              }}
              placeholder="持卡人身份证号">身份证号</InputItem>
            <InputItem {...getFieldProps('centerno',{
              rules: [
                {required: true, message: '请输入服务中心编号'},
                {validator: this.validateCenterno}
              ]
            })}
            clear
            error = {getFieldError('centerno')}
            onErrorClick = {() => {Toast.fail(getFieldError('centerno'))}}
            placeholder="服务中心编号">服务中心</InputItem>
            <Picker 
              extra="请选择地区"
              data={cityList}
              title="城市列表"
              {...getFieldProps('cityList', {
                rules: [
                  {required: true, message: '请选所在地区'}
              ]})}
              // onOk={e => console.log('ok', e)}
              // onDismiss={e => console.log('dismiss', e)}
            >
              <Item arrow="horizontal" onClick={() => {}}>所在地区</Item>
            </Picker>
            <InputItem 
              {...getFieldProps('addressinfo', {
                rules: [
                  {required: true, message: '请输入服务中心编号'},
                  {validator: this.validateAddress}
              ]})}
              clear
              error = {getFieldError('addressinfo')}
              onErrorClick = {() => {Toast.fail(getFieldError('addressinfo'))}}
              placeholder="请填写您的详细地址">详细地址</InputItem>
            <Picker
              data={ banks || []}
              title="选择银行"
              cols={1}
              extra="请选择"
              value={this.state.sBank}
              {...getFieldProps('bankid', {
                rules: [
                  {required: true, message: '请选择银行'}
              ]})}>
              <List.Item arrow="horizontal">银行</List.Item>
            </Picker>
            <InputItem 
              {...getFieldProps('bankaccount', {
                rules: [
                  {required: true, message: '请填写银行卡号'},
                  {validator: this.validateBankcardnum}
                ]
              })}
              clear
              error = {getFieldError('bankaccount')}
              onErrorClick = {() => {Toast.fail(getFieldError('bankaccount'))}}
              placeholder="请填写银行卡号">银行卡号</InputItem>
            <InputItem 
              {...getFieldProps('bankaccountname', {
                rules: [
                  {required: true, message: '请填写姓名'},
                  {validator: this.validateAddress, message: '请填写银行卡号对应的姓名'}
                ]
              })}
              clear
              error = {getFieldError('bankaccountname')}
              onErrorClick = {() => {Toast.fail(getFieldError('bankaccountname'))}}
              placeholder="请填写银行卡用户名">银行卡用户名</InputItem>

            <Item>
              <Button type="primary" className="sub" onClick={this.onSubmit}>提交申请</Button>
            </Item>
          </List>
        </form>
      </div>
    );
  }
}

ApplicationVip.propTypes = {
  back: PropTypes.func
}
 
const mapState = state => ({
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token']),
  cityList: state.getIn(['address', 'cityList']).toJS()
})

const mapDispatch = dispatch => ({
  showModal (msg, title) {
    const action = commonActionCreators.toggleModal(msg, title)
    dispatch(action)
  },
  getCitys() {
    const action = addressActionCreators.getCityList()
    dispatch(action)
  }
})

export default connect(mapState, mapDispatch)(createForm()(ApplicationVip));