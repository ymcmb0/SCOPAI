import React, { useState, useEffect,useRef } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  position: relative;
  background-color: ${({ scrolled }) => (scrolled ? 'white' : 'transparent')};
  transition: background-color 0.3s;
  z-index: 1000;
  font-family: 'Anta', sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const LogoContainer = styled(NavLink)`
  display: flex;
  margin-left:-80px;
  margin-right:80px;
  text-decoration:none;
  align-items: center;
`;

const Logo = styled.img`
  max-width: 100px;
  height: auto;
  padding: 1px;
  margin-right: -20px;
  margin-left: 4px;
  filter: ${({ scrolled }) => (scrolled ? 'invert(100%)' : '#fff')};
`;

const LogoText = styled.span`
  color: ${({ scrolled }) => (scrolled ? '#000' : '#fff')};
  font-size: 2.4rem;
  margin-left: 5px;
`;

const Navigation = styled.nav`
  display: flex;
  align-items: center;
`;

const NavigationLink = styled(NavLink)`
  color: ${({ scrolled }) => (scrolled ? 'black' : 'white')};
  text-decoration: none;
  margin: 0 10px;
  font-size: 1rem;
  transition: color 0.3s;

  &:hover {
    color: orange;
    textDecoration:underline;
  }

  @media screen and (max-width: 768px) {
    font-size: 1rem;
  }
`;

const JoinButtonContainer = styled.div`
  position: relative;

`;

const UserEmail = styled.h5`
  color: ${({ scrolled }) => (scrolled ? 'black' : 'white')};
  font-weight: normal;
  margin-left: 10px;
`;

const JoinButton = styled.button`
  background: none;
  border-color: ${({ scrolled }) => (scrolled ? '#000' : '#fff')};
  font-family: 'Anta';
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 20px;
   &:hover {
    background-color: grey;
    }
`;

const DropdownArrow = styled.span`
 color: ${({ scrolled }) => (scrolled ? '#000' : '#fff')};
  margin-left: 5px;
  cursor: pointer;
`;

const Dropdown = styled.div`
  position: absolute;
  top: calc(100% + 5px);
  left: 0;
  background-color: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? 'block' : 'none')};
  padding: 10px;
  z-index: 1;
  text-align: center;
`;

const DropdownItemContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const DropdownItem = styled(NavLink)`
  color: #000;
  text-decoration: none;
  font-size: 1rem;
  margin: 5px 0;
`;

const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const user_email = localStorage.getItem('user');
  const joinButtonRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const handleOptionsToggle = () => {
    setShowOptions(!showOptions);
  };

  const handleLogout = () => {
    localStorage.clear();
    setShowOptions(false);
    navigate('/login');
  };

  const handleMouseEnter = () => {
    setShowOptions(true);
  };

  const handleMouseLeave = () => {
    setShowOptions(false);
  };


  return (
    <HeaderContainer scrolled={scrolled}>
      <HeaderContent>
        <LogoContainer>
          <Logo scrolled={scrolled} src="/Logo400x400.png" alt="SCOPAI" />
          <LogoText scrolled={scrolled}>SCOPAI</LogoText>
        </LogoContainer>
        <Navigation>
          <NavigationLink to="/landingsection" scrolled={scrolled}>
            Home
          </NavigationLink>
          <NavigationLink to="/features" scrolled={scrolled}>
            Features
          </NavigationLink>
          <NavigationLink to="/services" scrolled={scrolled}>
            Services
          </NavigationLink>
          <NavigationLink to="/pricingpage" scrolled={scrolled}>
            Pricing
          </NavigationLink>
          <NavigationLink to="/about" scrolled={scrolled}>
            About
          </NavigationLink>
          <NavigationLink to="/ad" scrolled={scrolled}>
            Advertisement
          </NavigationLink>
        </Navigation>
        {localStorage.getItem('user') ? (
          <JoinButtonContainer ref={joinButtonRef}>
            <JoinButton onClick={handleOptionsToggle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => {
              // Check if cursor is outside the join button and dropdown
              if (!joinButtonRef.current.contains(document.activeElement)) {
                handleMouseLeave();
              }
            }}>
              <UserEmail scrolled={scrolled}>{user_email}</UserEmail>
              <DropdownArrow scrolled={scrolled}>▼</DropdownArrow>
              <Dropdown isOpen={showOptions} >
                <DropdownItemContainer >
                  <DropdownItem to="/profile">Manage Profile</DropdownItem>
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </DropdownItemContainer>
              </Dropdown>
            </JoinButton>
          </JoinButtonContainer>
        ) : (
          <JoinButtonContainer ref={joinButtonRef}>
            <JoinButton onClick={handleOptionsToggle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={() => {
              // Check if cursor is outside the join button and dropdown
              if (!joinButtonRef.current.contains(document.activeElement)) {
                handleMouseLeave();
              }
            }}>
              <UserEmail scrolled={scrolled}>Join</UserEmail> <DropdownArrow scrolled={scrolled}>▼</DropdownArrow>
              <Dropdown isOpen={showOptions}>
                <DropdownItemContainer >
                  <DropdownItem to="/login">Login</DropdownItem>
                  <DropdownItem to="/register">Signup</DropdownItem>
                </DropdownItemContainer>
              </Dropdown>
            </JoinButton>
          </JoinButtonContainer>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
