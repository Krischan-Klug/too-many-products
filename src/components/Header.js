import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
`;

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  top: 0;
  right: 40;
`;

export default function Header() {
  const [productMenuOpen, setProductMenuOpen] = useState(false);

  const toggleMenu = () => {
    setProductMenuOpen(!productMenuOpen);
  };

  return (
    <>
      <StyledHeader>
        <h3>TMP</h3>
        <button onClick={toggleMenu}>
          <h3>Products</h3>
        </button>
      </StyledHeader>
      {productMenuOpen && (
        <StyledMenu>
          <Link href="/create">Create</Link>
          <Link href="/edit">Edit</Link>
          <Link href="/delete">Delete</Link>
        </StyledMenu>
      )}
    </>
  );
}
