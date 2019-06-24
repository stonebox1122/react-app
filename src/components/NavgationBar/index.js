/**
 * 顶部导航栏组件
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types'
import style from './index.module.scss'
class NavgationBar extends Component {
  back = () => {
    console.log('back')
  }
  render() {
    const { left, right, children: title, handleLeft, handleRight } = this.props;
    return (
      <div className={style['nav-wrap']}>
        <div className={style['left-item']} onClick = { handleLeft ? handleLeft : this.back }>
          { left }
        </div>
        <div className={style['center-item']}>
          { title }
        </div>
        <div className={style['right-item']} onClick = { handleRight }>
          { right }
        </div>
      </div>
    );
  }
}

// 对父组件传过来的参数进行校验
NavgationBar.propTypes = {
  // 这里限制类型为react元素或者字符串
  left: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  right: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  children: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  handleLeft: PropTypes.func,
  handleRight: PropTypes.func
}

// 对父组件的传值设置默认值
NavgationBar.defaultProps = {
  left: 'back',
  right: '下一步',
  children: '吉善'
}

export default NavgationBar;
