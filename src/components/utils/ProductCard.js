import styled from "styled-components";

const StyledProductCard = styled.div`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
  margin-bottom: 20px;
`;

const StyledText = styled.p`
  margin-bottom: 5px;
  margin-top: 5px;
`;

const StyledH3 = styled.h3`
  margin-bottom: 5px;
  margin-top: 5px;
`;

export default function ProductCard({ product }) {
  return (
    <StyledProductCard>
      <StyledH3>name: {product.name}</StyledH3>
      <StyledText>id: {product._id}</StyledText>
      <StyledText>price: {product.price}€</StyledText>
      <StyledText>description: {product.description}</StyledText>
    </StyledProductCard>
  );
}
