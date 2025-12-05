import { BrowserRouter as Router, Routes, Route } from "react-router";

// Auth Pages
import SignIn from "./pages/AuthPages/SignIn";
import SignUp from "./pages/AuthPages/SignUp";

// Other Pages
import NotFound from "./pages/OtherPage/NotFound";
import UserProfiles from "./pages/UserProfiles";
import Blank from "./pages/Blank";

// Charts
import LineChart from "./pages/Charts/LineChart";
import BarChart from "./pages/Charts/BarChart";

// Tables & Forms
import BasicTables from "./pages/Tables/BasicTables";
import FormElements from "./pages/Forms/FormElements";

// Dashboard Layout
import AppLayout from "./layout/AppLayout";
import { ScrollToTop } from "./components/common/ScrollToTop";
import Home from "./pages/Dashboard/Home";

// Dashboard Pages
import PostCountry from "./DashboardPages/PostCountry/PostCountry";
import VisaType from "./DashboardPages/VisaType/VisaType";
import PostTeamMember from "./DashboardPages/PostTeamMember/PostTeamMember";
import TeamPreview from "./DashboardPages/TeamPreview/TeamPreview";

import ContactManagemenet from "./DashboardPages/ContactManagemenet/ContactManagemenet";

import VisaPosting from "./DashboardPages/VisaPosting/VisaPosting";
import PreviewVisa from "./DashboardPages/PreviewVisa/PreviewVisa";

import BlogPosting from "./DashboardPages/BlogPosting/BlogPosting";
import BlogPreview from "./DashboardPages/BlogPreview/BlogPreview";

import PostTestimonial from "./DashboardPages/PostTestimonial/PostTestimonial";
import ClientAction from "./DashboardPages/ClientAction/ClientAction";

import FaqPosting from "./DashboardPages/FaqPosting/FaqPosting";
import FaqPreview from "./DashboardPages/FaqPreview/FaqPreview";

import AdvertizingBanner from "./DashboardPages/AdvertizingBanner/AdvertizingBanner";
import MediaUpload from "./DashboardPages/MediaUpload/MediaUpload";

import DirectorandAchivmentManage from "./DashboardPages/DirectorandAchivmentManage/DirectorandAchivmentManage";
import OurSuccessfulClients from "./DashboardPages/OurSuccessfulClients/OurSuccessfulClients";

import DisountCouponGeneratingPage from "./DashboardPages/DisountCouponGeneratingPage/DisountCouponGeneratingPage";
import VisaPayments from "./DashboardPages/VisaPayments/VisaPayments";
import DummmyTicketManage from "./DashboardPages/DummmyTicketManage/DummmyTicketManage";
import DummyTicketHolder from "./DashboardPages/DummyTicketHolder/DummyTicketHolder";

// 🔐 IMPORT PROTECTED ROUTE
import ProtectedRoute from "./routes/ProtectedRoute";
import DummyTicketManage from "./DashboardPages/DummmyTicketManage/DummmyTicketManage";
import InsuranceData from "./DashboardPages/InsuranceData/InsuranceData";

export default function App() {
  return (
    <Router>
      <ScrollToTop />

      <Routes>
        {/* ----------------------------------------------------
         *  DASHBOARD LAYOUT (PROTECTED AREA)
         * -------------------------------------------------- */}
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <AppLayout />
            </ProtectedRoute>
          }
        >
          {/* Default Dashboard */}
          <Route index element={<Home />} />

          {/* Common Pages */}
          <Route path="profile" element={<UserProfiles />} />
          <Route path="blank" element={<Blank />} />

          {/* Forms */}
          <Route path="form-elements" element={<FormElements />} />

          {/* Tables */}
          <Route path="basic-tables" element={<BasicTables />} />

          {/* Charts */}
          <Route path="line-chart" element={<LineChart />} />
          <Route path="bar-chart" element={<BarChart />} />

          {/* ----------------------------------------------------
           *  COUNTRY & VISA MANAGEMENT
           * -------------------------------------------------- */}
          <Route path="/country/manage" element={<PostCountry />} />
          <Route path="/country/visa-type" element={<VisaType />} />

          {/* ----------------------------------------------------
           *  TEAM MANAGEMENT
           * -------------------------------------------------- */}
          <Route path="/team/post-member" element={<PostTeamMember />} />
          <Route path="/team/preview" element={<TeamPreview />} />

          {/* ----------------------------------------------------
           *  CONTACT MANAGEMENT
           * -------------------------------------------------- */}
          <Route path="/contact/manage" element={<ContactManagemenet />} />

          {/* ----------------------------------------------------
           *  VISA POSTING & PREVIEW
           * -------------------------------------------------- */}
          <Route path="/visa/post-visa" element={<VisaPosting />} />
          <Route path="/visa/preview" element={<PreviewVisa />} />

          {/* ----------------------------------------------------
           *  BLOG MANAGEMENT
           * -------------------------------------------------- */}
          <Route path="/blog/post" element={<BlogPosting />} />
          <Route path="/blog/preview" element={<BlogPreview />} />

          {/* ----------------------------------------------------
           *  TESTIMONIALS & CLIENT ACTION
           * -------------------------------------------------- */}
          <Route path="/testimonial/post" element={<PostTestimonial />} />
          <Route path="/testimonial/client-action" element={<ClientAction />} />

          {/* ----------------------------------------------------
           *  FAQ
           * -------------------------------------------------- */}
          <Route path="/faq/post-faq" element={<FaqPosting />} />
          <Route path="/faq/preview" element={<FaqPreview />} />

          {/* ----------------------------------------------------
           *  MEDIA & GALLERY
           * -------------------------------------------------- */}
          <Route path="/media/upload" element={<MediaUpload />} />

          {/* ----------------------------------------------------
           *  SUCCESSFUL CLIENTS
           * -------------------------------------------------- */}
          <Route
            path="/clients/successful"
            element={<OurSuccessfulClients />}
          />

          {/* ----------------------------------------------------
           *  ADVERTISING
           * -------------------------------------------------- */}
          <Route path="/advertise/banner" element={<AdvertizingBanner />} />

          {/* ----------------------------------------------------
           *  DIRECTOR & ACHIEVEMENT
           * -------------------------------------------------- */}
          <Route
            path="/director-achievement-manage"
            element={<DirectorandAchivmentManage />}
          />

          {/* ----------------------------------------------------
           *  DISCOUNT COUPON
           * -------------------------------------------------- */}
          <Route
            path="/discount-coupon/generate"
            element={<DisountCouponGeneratingPage />}
          />
          <Route
            path="/dummy-ticket/manage"
            element={<DummyTicketManage />}
          />
          <Route
            path="/dummy-ticket/holder"
            element={<DummyTicketHolder />}
          />
          <Route
            path="/dummy-ticket/insurance"
            element={<InsuranceData />}
          />

          {/* ----------------------------------------------------
           *  VISA PAYMENTS
           * -------------------------------------------------- */}
          <Route path="/visa-notes/payment" element={<VisaPayments />} />
        </Route>

        {/* ----------------------------------------------------
         *  AUTH ROUTES (PUBLIC)
         * -------------------------------------------------- */}
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />

        {/* ----------------------------------------------------
         *  NOT FOUND (404)
         * -------------------------------------------------- */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}
