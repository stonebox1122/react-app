import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import Scroll from '@/Scroll'
import NavgationBar from '@/NavgationBar'
import { List, InputItem, Toast, Picker, Switch, Button  } from 'antd-mobile';
import { createForm } from 'rc-form';
import style from './index.module.scss'
import {testPhoneNum} from '$src/common/js/utils'
import * as addressActionCreators from '../../store/actionCreators'
const Item = List.Item;
class AddAddress extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {}
  }

  componentDidMount () {
    this.props.getCitys()
  }

  //  姓名的验证
  validateName = (rule, value, callback) => {
    if (value && value.length >= 2) {
      callback();
    } else {
      callback(new Error('至少输入一位汉字'));
    }
  }
  // 手机号验证
  validatePhone = (rule, value, cb) => {
    value = value.replace(/\s*/g,"");
    if (testPhoneNum(value)) {
      cb()
    } else {
      cb(new Error('请输入正确的手机号'));
    }
  }
  validateAddress = (rule, value, cb) => {
    if (value.length < 5) {
      cb(new Error('请输入至少五个字'))
    }else {
      cb()
    }
  }
  submit = () => {
    this.props.form.validateFields({ force: true }, (error) => {
      if (!error) {
        let form = this.props.form.getFieldsValue()
        let {addressinfo, isdefault, mobile, truename} = form
        if (isdefault) {
          isdefault = 1
        } else {
          isdefault = 0
        }
        mobile = mobile.replace(/\s*/g,"");
        let provinceid = form.cityList[0]
        let cityid = form.cityList[1]
        let areaid = form.cityList[2]
        let query = {
          addressinfo, isdefault, mobile, truename,provinceid,cityid,areaid,
          token: this.props.token,
          userid: this.props.userid
        }
        this.props.addAddr(query, this.cb)
      } else {
        Toast.fail('填写有误，请核查')
      }
    })
  }
  cb = () => {
    Toast.success('添加成功')
    this.props.reloadList()
    this.props.back()
  }
  render() {
    let { back, type, cityList } = this.props
    const { getFieldProps, getFieldError } = this.props.form;
    return (
      <div className={style['add-address']}>
        <NavgationBar
          handleLeft = {back}
          right = {type === 'add' ? "" : <span onClick={this.del}>删除</span>}
        >
          {
            type === 'add' ? '新增地址' : '修改收货地址'
          }
        </NavgationBar>
        <div>
          <Scroll>
            <div>
              <form>
              <List>
                <InputItem 
                  {...getFieldProps('truename', {
                    rules: [
                      { required: true, message: '请输入收货人姓名' },
                      { validator: this.validateName },
                    ],
                  })}
                  clear
                  error={!!getFieldError('truename')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('truename').join('、'));
                  }}
                  placeholder="请填写收货人的姓名">联系人：</InputItem>
                <InputItem
                  {...getFieldProps('mobile', {
                    rules: [
                      { required: true, message: '请输入11位手机号' },
                      { validator: this.validatePhone },
                    ],
                  })}
                  error={!!getFieldError('mobile')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('mobile').join('、'));
                  }}
                  type="phone"
                  clear
                  placeholder="请填写收货手机号码"
                >手机号：</InputItem>
                <Picker extra="请选择地区"
                  data={cityList}
                  title="城市列表"
                  {...getFieldProps('cityList', {
                    initialValue: ['1', '36', '37'],
                  })}
                  // onOk={e => console.log('ok', e)}
                  // onDismiss={e => console.log('dismiss', e)}
                >
                  <Item arrow="horizontal" onClick={() => {}}>所在地区：</Item>
                </Picker>
                <InputItem
                  {...getFieldProps('addressinfo',{
                    rules:[
                      { required: true, message: '请输入详细地址'},
                      { validator: this.validateAddress},
                    ]
                  })}
                  clear
                  error={!!getFieldError('addressinfo')}
                  onErrorClick={() => {
                    Toast.fail(getFieldError('addressinfo').join('、'));
                  }}
                  type="addressinfo"
                  placeholder="例如6号楼5层403室"
                  ref={el => this.autoFocusInst = el}
                >详细地址:</InputItem>
                <Item
                  extra={<Switch color="#FFC105" {...getFieldProps('isdefault', { initialValue: true, valuePropName: 'checked' })} />}
                >设为默认地址</Item>

                <Item>
                  <Button onClick={this.submit} style={{backgroundColor: "#FFC105", color:"#fff"}}> {type === 'add' ? '保存地址' : '确定'}</Button>
                </Item>
              </List>
              </form>
            </div>
          </Scroll>
        </div>
      </div>
    );
  }
}

AddAddress.propTypes = {
  back: PropTypes.func,
  type: PropTypes.string,
  option: PropTypes.object,
  reloadList: PropTypes.func
}
AddAddress.defaultProps = {
  type: 'add'
}

const mapState = state => ({
  cityList: state.getIn(['address', 'cityList']).toJS(),
  userid: state.getIn(['login', 'uid']),
  token: state.getIn(['login', 'token'])
})

const mapDispatch = dispatch => ({
  getCitys() {
    const action = addressActionCreators.getCityList()
    dispatch(action)
  },
  addAddr (query, cb) {
    const action = addressActionCreators.addNewAddress(query, cb)
    dispatch(action)
  }
})

const AddAddressFrom= createForm()(AddAddress)
export default connect(mapState, mapDispatch)(AddAddressFrom);