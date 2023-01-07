// Packages
import { useEffect } from 'react'
import { useProductContext } from '../hooks/useProductContext'
import Controllers from './Controllers'
import Pagination from './Pagination'
import { MdFavoriteBorder, MdFavorite } from 'react-icons/md'

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

  return (
    <section>
      <Controllers />
      <div id='cards'>
        {products &&
          products.map((p) => (
            <div className='card' key={p._id}>
              <img src={p.img} alt={p.name} />
              <p className='name'>
                {p.author}: {p.name}
              </p>
              <p>${p.price}</p>
              <div className='buttons'>
                <button className='cart'>Add to cart</button>
                <button className='buy'>Buy now</button>
              </div>
              <button className='favorite'>
                <MdFavoriteBorder />
              </button>
            </div>
          ))}
      </div>
      <Pagination />
    </section>
  )
}

export default Section
