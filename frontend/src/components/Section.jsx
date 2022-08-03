// Packages
import { useEffect } from 'react'
import { useProductContext } from '../hooks/useProductContext'
import Controllers from './Controllers'
import Pagination from './Pagination'

const Section = () => {
  const { products, dispatch } = useProductContext()

  useEffect(() => {
    const fetchProducts = async () => {
      const res = await fetch('/api/products')
      const json = await res.json()

      if (res.ok) {
        dispatch({ type: 'SET_PRODUCTS', payload: json })
      }
    }

    fetchProducts()
  }, [dispatch])

  console.log(products)

  return (
    <section>
      <Controllers />
      <div id='cards'>
        {products &&
          products.map((p) => (
            <div key={p._id}>
              <img src={p.img} alt={p.name} />
              <p>{p.name}</p>
            </div>
          ))}
      </div>
      <Pagination />
    </section>
  )
}

export default Section
