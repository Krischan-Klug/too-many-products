import styled from "styled-components";

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

export default function Create() {
  const handleSubmit = (e) => {
    e.preventDefault();

    // get form data
    const formData = new FormData(e.target);
    const productObject = Object.fromEntries(formData.entries());

    console.log(productObject);
  };
  return (
    <>
      <StyledForm onSubmit={handleSubmit}>
        <h1>Create Product</h1>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" />

        <label htmlFor="price">Price</label>
        <input type="number" name="price" id="price" />

        <label htmlFor="description">Description</label>
        <input type="text" name="description" id="description" />
        <br />

        <button type="submit">Create</button>
      </StyledForm>
    </>
  );
}
