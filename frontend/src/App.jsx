import { lazy, Suspense } from "react";
import "./App.css";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import LoadingSpinner from "./components/Loading/LoadingSpinner";

// User-facing page layouts (Lazy-loaded)
const HomeLayout = lazy(() => import("./pages/HomePage/HomeLayout"));
const ContactLayout = lazy(() => import("./pages/ContactSection/ContactLayout"));
const ShopLayout = lazy(() => import("./pages/Shop/ShopLayout"));
const ProductDetailsLayout = lazy(() => import("./pages/Shop/ProductDetails/ProductDetailsLayout"));
const CartLayout = lazy(() => import("./pages/CartSection/CartLayout"));
const LoginLayout = lazy(() => import("./pages/Auth/Login/LoginLayout"));
const RegisterLayout = lazy(() => import("./pages/Auth/Register/RegisterLayout"));
const WishListLayout = lazy(() => import("./pages/WishLIstSection/WishListLayout"));
const CheckoutLayout = lazy(() => import("./pages/CheckoutSection/CheckoutLayout"));
const BlogLayout = lazy(() => import("./pages/BlogSection/BlogLayout"));
const BlogDetailLayout = lazy(() => import("./pages/BlogSection/BlogPage/BlogDetailLayout"));
const TermLayout = lazy(() => import("./pages/TermSection/TermLayout"));
const PrivacyLayout = lazy(() => import("./pages/PrivacySection/PrivacyLayout"));
const FaqLayout = lazy(() => import("./pages/Faqsection/FaqLayout"));
const AboutLayout = lazy(() => import("./pages/About/AboutLayout"));
const ServiceLayout = lazy(() => import("./pages/ServiceSection/ServiceLayout"));
const PricingLayout = lazy(() => import("./pages/PricingSection/PricingLayout"));
const PortfolioLayout = lazy(() => import("./pages/PortfolioSection/PortfolioLayout"));
const ProjectDetailsLayout = lazy(() => import("./pages/ProductDetails/ProjectDetailsLayout"));

// Admin panel layouts (Lazy-loaded, isolated from user bundle)
const AdminLayout = lazy(() => import("./pages/Admin/layout/AdminLayout"));
const Dashboard = lazy(() => import("./pages/Admin/pages/Dashboard"));
const AdminAddProduct = lazy(() => import("./pages/Admin/pages/AdminAddProduct/AdminAddProduct"));
const AdminOrders = lazy(() => import("./pages/Admin/pages/AdminOrders/AdminOrders"));
const AdminAddBlog = lazy(() => import("./pages/Admin/pages/AdminAddBlog/AdminAddBlog"));
const AdminAddService = lazy(() => import("./pages/Admin/pages/AdminAddService/AdminAddService"));
const AdminFAQs = lazy(() => import("./pages/Admin/pages/AdminFAQs/AdminFAQs"));
const AdminMembers = lazy(() => import("./pages/Admin/pages/AdminMembers/AdminMembers"));
const AdminPrivacy = lazy(() => import("./pages/Admin/pages/AdminPrivacy/AdminPrivacy"));
const AdminTestimonials = lazy(() => import("./pages/Admin/pages/AdminTestimonials/AdminTestimonials"));
const AdminContacts = lazy(() => import("./pages/Admin/pages/AdminContacts/AdminContacts"));
const AdminReviews = lazy(() => import("./pages/Admin/pages/AdminReviews/AdminReviews"));
const AdminTerms = lazy(() => import("./pages/Admin/pages/AdminTerms/AdminTerms"));

function App() {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith("/admin");

  return (
    <>
      {!isAdminRoute && <Navbar />}
      <Suspense fallback={<LoadingSpinner />}>
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

          {/* Admin routes */}
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
          </Route>
        </Routes>
      </Suspense>
      {!isAdminRoute && <Footer />}
    </>
  );
}

export default App;
