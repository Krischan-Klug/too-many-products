import { StyledProductForm } from "@/components/StyledComponents/StyledForms";

export default function Delete() {
  let productToDelete = {};
  const handleSubmit = (e) => {
    e.preventDefault();

    // get form data
    const formData = new FormData(e.target);
    const productObject = Object.fromEntries(formData.entries());

    productToDelete = productObject;

    deleteProduct();
    e.target.reset();
  };

  async function deleteProduct() {
    const response = await fetch("/api/products/", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productToDelete),
    });

    if (!response.ok) {
      console.error(response.status);
    }
  }

  return (
    <>
      <h1>DELETE</h1>
      <StyledProductForm onSubmit={handleSubmit}>
        <h1>Delete Product</h1>
        <label htmlFor="_id">ID</label>
        <input type="text" name="_id" id="_id" />
        <br />
        <button type="submit">Delete</button>
      </StyledProductForm>
    </>
  );
}
