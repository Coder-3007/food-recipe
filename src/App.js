import { Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./Components/Navbar";
import Home from "./pages/home";
import Favourites from "./pages/favourites";
import Details from "./pages/details";

function App() {
  return (
    <div>
      <div
        className="min-h-screen p-6
       bg-white text-gray-600 text-lg"
      >
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favourites" element={<Favourites />} />
          <Route path="/recipe-item/:id" element={<Details />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
