import React from "react";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import LogoutButton from "./Logout";

const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #333;
  padding: 1rem;
`;

const NavbarBrand = styled(Link)`
  color: #fff;
  text-decoration: none;
  font-size: 1.5rem;
  font-weight: bold;
`;

const NavbarMenu = styled.ul`
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
`;

const NavbarItem = styled.li`
  margin-right: 1rem;
`;

const NavbarLink = styled(Link)`
  color: #fff;
  text-decoration: none;
`;

const Navbar = () => {
  return (
    <NavbarContainer>
      <NavbarBrand to="/">SmartCOMM</NavbarBrand>
      <NavbarMenu>
    
        <NavbarItem>
         <LogoutButton/>
        </NavbarItem>
      </NavbarMenu>
    </NavbarContainer>
  );
};

export default Navbar;