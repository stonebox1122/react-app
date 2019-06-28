import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import style from './index.module.scss';
class Tab extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      currentIndex: 0
    }
  }
  componentDidMount() {
    // 根据挂载时根据父组件确定当前选中
    let index = this.props.currentIndex
    index = parseInt(index)
    this.setState({
      currentIndex: index
    })    
  }
  
  changetab = (index) => {
    // 修改高亮tab
    this.setState({
      currentIndex: index
    })
    this.props.changeCurr(index)
  }

  render() { 
    let { list } = this.props
    return (
      <div className={style.tab}>
        {
          list.map(e=> {
            return (
              <div className={style['tab-item']} key={e.key} onClick={() => this.changetab(e.key)}>
                <span className={`${style.title} ${e.key === this.state.currentIndex ? style.active : ''}`}>
                  {e.title}
                </span>
              </div>
            )
          })
        }
      </div>
    );
  }
}
/**
 * @param{list}: // tab标题
 * @param{currentIndex}: 父组件设置当前current
 * @func {changeCurr}: 修改curr时调用父组件的方法
 */
Tab.propTypes = {
  list: PropTypes.array,
  currentIndex: PropTypes.number,
  changeCurr:PropTypes.func
}
export default Tab;