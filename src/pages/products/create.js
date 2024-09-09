import { StyledProductForm } from "@/components/StyledComponents/StyledForms";

export default function Create() {
  let finalProduct = {};
  const handleSubmit = (e) => {
    e.preventDefault();

    // get form data
    const formData = new FormData(e.target);
    const productObject = Object.fromEntries(formData.entries());

    finalProduct = productObject;
    createProduct();
    e.target.reset();
  };

  async function createProduct() {
    const response = await fetch("/api/products/products", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(finalProduct),
    });

    if (!response.ok) {
      console.error(response.status);
    }
  }

  return (
    <>
      <StyledProductForm onSubmit={handleSubmit}>
        <h1>Create Product</h1>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />

        <label htmlFor="price">Price</label>
        <input type="number" name="price" id="price" />

        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" />
        <br />

        <button type="submit">Create</button>
      </StyledProductForm>
    </>
  );
}
