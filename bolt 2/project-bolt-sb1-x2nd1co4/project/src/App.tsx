import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { OrderProvider } from './context/OrderContext';
import { CakeProvider } from './context/CakeContext';
import Home from './pages/Home';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';

function App() {
  return (
    <Router>
      <CakeProvider>
        <OrderProvider>
          <div className="min-h-screen flex flex-col bg-gradient-to-b from-pink-100 to-purple-100">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </OrderProvider>
      </CakeProvider>
    </Router>
  );
}

export default App;