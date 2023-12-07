// Header.js
import React,{ useState }  from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Inter } from "@fontsource/inter";

// Styled components
const HeaderWrapper = styled.header`
  font-family: 'Inter', sans-serif;
  display: flex;
  background: black;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: black;
  color: white;
  width:100%;
  height: 70px;
`;

const LogoContainer = styled.div`

  flex: 1;
`;

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: white;
  font-size: 18px; /* Adjusted font size */
  margin-left: 10px; /* Adjusted margin */

`;

const LogoImg = styled.img`
  margin-right: 0.5rem;
  height: 30px;
`;

const Nav = styled.nav`
  display: flex;
  gap: 1rem;
  flex: 2;
  justify-content: center;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: white;
  transition: color 0.3s;
  margin-right: 50px;
  &:hover {
    color: #61dafb;
  }
`;

const AuthContainer = styled.div`
  position: relative;
  cursor: pointer;
  display: flex;
  gap: 1rem;
  font-style: italic;
  margin-right: 50px; /* Adjusted margin */
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  width: 120px;
  background: white;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  display: none;
  overflow: hidden;
  white-space: nowrap;
`;

const DropdownItem = styled(Link)`
  padding: 8px;
  text-decoration: none;
  color: black;
  display: block;
  transition: background 0.3s;

  &:hover {
    background: #f0f0f0;
  }
`;

// Header component
const Header = () => {
const [isDropdownVisible, setDropdownVisible] = useState(false);

  const handleMouseOver = () => {
    setDropdownVisible(true);
  };

  const handleMouseLeave = () => {
    setDropdownVisible(false);
  };

  return (
    <HeaderWrapper>
      <LogoContainer>
        <LogoLink to="/">
          <LogoImg src="/Logoheader.png" alt="SCOPAI Logo" />
          SCOPAI
        </LogoLink>
      </LogoContainer>
      <Nav>
        <NavLink to="/whyscopai">Why SCOPAI?</NavLink>
        <NavLink to="/features">Features</NavLink>
        <NavLink to="/pricing">Pricing</NavLink>
        <NavLink to="/blog">Blog</NavLink>
         <NavLink to="/placeadvertisement">Place Advertisement</NavLink>
      </Nav>
      <AuthContainer id="authContainer" onMouseOver={handleMouseOver} onMouseLeave={handleMouseLeave}>
        Join
       <Dropdown id="dropdown" style={{ display: isDropdownVisible ? 'block' : 'none' }}>
          <DropdownItem to="/login">Login</DropdownItem>
          <DropdownItem to="/signup">Signup</DropdownItem>
        </Dropdown>
      </AuthContainer>
    </HeaderWrapper>
  );
};

export default Header;
