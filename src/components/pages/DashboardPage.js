import React from "react";
import AdminCardSection1 from "./sections/AdminCardSection1";
import BreadcrumSection from "./sections/BreadcrumSection";

const DashboardPage = () => {
  return (
    <React.Fragment>
      <BreadcrumSection />
      <AdminCardSection1 />
    </React.Fragment>
  );
};

export default DashboardPage;
