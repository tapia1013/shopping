import axios from 'axios';
import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM
} from '../constants/cartConstants'


// getState allows us to get entire state tree... productList,productDetails, orderDetails etc from the store
export const addToCart = (id, qty) => async (dispatch, getState) => {
  const { data } = await axios.get(`/api/products/${id}`)

  dispatch({
    type: CART_ADD_ITEM,
    payload: {
      // stuff we want to display in our cart
      product: data._id,
      name: data.name,
      image: data.image,
      price: data.price,
      countInStock: data.countInStock,
      qty
    }
  })

  // save to localstorage
  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))

}




export const removeFromCart = (id) => (dispatch, getState) => {
  dispatch({
    type: CART_REMOVE_ITEM,
    payload: id
  })

  localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}