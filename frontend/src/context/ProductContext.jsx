import { createContext, useReducer } from 'react'

export const ProductContext = createContext()

export const ProductReducer = (state, action) => {
  switch (action.type) {
    case 'SET_PRODUCTS':
      return {
        products: action.payload,
      }
    case 'CREATE_WORKOUT':
      return {
        products: [action.payload, ...state.products],
      }
    case 'DELETE_WORKOUT':
      return {
        products: state.products.filter((p) => p._id !== action.payload.id),
      }
    default:
      return state
  }
}

export const ProductContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(ProductReducer, {
    products: null,
  })

  return (
    <ProductContext.Provider value={{ ...state, dispatch }}>
      {children}
    </ProductContext.Provider>
  )
}
