import { useState } from "react";
import styled from "styled-components";
import Link from "next/link";
import { StyledHeaderWrapper } from "@/components/StyledComponents/StyledWrappers";
import { useSession } from "next-auth/react";

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem;
  background-color: #f5f5f5;
  border-bottom: 1px solid #ccc;
  position: relative;
  top: 0;
  z-index: 999;
`;

const StyledMenu = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  align-items: center;
  top: 100%;
  right: 0;
  margin: 0;
  max-width: 400px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 5px;
  background-color: #f5f5f5;
  z-index: 998;
`;

export default function Header() {
  const [activeMenu, setActiveMenu] = useState(null);

  const { data: session } = useSession();

  console.log(session);

  function toggleMenu(menu) {
    setActiveMenu(activeMenu === menu ? null : menu);
  }

  return (
    <>
      <StyledHeaderWrapper>
        <StyledHeader>
          <Link href="/">TMP</Link>
          <div>
            <button onClick={() => toggleMenu("products")}>
              <h3>Products</h3>
            </button>
            <button onClick={() => toggleMenu("stock")}>
              <h3>Stock</h3>
            </button>
            {session.user.privileges.admin === true && (
              <button onClick={() => toggleMenu("admin")}>
                <h3>Admin</h3>
              </button>
            )}
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
            <Link href="/admin">Admin</Link>
            <Link href="/admin/register">Create User</Link>
            <Link href="/">WIP</Link>
          </StyledMenu>
        )}
      </StyledHeaderWrapper>
    </>
  );
}
