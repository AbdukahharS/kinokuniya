import React from 'react'

const Aside = () => {
  return (
    <aside>
      <div className='filter'>
        <p className='filterName'>Categories</p>
        <div className='filterItems'>
          <div className='filterItem'>
            <input type='checkbox' />
            <label>Asaxiy Books kitoblari (39)</label>
          </div>
          <div className='filterItem'>
            <input type='checkbox' />
            <label>Badiiy adabiyotlar (2025)</label>
          </div>
          <div className='filterItem'>
            <input type='checkbox' />
            <label>Psixologiya va shaxsiy rivojlanish (480)</label>
          </div>
        </div>
      </div>
      <div className='filter'>
        <p className='filterName'>Authors</p>
        <div className='filterItems'></div>
      </div>
      <div className='filter'>
        <p className='filterName'>Language</p>
        <div className='filterItems'></div>
      </div>
    </aside>
  )
}

export default Aside
