import ContactInfoBar from "../../../components/ContactInfoBar/ContactInfoBar";
import PageBanner from "../../../components/PageBanner/PageBanner";
import LoginPage from "./LoginPage";

export default function LoginLayout() {
  return (
    <>
      <PageBanner
        title="Login"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Login" }]}
        bgImage="https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
      />
      <LoginPage />
      <ContactInfoBar />
    </>
  );
}
