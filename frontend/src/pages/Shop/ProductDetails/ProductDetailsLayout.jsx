import PageBanner from "../../../components/PageBanner/PageBanner";
import ProductDetailPage from "./ProductDetailsPage/ProductDetailPage";

export default function ProductDetailsLayout() {
  return (
    <>
      <PageBanner
        title="Shop Details"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop Details" }]}
        bgImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrJQWF_7h6sBt7K47w_AvUC3emrl3DK1QkVE6Fc7gr17nKKtsy"
      />
      <ProductDetailPage />
    </>
  );
}
