import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import HomeLayout from "./pages/HomePage/HomeLayout";
import Footer from "./components/Footer/Footer";
import ContactLayout from "./pages/ContactSection/ContactLayout";
import ShopLayout from "./pages/Shop/ShopLayout";
import CartLayout from "./pages/CartSection/CartLayout";
import LoginLayout from "./pages/Auth/Login/LoginLayout";
import RegisterLayout from "./pages/Auth/Register/RegisterLayout";
import WishListLayout from "./pages/WishLIstSection/WishListLayout";
import CheckoutLayout from "./pages/CheckoutSection/CheckoutLayout";
import BlogLayout from "./pages/BlogSection/BlogLayout";
import BlogDetailLayout from "./pages/BlogSection/BlogPage/BlogDetailLayout";
import TermLayout from "./pages/TermSection/TermLayout";
import PrivacyLayout from "./pages/PrivacySection/PrivacyLayout";
import FaqLayout from "./pages/Faqsection/FaqLayout";
import AboutLayout from "./pages/About/AboutLayout";
import ServiceLayout from "./pages/ServiceSection/ServiceLayout";
import PricingLayout from "./pages/PricingSection/PricingLayout";
import PortfolioLayout from "./pages/PortfolioSection/PortfolioLayout";
import AdminLayout from "./pages/Admin/layout/AdminLayout";
import Dashboard from "./pages/Admin/pages/Dashboard";
import AdminAddProduct from "./pages/Admin/pages/AdminAddProduct/AdminAddProduct";
import AdminOrders from "./pages/Admin/pages/AdminOrders/AdminOrders";
import AdminAddBlog from "./pages/Admin/pages/AdminAddBlog/AdminAddBlog";
import AdminAddService from "./pages/Admin/pages/AdminAddService/AdminAddService";
import AdminFAQs from "./pages/Admin/pages/AdminFAQs/AdminFAQs";
import AdminMembers from "./pages/Admin/pages/AdminMembers/AdminMembers";
import AdminPrivacy from "./pages/Admin/pages/AdminPrivacy/AdminPrivacy";
import AdminTestimonials from "./pages/Admin/pages/AdminTestimonials/AdminTestimonials";
import AdminContacts from "./pages/Admin/pages/AdminContacts/AdminContacts";
import AdminReviews from "./pages/Admin/pages/AdminReviews/AdminReviews";
import AdminTerms from "./pages/Admin/pages/AdminTerms/AdminTerms";
import ProjectDetailsLayout from "./pages/ProductDetails/ProjectDetailsLayout";
import ProductDetailsLayout from "./pages/Shop/ProductDetails/ProductDetailsLayout";
function App() {
  const location = useLocation();

  const isAdminRoute = location.pathname.startsWith("/admin");
  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Routes>
        <Route path="/" element={<HomeLayout />} />
        <Route path="/contact" element={<ContactLayout />} />
        <Route path="/shop" element={<ShopLayout />} />
        <Route path="/products/:id" element={<ProductDetailsLayout />} />
        <Route path="/cart" element={<CartLayout />} />
        <Route path="/login" element={<LoginLayout />} />
        <Route path="/register" element={<RegisterLayout />} />
        <Route path="/wishlist" element={<WishListLayout />} />
        <Route path="/checkout" element={<CheckoutLayout />} />
        <Route path="/blog" element={<BlogLayout />} />
        <Route path="/blog/:id" element={<BlogDetailLayout />} />
        <Route path="/terms" element={<TermLayout />} />
        <Route path="/privacy-policy" element={<PrivacyLayout />} />
        <Route path="/faqs" element={<FaqLayout />} />
        <Route path="/about" element={<AboutLayout />} />
        <Route path="/service" element={<ServiceLayout />} />
        <Route path="/pricing" element={<PricingLayout />} />
        <Route path="/portfolio" element={<PortfolioLayout />} />
        <Route path="/project" element={<ProjectDetailsLayout />} />

        {/* admin routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="products" element={<AdminAddProduct />} />
          <Route path="orders" element={<AdminOrders />} />
          <Route path="blogs" element={<AdminAddBlog />} />
          <Route path="services" element={<AdminAddService />} />
          <Route path="faq" element={<AdminFAQs />} />
          <Route path="members" element={<AdminMembers />} />
          <Route path="privacy" element={<AdminPrivacy />} />
          <Route path="testimonials" element={<AdminTestimonials />} />
          <Route path="contact" element={<AdminContacts />} />
          <Route path="review" element={<AdminReviews />} />
          <Route path="terms" element={<AdminTerms />} />
          {/* <Route path="blogs/add" element={<AdminAddBlog />} />
          
          <Route path="career" element={<AdminCareer />} />
          
          <Route path="pricing" element={<AdminPricing />} />
          <Route path="projects" element={<AdminProjects />} />
          <Route path="technology" element={<AdminTechnology />} />
          <Route path="terms" element={<AdminTerms />} />
           */}
        </Route>
      </Routes>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
