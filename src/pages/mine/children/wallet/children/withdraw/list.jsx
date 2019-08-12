import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
import style from './list.module.scss'
class WithdrawList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  render() { 
    let {back} = this.props
    return (
      <div className={ style.list }>
        <NavgationBar handleLeft={back} right="" >分享利润提现记录</NavgationBar>
      </div>
    );
  }
}

const mapState = state => ({
})
 
const mapDispatch = dispatch => ({

})

WithdrawList.propTypes = {
  back: PropTypes.func
}

export default connect(mapState,mapDispatch)(WithdrawList);