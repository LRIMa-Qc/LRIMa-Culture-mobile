import { BrowserRouter as Router, Routes, Route } from 'react-router'

import Overview from './pages/Overview'
import RootLayout from './components/layouts/RootLayout'
import Home from './pages/Home'
import Capteurs from './pages/Capteurs'

function App() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<RootLayout />}>
          <Route index element={<Home />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/capteurs" element={<Capteurs />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default App
