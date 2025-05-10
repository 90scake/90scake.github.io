import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { CakeProvider } from './context/CakeContext';
import { OrderProvider } from './context/OrderContext';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import CakesPage from './pages/CakesPage';
import BasicCakePage from './pages/BasicCakePage';
import CakeDetails from './components/cake/CakeDetails';

function App() {
  return (
    <Router>
      <CakeProvider>
        <OrderProvider>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1 pt-16">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/cakes" element={<CakesPage />} />
                <Route path="/basic-cake" element={<BasicCakePage />} />
              </Routes>
            </main>
            <CakeDetails />
            <Footer />
          </div>
        </OrderProvider>
      </CakeProvider>
    </Router>
  );
}

export default App;