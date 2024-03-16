import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { NavLink, useNavigate } from 'react-router-dom';

const HeaderContainer = styled.header`
  position: fixed;
  max-width:1400px;
  width: 100%;
  background-color: ${({ scrolled }) => (scrolled ? '#0C2D48' : 'transparent')};
  transition: background-color 0.3s;
  z-index: 1000;
  font-family: 'poppins', sans-serif;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const HeaderContent = styled.div`

  display: flex;
  justify-content: space-evenly;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const Logo = styled.img`
  max-width: 100px;
`;

const LogoText = styled.span`
  color: ${({ textColor }) => textColor || '#fff'};
  font-size: 1.6rem;
  margin-left:-10px;
  font-family: 'poppins', sans-serif;
  font-weight: bold;
`;

const Navigation = styled.nav`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  flex-grow: 1;
`;

const NavigationLink = styled(NavLink)`
  color: ${({ textColor }) => textColor || '#0C2D48'};
  text-decoration: none;
  margin: 0 -50px; /* Adjusted margin */
  font-size: 1.1 rem;
  transition: color 0.3s;

  &:hover {
    color: #61dafb;
  }
`;

const JoinButtonContainer = styled.div`
  position: relative;
`;

const JoinButton = styled.button`
  background: none;
  border: none;
  color: ${({ textColor }) => textColor || '#fff'};
  font-weight: 600;
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  border-radius: 20px;

  &:hover {
    color: #61dafb;
  }
`;

const DropdownArrow = styled.span`
  margin-left: 5px;
`;

const Dropdown = styled.div`
  position: absolute;
  top: 100%;
  left: 0;
  background-color: #242424;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  display: ${({ isOpen }) => (isOpen ? 'flex' : 'none')};
  flex-direction: column;
  padding: 10px;
  z-index: 1;
  text-align: center;
`;

const DropdownItem = styled(NavLink)`
  color: #fff;
  text-decoration: none;
  font-size: 1rem;
  margin: 5px 0;
`;



const Header = () => {
  const [scrolled, setScrolled] = useState(false);
  const [textColor, setTextColor] = useState('#fff');
  const [showOptions, setShowOptions] = useState(false);
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 0);
    };
    if(!localStorage.getItem("user")){
      navigate("/login")
    }
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [navigate]);

  useEffect(() => {
    if(!localStorage.getItem("user") && login){
      navigate("/login")
    }
    const updateTextColor = () => {
      const bodyStyles = getComputedStyle(document.body);
      const backgroundColor = bodyStyles.backgroundColor;

      const rgbValues = backgroundColor.match(/\d+/g);
      if (rgbValues) {
        const [r, g, b] = rgbValues.map(Number);

        const luminance = (0.299 * r + 0.587 * g + 0.114 * b) / 255;

        setTextColor(luminance > 0.5 ? '#000' : '#fff');
      }
    };

    updateTextColor();
    window.addEventListener('resize', updateTextColor);

    return () => {
      window.removeEventListener('resize', updateTextColor);
    };
  }, [navigate]);

  const handleOptionsToggle = (status) => {
    setShowOptions(status);
  };
  const handleLogout= () => {
    localStorage.clear();
    // navigate("/login");
    setLogin(true)
  }

  return (
    <HeaderContainer scrolled={scrolled}>
      <HeaderContent>
        <Logo src="/Logo400x400.png" alt="SCOPAI" />
        <LogoText textColor={textColor}>SCOPAI</LogoText>
        <Navigation>
          <NavigationLink to="/home" textColor={textColor}>
            Home
          </NavigationLink>
          <NavigationLink to="/home#features" textColor={textColor}>
            Features
          </NavigationLink>
          <NavigationLink to="/home#services" textColor={textColor}>
            Services
          </NavigationLink>
          <NavigationLink to="/home#pricingpage" textColor={textColor}>
            Pricing
          </NavigationLink>
          <NavigationLink to="/home#about" textColor={textColor}>
            About
          </NavigationLink>
        </Navigation>
        <JoinButtonContainer
          onMouseEnter={() => handleOptionsToggle(true)}
          onMouseLeave={() => handleOptionsToggle(false)}
        >
          <JoinButton textColor={textColor}>
            Join <DropdownArrow>▼</DropdownArrow>
             {showOptions && (
            <Dropdown
              isOpen={showOptions}
              onMouseEnter={() => handleOptionsToggle(true)}
              onMouseLeave={() => handleOptionsToggle(false)}
            >
              <DropdownItem onClick={()=> handleLogout()}>Logout</DropdownItem>
              <DropdownItem to="/register">Signup</DropdownItem>
            </Dropdown>
          )}
          </JoinButton>

        </JoinButtonContainer>
      </HeaderContent>
    </HeaderContainer>
  );
};

export default Header;
