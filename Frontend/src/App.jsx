import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Home from "./Pages/Home/Home";
import './App.css'
import Footer from "./Components/Footer/Footer";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Services from "./Pages/Services/Services";
import OurTeam from "./Pages/OurTeam/OurTeam";
import TeamDetails from "./Pages/TeamDetails/TeamDetails";


function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/services" element={<Services />} />
        <Route path="/team" element={<OurTeam />} />
        <Route path="/team/details" element={<TeamDetails />} />
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
