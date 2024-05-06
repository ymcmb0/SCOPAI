import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  position: fixed;
  max-width: 1400px;
  width: 100%;
  background-color: ${({ scrolled }) => (scrolled ? 'black' : 'white')};
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
   text-decoration: none;
   margin-left:-80px;
   margin-right:80px;
  align-items: center;
`;

const Logo = styled.img`
  max-width: 100px;
  height: auto;
  padding: 1px;
  margin-right: -20px;
  margin-left: 4px;
  filter: ${({ scrolled }) => (scrolled ? '#fff' : 'invert(100%)')};
`;

const LogoText = styled.span`
  color: ${({ scrolled }) => (scrolled ? '#fff' : '#000')};
  font-size: 2.4rem;
  margin-left: 5px;
`;




const JoinButtonContainer = styled.div`
  position: relative;
`;

const UserEmail = styled.h5`
  color: ${({ scrolled }) => (scrolled ? 'white' : 'black')};
  font-weight: normal;
  margin-left: 10px;
`;

const JoinButton = styled.button`
  background: none;
  border: none;
  font-family: 'Anta';
  color: ${({ scrolled }) => (scrolled ? '#fff' : '#000')};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 20px;
`;

const DropdownArrow = styled.span`
 color: ${({ scrolled }) => (scrolled ? '#fff' : '#000')};
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

  return (
    <HeaderContainer scrolled={scrolled}>
      <HeaderContent>
        <LogoContainer to="/h">
          <Logo scrolled={scrolled} src="/Logo400x400.png" alt="SCOPAI" />
          <LogoText scrolled={scrolled}>SCOPAI</LogoText>
        </LogoContainer>
          <JoinButtonContainer>
            <JoinButton onClick={handleOptionsToggle}>
              <UserEmail scrolled={scrolled}>{user_email}</UserEmail>
              <DropdownArrow scrolled={scrolled}>▼</DropdownArrow>
              <Dropdown isOpen={showOptions}>
                <DropdownItemContainer>
                  <DropdownItem to="/profile">Manage Profile</DropdownItem>
                  <DropdownItem onClick={handleLogout}>Logout</DropdownItem>
                </DropdownItemContainer>
              </Dropdown>
            </JoinButton>
          </JoinButtonContainer>

      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
