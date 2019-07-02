import React, { PureComponent } from 'react';
import NavgationBar from '@/NavgationBar'
import Scroll from '@/Scroll'
import style from './index.module.scss'
class GoodsList extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {  }
  }
  componentDidMount() {

  }
  render() {
    return (
      <section className={style['goods-list']}>
        <NavgationBar
          left = ' '
          right= ''
        >全部商品</NavgationBar>
        <div id="wrap" className={style['list-wrap']}>
          <Scroll>
            <ul>
              <li>...</li>
            </ul>
          </Scroll>
        </div>
      </section>
    );
  }
}
 
export default GoodsList;