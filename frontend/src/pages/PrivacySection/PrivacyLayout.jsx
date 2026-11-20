import PageBanner from "../../components/PageBanner/PageBanner";
import OurPartner from "../HomePage/OurPartner/OurPartner";
import PrivacyPage from "./PrivacyPage/Privacypage";

export default function PrivacyLayout() {
  return (
    <>
      <PageBanner
        title="Privacy Policy"
        breadcrumbs={[
          { label: "Home", href: "/" },
          { label: "Privacy Policy" },
        ]}
        bgImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <PrivacyPage />
      <OurPartner />
    </>
  );
}
