import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Coins from "./components/Coins";
import CoinsDetails from "./components/CoinsDetails";
import Header from "./components/Header";
import Home from "./components/Home";
import Exchnages from "./components/Exchnages";
import Footer from "./components/Footer";
function App() {
  return (
    <Router>

      <Header />
      <Routes>

        <Route path="/" element={<Home />} />
        <Route path="/coins" element={<Coins />} />
        <Route path="/coin/:id" element={<CoinsDetails />} />
        <Route path="/exchnages" element={<Exchnages />} />



      </Routes>

      <Footer />



    </Router>
  )
}

export default App;
