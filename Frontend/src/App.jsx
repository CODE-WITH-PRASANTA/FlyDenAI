import { Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./Components/Navbar/Navbar";
import Footer from "./Components/Footer/Footer";
import Topbar from "./Components/Topbar/Topbar";
import GlobalMap from "./Components/GlobalMap/GlobalMap";
import Home from "./Pages/Home/Home";
import AboutUs from "./Pages/AboutUs/AboutUs";
import Services from "./Pages/Services/Services";
import OurTeam from "./Pages/OurTeam/OurTeam";
import TeamDetails from "./Pages/TeamDetails/TeamDetails";
import TeamMembers from "./Pages/TeamMembers/TeamMembers";
import ContactPage from "./Pages/ContactPage/ContactPage";
import BlogSec from "./Pages/BlogSec/BlogSec";
import BlogDetails from "./Pages/BlogDetails/BlogDetails";
import AllVisaOverView from "./Pages/AllVisaOverView/AllVisaOverView";
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
import Dummyticketsection from "./Pages/Dummyticketsection/Dummyticketsection";
import DummyTicketBooking from "./Pages/DummyTicketBooking/DummyTicketBooking";
import DummyTicketSuccess from "./Components/DummyTicketSuccess/DummyTicketSuccess";
import PaymentFailed from "./Components/PaymentFailed/PaymentFailed";
import ComingSoon from "./Components/ComingSoon/ComingSoon";
import PageWrapper from "./Components/PageWrapper";
import "./App.css";

function App() {
  return (
    <>
      <PageWrapper>
        <Topbar />
        <Navbar />
        <Routes>
          {/* 🔁 Redirect root path to /AllCountry */}
          <Route path="/" element={<Navigate to="/AllCountry" replace />} />

          <Route path="/globalmap" element={<GlobalMap />} />
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/services" element={<Services />} />
          <Route path="/team" element={<OurTeam />} />
          <Route path="/team/details" element={<TeamDetails />} />
          <Route path="/team/member" element={<TeamMembers />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/blog" element={<BlogSec />} />
          <Route path="/blog/details/:id" element={<BlogDetails />} />

          <Route path="/visa/overview" element={<AllVisaOverView />} />
          <Route path="/dummyticket" element={<Dummyticketsection />} />
          <Route path="/dummyticket/payment-failed" element={<PaymentFailed />} />
          <Route path="/dummyticket/booking/:id" element={<DummyTicketBooking />} />
          <Route path="/dummyticket/success/:id" element={<DummyTicketSuccess />} />

          <Route path="/AllCountry" element={<AllCountry />} /> 
          <Route path="/GetaQuotes" element={<GetAQuotes />} />
          <Route path="/FreeVisaQuotes" element={<FreeVisaQuotes />} />

          <Route path="/TouristVisa" element={<TouristVisa />} />
          <Route path="/ComingSoon" element={<ComingSoon />} />
          <Route path="/Visa/Details/:id" element={<VisaDetails />} />

          {/* Apply To the Visa Page */}
          <Route path="/apply/now/:id" element={<ApplyNow />} />
          <Route path="/Intern/Apply" element={<InternAbroadApply />} />

          {/* Privacy Policy & Term and Condition */}
          <Route path="/PrivacyPolicy" element={<PrivacyPolicy />} />
          <Route path="/TermAndCondition" element={<TermAndCondition />} />

          {/* Study Abroad & Interns Abroad */}
          <Route path="/StudyAbroad" element={<StudyAbroad />} />
          <Route path="/InternsAbroad" element={<InternsAbroad />} />

          {/* Apply To the Intern Abroad Service */}
          <Route path="/InternAbroad/Apply" element={<MultiStepForm />} />

          <Route path="/ExecutiveTeam" element={<ExecutiveTeam />} />
          <Route path="/visa-info/:id" element={<VisaInfo />} /> 
        </Routes>
        <Footer />
      </PageWrapper>
    </>
  );
}

export default App;