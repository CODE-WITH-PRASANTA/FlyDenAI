import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Services from "./Pages/Services/Services";
import OurTeam from "./Pages/OurTeam/OurTeam";
import TeamMembers from "./Pages/TeamMembers/TeamMembers";
import ContactPage from "./Pages/ContactPage/ContactPage";
import BlogSec from "./Pages/BlogSec/BlogSec";
import AllVisaOverView from "./Pages/AllVisaOverView/AllVisaOverView";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import TouristVisa from "./Pages/TouristVisa/TouristVisa";
import AllCountry from "./Pages/AllCountry/AllCountry";
import GetAQuotes from "./Pages/GetAQuotes/GetAQuotes";
import FreeVisaQuotes from "./Pages/FreeVisaQuotes/FreeVisaQuotes";
import StudyAbroad from "./Pages/StudyAbroad/StudyAbroad";
import VisaDetails from "./Pages/VisaDetails/VisaDetails";
import ApplyNow from "./Pages/ApplyNow/ApplyNow";
import PrivacyPolicy from "./Pages/PrivacyPolicy/PrivacyPolicy";
import TermAndCondition from "./Pages/TermAndCondition/TermAndCondition";
import InternsAbroad from "./Pages/InternsAbroad/InternsAbroad";
import InternAbroadApply from "./Pages/InternAbroadApply/InternAbroadApply";
import MultiStepForm from "./Components/MultiStepForm/MultiStepForm";
import ExecutiveTeam from "./Components/ExecutiveTeam/ExecutiveTeam";
import VisaInfo from "./Pages/VisaInfo/VisaInfo";
import PageWrapper from "./Components/PageWrapper";
import ComingSoon from "./Components/ComingSoon/ComingSoon";

function App() {
  const navigate = useNavigate();

  // Redirect to /AllCountry on first load
  useEffect(() => {
    if (window.location.pathname === "/") {
      navigate("/AllCountry");
    }
  }, [navigate]);

  return (
    <>

      <PageWrapper>
      <Navbar />
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<OurTeam />} />
          <Route path="/team/member" element={<TeamMembers />} />
          <Route path="/contact" element={<ContactPage />} />

          <Route path="/blog" element={<BlogSec />} />
          <Route path="/blog/details/:id" element={<BlogDetails />} />

          <Route path="/visa/overview" element={<AllVisaOverView />} />

          <Route path="/AllCountry" element={<AllCountry />} />

          <Route path="/GetaQuotes" element={<GetAQuotes />} />
          <Route path="/FreeVisaQuotes" element={<FreeVisaQuotes />} />

          <Route path="/TouristVisa" element={<TouristVisa />} />
          <Route path="/ComingSoon" element={<ComingSoon />} />

          <Route path="/Visa/Details/:id" element={<VisaDetails />} />

          <Route path="/Apply/Now/:id" element={<ApplyNow />} />

          <Route path="/Intern/Apply" element={<InternAbroadApply />} />
          <Route path="/InternAbroad/Apply" element={<MultiStepForm />} />

          <Route path="/StudyAbroad" element={<StudyAbroad />} />
          <Route path="/InternsAbroad" element={<InternsAbroad />} />

          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermAndCondition" element={<TermAndCondition />} />

          <Route path="/ExecutiveTeam" element={<ExecutiveTeam />} />

          <Route path="/visa-info/:id" element={<VisaInfo />} />
        </Routes>
      <Footer />
      </PageWrapper>

    </>
  );
}

export default App;
