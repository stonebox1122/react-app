import React, { PureComponent } from 'react';
import PropTypes from 'prop-types'
import style from './index.module.scss'
class Cell extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  change = (e) => {
    let { name, changeInput } = this.props
    let v = e.target.value
    changeInput({name, v})
  }
  render() { 
    const { type, label, placeHoder, slot, value, disabled } = this.props
    return (
      <div className={ style['cell-wrap'] }>
        <p className={ style.label } >{ label }</p>
        <input disabled={disabled} value={value} onChange= {(e) => this.change(e)} type = { type } placeholder={ placeHoder } className={ style.input } />
        <div className={ style.slot }>{ slot }</div>
      </div>
    );
  }
}

Cell.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string,
  value: PropTypes.string,
  placeHoder: PropTypes.string,
  disabled: PropTypes.bool,
  label: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  slot: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.string
  ]),
  changeInput: PropTypes.func
}

Cell.defaultProps = {
  placeHoder: '请输入账号',
  label: '账号',
  type: 'text',
  disabled: false
}

export default Cell;