import { Routes, Route } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Services from "./Pages/Services/Services";
import OurTeam from "./Pages/OurTeam/OurTeam";
import TeamDetails from "./Pages/TeamDetails/TeamDetails";
import "./App.css";
import PageWrapper from "./Components/PageWrapper";
import ComingSoon from "./Components/ComingSoon/ComingSoon";
import TeamMembers from "./Pages/TeamMembers/TeamMembers";
import ContactPage from "./Pages/ContactPage/ContactPage";
import BlogSec from "./Pages/BlogSec/BlogSec";
import AllVisaOverView from "./Pages/AllVisaOverView/AllVisaOverView";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import TouristVisa from "./Pages/TouristVisa/TouristVisa";
import AllCountry from "./Pages/AllCountry/AllCountry";
import GetAQuotes from "./Pages/GetAQuotes/GetAQuotes";

function App() {
  return (
    <>
      <PageWrapper>
      <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<OurTeam />} />
          <Route path="/team/details" element={<TeamDetails />} />
          <Route path="/team/member" element={<TeamMembers />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogSec />} />
          <Route path="/blog/details" element={<BlogDetails />} />
          <Route path="/visa/overview" element={<AllVisaOverView />} />
          <Route path="/AllCountry" element={<AllCountry />} />
          <Route path="/GetaQuotes" element={<GetAQuotes />} />


          {/* Visa Sec */}
          <Route path="/TouristVisa" element={<TouristVisa />} />
          <Route path="/ComingSoon" element={<ComingSoon />} />
        </Routes>
      <Footer />
      </PageWrapper>
    </>
  );
}

export default App;
