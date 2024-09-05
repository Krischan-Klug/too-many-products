import { useState } from "react";
import styled from "styled-components";

const StyledHeader = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
`;

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <StyledHeader>
      <h3>TMP</h3>
      <button onClick={toggleMenu}>
        <h3>Products</h3>
      </button>
      {menuOpen && (
        <ul>
          <li>Create</li>
          <li>Delete</li>
          <li>Edit</li>
        </ul>
      )}
    </StyledHeader>
  );
}
