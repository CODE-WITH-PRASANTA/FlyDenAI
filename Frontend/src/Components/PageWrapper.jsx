// src/Components/PageWrapper/PageWrapper.jsx
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import PageLoader from "./PageLoader/PageLoader";

const PageWrapper = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const location = useLocation();

  useEffect(() => {
    setLoading(true); // show loader on route change
  }, [location]);

  useEffect(() => {
    if (!loading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [loading]);

  return (
    <>
      <PageLoader loading={loading} setLoading={setLoading} />
      {!loading && children}
    </>
  );
};

export default PageWrapper;
