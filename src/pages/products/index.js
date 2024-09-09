import { useState } from "react";
import ProductCard from "@/components/utils/ProductCard";
import { StyledTopWrapper } from "@/components/StyledComponents/StyledWrappers";

export default function Products() {
  const [allProducts, setAllProducts] = useState([]);

  async function getAllProducts() {
    const response = await fetch("/api/products/products");
    setAllProducts(await response.json());
  }

  return (
    <>
      <StyledTopWrapper>
        <h1>OVERVIEW</h1>
        <button onClick={() => getAllProducts()}>Get All Products</button>
      </StyledTopWrapper>
      <div>
        {allProducts.map((product) => (
          <ProductCard key={product._id} product={product}></ProductCard>
        ))}
      </div>
    </>
  );
}
