import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import Craftsmanship from './pages/Craftsmanship';
import Products from './pages/Products';
import Services from './pages/Services';
import Projects from './pages/Projects';
import Contact from './pages/Contact';
import FloatingSocials from './components/FloatingSocials';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<About />} />
            <Route path="/craftsmanship" element={<Craftsmanship />} />
            <Route path="/products" element={<Products />} />
            <Route path="/services" element={<Services />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
        <FloatingSocials />
      </div>
    </Router>
  );
}

export default App;
