import { fromJS } from 'immutable';

const defaultState = fromJS({
  list: [{
    img: 'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
    title: '商品标题商品标题商品标题商品标题商品标题商品标题',
    price: 123.1,
    del_price: 12121
  },{
    img: 'https://interactive-examples.mdn.mozilla.net/media/examples/plumeria.jpg',
    title: '商品标题商品标题商品标题商品标题商品标题商品标题',
    price: 123.1,
    del_price: 12121
  }]
})

export default (state = defaultState, action) => {
  return state
}