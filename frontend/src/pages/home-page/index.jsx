import React from "react";

import TopNavigation from "../../components/TopNavigation";
import TopBanner from "../../components/TopBanner";
import Service from "../../components/Services";
import Summary from "../../components/Summary";
import RecentProjects from "../../components/RecentProjects";
import Courses from "../../components/Courses";
import ClientReview from "../../components/ClientReview";
import Footer from "../../components/Footer";
import Video from "../../components/Video";
const index = () => {
  return (
    <div>
      <TopNavigation />
      <TopBanner />
      <Service />
      <Summary />
      <RecentProjects />
      <Courses />
      <ClientReview />
      <Video />
      <Footer />
    </div>
  );
};

export default index;
