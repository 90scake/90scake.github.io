import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Header from './components/Header';
import Footer from './components/Footer';
import BasicCakeOrder from './pages/BasicCakeOrder';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-pink-50">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/basic-order" element={<BasicCakeOrder />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;