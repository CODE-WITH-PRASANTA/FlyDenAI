import { BrowserRouter as Router, Routes, Route } from "react-router";
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";
import Blank from "./pages/Blank";
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";
import PostCountry from "./DashboardPages/PostCountry/PostCountry";
import VisaType from "./DashboardPages/VisaType/VisaType";
import PostTeamMember from "./DashboardPages/PostTeamMember/PostTeamMember";
import ContactManagemenet from "./DashboardPages/ContactManagemenet/ContactManagemenet";
import VisaPosting from "./DashboardPages/VisaPosting/VisaPosting";
import PreviewVisa from "./DashboardPages/PreviewVisa/PreviewVisa";

export default function App() {
  return (
    <>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* Dashboard Layout */}
          <Route path="/" element={<AppLayout />}>
            <Route index element={<Home />} />

            {/* Others Page */}
            <Route path="profile" element={<UserProfiles />} />
            <Route path="blank" element={<Blank />} />

            {/* Forms */}
            <Route path="form-elements" element={<FormElements />} />

            {/* Tables */}
            <Route path="basic-tables" element={<BasicTables />} />

            {/* Charts */}
            <Route path="line-chart" element={<LineChart />} />
            <Route path="bar-chart" element={<BarChart />} />



            {/* All DashBoard Pages , Routes Here!!!! */}
          <Route path="/country/manage" element={<PostCountry />} />
          <Route path="/country/visa-type" element={<VisaType />} />
          <Route path="/team/post-member" element={<PostTeamMember />} />
          <Route path="/contact/manage" element={<ContactManagemenet />} />
          <Route path="/visa/post-visa" element={<VisaPosting />} />
          <Route path="/visa/preview" element={<PreviewVisa />} />
          
          </Route>

          {/* Auth Layout */}
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />

          {/* Fallback Route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
}
