import { useContext } from 'react'
import { ProductContext } from '../context/ProductContext'

export const useProductContext = () => {
  const context = useContext(ProductContext)

  if (!context) {
    throw Error(
      'useWorkoutContext must be used inside an ProductContextProvider'
    )
  }

  return context
}
