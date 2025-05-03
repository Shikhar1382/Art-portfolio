import Home from './components/Home'
import Admin from './AdminLogin'

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
function App() {

  return (
    <Router>
    <Routes>
      
      <Route path="/" element={<Home />} />
      <Route path="/admin-1382" element={<Admin />} />

    </Routes>
  </Router>
  )
}

export default App
