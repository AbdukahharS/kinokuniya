import { useState, useEffect } from 'react'

const Aside = () => {
  const [categories, setCategories] = useState([])
  const [authors, setAuthors] = useState([])

  useEffect(() => {
    const fetchCategories = async () => {
      const res = await fetch('/api/categories')
      const json = await res.json()

      if (res.ok) {
        setCategories(json)
      }
    }

    const fetchAuthors = async () => {
      const res = await fetch('/api/authors')
      const json = await res.json()

      if (res.ok) {
        setAuthors(json)
      }
    }

    fetchCategories()
    fetchAuthors()
  }, [setCategories, setAuthors])

  return (
    <aside>
      <div className='filter'>
        <p className='filterName'>Categories</p>
        <div className='filterItems'>
          {categories.length &&
            categories.map((category, i) => (
              <div className='filterItem' key={i}>
                <input type='checkbox' id={`category${i}`} />
                <label htmlFor={`category${i}`}>{category.title}</label>
              </div>
            ))}
        </div>
      </div>
      <div className='filter'>
        <p className='filterName'>Authors</p>
        <div className='filterItems'>
          {authors.length &&
            authors.map((author, i) => (
              <div className='filterItem' key={i}>
                <input type='checkbox' id={`author${i}`} />
                <label htmlFor={`author${i}`}>{author.name}</label>
              </div>
            ))}
        </div>
      </div>
      <div className='filter'>
        <p className='filterName'>Language</p>
        <div className='filterItems'></div>
      </div>
    </aside>
  )
}

export default Aside
