import PageBanner from "../../components/PageBanner/PageBanner";
import ProductGrid from "./ProductGrid/ProductGrid";

export default function ShopLayout() {
  return (
    <>
      <PageBanner
        title="Shop"
        breadcrumbs={[{ label: "Home", href: "/" }, { label: "Shop" }]}
        bgImage="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRrJQWF_7h6sBt7K47w_AvUC3emrl3DK1QkVE6Fc7gr17nKKtsy"
      />
      <ProductGrid />
    </>
  );
}
