import React, { PureComponent } from 'react';
import style from './index.module.scss'
import PropTypes from 'prop-types'
class Title extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() {
    const { title } = this.props 
    return (
      <div className={style.wrap}>
        <span>{ title }</span>
        <div>
          <span className = {style.more}>
            更多 <img className = {style['icon-more']} alt="more" src={require('./img/home_btn_more.png')}/>
          </span>
        </div>
      </div>
    );
  }
}

Title.propTypes = {
  title: PropTypes.string.isRequired
}
 
export default Title;