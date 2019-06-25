import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import style from './index.module.scss'
class Cell extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  render() { 
    const { type, label, placeHoder, solt } = this.props
    return (
      <div className={ style['cell-wrap'] }>
        <p className={ style.label } >{ label }</p>
        <input type = { type } placeholder={ placeHoder } className={ style.input } />
        <div className={ style.solt }>{ solt }</div>
      </div>
    );
  }
}

Cell.propTypes = {
  type: PropTypes.string,
  placeHoder: PropTypes.string,
  label: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  solt: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ])
}

Cell.defaultProps = {
  placeHoder: '请输入账号',
  label: '账号',
  type: 'text'
}

export default Cell;