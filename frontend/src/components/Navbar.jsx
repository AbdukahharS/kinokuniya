import {
  MdSearch,
  MdCreditCard,
  MdLanguage,
  MdOutlineShoppingCart,
  MdFavoriteBorder,
  MdPersonOutline,
  MdArrowDropDown,
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
            <div>Search</div>
          </button>
        </div>
        <div className='actions'>
          <button>
            <MdCreditCard />
            <div>Payment</div>
          </button>
          <button>
            <MdLanguage />
            <div>
              English <MdArrowDropDown />
            </div>
          </button>
          <button>
            <MdOutlineShoppingCart />
            <div>Cart</div>
            <div className='index'>0</div>
          </button>
          <button>
            <MdFavoriteBorder />
            <div>Favorite</div>
            <div className='index'>9+</div>
          </button>
          <button>
            <MdPersonOutline />
            <div>Profile</div>
          </button>
        </div>
      </div>
    </div>
  )
}

export default Navbar
