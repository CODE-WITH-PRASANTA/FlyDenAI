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
import BlogPosting from "./DashboardPages/BlogPosting/BlogPosting";
import PostTestimonial from "./DashboardPages/PostTestimonial/PostTestimonial";
import ClientAction from "./DashboardPages/ClientAction/ClientAction";
import FaqPosting from "./DashboardPages/FaqPosting/FaqPosting";
import AdvertizingBanner from "./DashboardPages/AdvertizingBanner/AdvertizingBanner";
import DirectorandAchivmentManage from "./DashboardPages/DirectorandAchivmentManage/DirectorandAchivmentManage";
import FaqPreview from "./DashboardPages/FaqPreview/FaqPreview";
import MediaUpload from "./DashboardPages/MediaUpload/MediaUpload";
import BlogPreview from "./DashboardPages/BlogPreview/BlogPreview";
import OurSuccessfulClients from "./DashboardPages/OurSuccessfulClients/OurSuccessfulClients";
import TeamPreview from "./DashboardPages/TeamPreview/TeamPreview";

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
          <Route path="/team/preview" element={<TeamPreview />} />
          
          <Route path="/contact/manage" element={<ContactManagemenet />} />


          <Route path="/visa/post-visa" element={<VisaPosting />} />
          <Route path="/visa/preview" element={<PreviewVisa />} />

          <Route path="/blog/post" element={<BlogPosting />} />
          <Route path="/blog/preview" element={<BlogPreview />} />

          <Route path="/testimonial/post" element={<PostTestimonial />} />
          <Route path="/testimonial/client-action" element={<ClientAction />} />
          <Route path="/faq/post-faq" element={<FaqPosting />} />
          <Route path="/faq/preview" element={<FaqPreview/>} />
          <Route path="/media/upload" element={<MediaUpload/>} />
          
          <Route path="/clients/successful" element={<OurSuccessfulClients/>} />


          <Route path="/advertise/banner" element={<AdvertizingBanner />} />
          <Route path="/director-achievement-manage" element={<DirectorandAchivmentManage />} />
          
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
