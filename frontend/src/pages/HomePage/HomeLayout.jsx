import AboutSection from "./AboutSection/AboutSection";
import ClientReviews from "./Clientreviews/Clientreviews";
import ExploreSection from "./ExploreSection/ExploreSection";
import Hero from "./Hero/Hero";
import Marquee from "./Marquee/Marquee";
import OurMembers from "./Ourmembers/OurMembers";
import OurPartner from "./OurPartner/OurPartner";
import PortfolioSection from "./PortfolioSection/PortfolioSection";
import ServicesPage from "./Servicespage/Servicespage";
import VideoStatsSection from "./VideoStatsSection/VideoStatsSection";
import WhyChooseSection from "./WhyChooseSection/WhyChooseSection";

export default function HomeLayout() {
  return (
    <>
      <Hero />
      <Marquee />
      <AboutSection />
      <ExploreSection />
      <ServicesPage />
      <WhyChooseSection />
      <VideoStatsSection />
      <PortfolioSection />
      <ClientReviews />
      <OurMembers />
      <OurPartner />
    </>
  );
}
