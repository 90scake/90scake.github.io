import { Routes, Route, useNavigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import PoundCakes from "./pages/PoundCakes";
import { useEffect } from "react";

function App() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const redirectPath = params.get("redirect");

    if (redirectPath === "/pound-cakes") {
      navigate(redirectPath);
      console.log("redirectPath", redirectPath);
    }
  }, [navigate]);
  return (
    <div className="flex flex-col min-h-screen bg-pink-50">
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
