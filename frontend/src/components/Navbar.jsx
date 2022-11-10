import {
  MdSearch,
  MdCreditCard,
  MdLanguage,
  MdOutlineShoppingCart,
  MdFavoriteBorder,
  MdPersonOutline,
} from 'react-icons/md'
import Logo from '../images/logo.png'

const Navbar = () => {
  return (
    <div className='navbar'>
      <div className='container'>
        <img src={Logo} alt='logo' className='logo' />
        <div className='search'>
          <input type='text' placeholder='Search...' />
          <button>
            <MdSearch />
            <span>Search</span>
          </button>
        </div>
        <div className='actions'>
          <button>
            <MdCreditCard />
          </button>
          <button>
            <MdLanguage />
          </button>
          <button>
            <MdOutlineShoppingCart />
          </button>
          <button>
            <MdFavoriteBorder />
          </button>
          <button>
            <MdPersonOutline />
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
