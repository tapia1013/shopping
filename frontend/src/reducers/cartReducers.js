import {
  CART_ADD_ITEM,
  CART_REMOVE_ITEM
} from '../constants/cartConstants'


export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case CART_ADD_ITEM:
      // item is the payload
      const item = action.payload

      // console.log(state.cartItems)
      // Check to see if item already exists
      const existItem = state.cartItems.find(x => x.product === item.product)


      // if itemExists, spread state, map through state.cartItems and do logic
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map(x => x.product === existItem.product ? item : x)
        }
      } else {
        // if item doesnt exists, spread state.cartItems in array and add on item 
        return {
          ...state,
          cartItems: [...state.cartItems, item]
        }
      }

    case CART_REMOVE_ITEM:
      return {
        ...state,
        cartItems: state.cartItems.filter((x) => x.product !== action.payload)
      }


    default:
      return state
  }
}