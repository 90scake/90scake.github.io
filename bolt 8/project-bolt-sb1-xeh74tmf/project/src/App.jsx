import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import PoundCakes from './pages/PoundCakes';

function App() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      <main className="flex-grow">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/pound-cakes" element={<PoundCakes />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

export default App;