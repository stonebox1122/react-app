import React, { PureComponent } from 'react';
import {connect} from 'react-redux'
import PropTypes from 'prop-types'
import NavgationBar from '@/NavgationBar'
import style from './index.module.scss'
class Transform extends PureComponent {
  constructor(props) {
    super(props);
    this.state = { 
    }
  }

  render() { 
    let {back} = this.props
    return (
      <div className={ style.wallet }>
        <NavgationBar handleLeft = {back} right="">转账</NavgationBar>
      </div>
    );
  }
}

const mapState = state => ({
})
 
const mapDispatch = dispatch => ({

})

Transform.propTypes = {
  back: PropTypes.func
}

export default connect(mapState,mapDispatch)(Transform);