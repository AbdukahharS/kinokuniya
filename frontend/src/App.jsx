// Packages
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
// Pages
import NotFound from './pages/NotFound'
import Home from './pages/Home'
// Components
import Navbar from './components/Navbar'
import Footer from './components/Footer'

function App() {
  return (
    <div className='App'>
      <Router>
        <Navbar />
        <Routes>
          <Route path='*' element={<NotFound />} />
          <Route path='/' element={<Home />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  )
}

export default App
