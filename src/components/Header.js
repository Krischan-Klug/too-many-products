import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";

//Styled components
const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
`;

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  right: 0;
  margin: 0 auto;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
`;

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);

  function toggleMenu(menu) {
    setActiveMenu(activeMenu === menu ? null : menu);
  }

  return (
    <>
      <StyledHeader>
        <Link href="/">TMP</Link>
        <div>
          <button onClick={() => toggleMenu("products")}>
            <h3>Products</h3>
          </button>
          <button onClick={() => toggleMenu("stock")}>
            <h3>Stock</h3>
          </button>
          <button onClick={() => toggleMenu("admin")}>
            <h3>Admin</h3>
          </button>
        </div>
      </StyledHeader>

      {activeMenu === "products" && (
        <StyledMenu>
          <h3>Products</h3>
          <Link href="/products">Overview</Link>
          <Link href="/products/create">Create</Link>
          <Link href="/products/delete">Delete</Link>
        </StyledMenu>
      )}
      {activeMenu === "stock" && (
        <StyledMenu>
          <h3>Stock</h3>
          <Link href="/">Stock</Link>
          <Link href="/">WIP</Link>
          <Link href="/">WIP</Link>
        </StyledMenu>
      )}
      {activeMenu === "admin" && (
        <StyledMenu>
          <h3>Admin</h3>
          <Link href="/">ADMIN</Link>
          <Link href="/">USERS</Link>
          <Link href="/">WIP</Link>
        </StyledMenu>
      )}
    </>
  );
}
