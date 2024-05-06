import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import { IoIosArrowUp } from "react-icons/io";

const FooterWrapper = styled.footer`
  background-color: white;
  padding: 30px 10px 100px;
  display: flex;
  position: relative;
  justify-content: space-between;
  font-family: "Anta";
  flex-wrap: wrap;
  transition: background-color 0.3s; /* Adding transition effect */
`;

const FooterColumn = styled.div`
  width: 20%;
  color: #fff;
  margin-bottom: 20px;

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const FooterColumnL = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%;
  color: #000;
  margin-bottom: 60px;

  @media (max-width: 768px) {
    width: 50%;
  }

  @media (max-width: 480px) {
    width: 100%;
  }
`;

const FooterLogo = styled.img`
  max-width: 140px;
  filter:invert(100%);
  height: auto;
  margin-left: -25px;
  margin-right: 25px;
`;

const FooterLink = styled.a`
  display: block;
  text-decoration: none;
  color: #000;
  font-size: 14px;
  transition: color 0.2s ease-in-out; /* Adding transition effect */
  margin-bottom: 10px;

  &:hover {
    color: #ccc;
  }

  ${({ responsive }) =>
    responsive &&
    css`
      @media (max-width: 768px) {
        font-size: 12px;
      }

      @media (max-width: 480px) {
        font-size: 10px;
      }
    `}
`;

const FooterHeading = styled.h3`
  margin-bottom: 10px;
  margin-top:10px;
  font-weight: bold;
  font-size: 18px;
`;

const FooterHeadingB = styled.h4`
  font-weight: bold;
  font-size: 40px;
  margin-left: 90px;
  margin-right: -90px;
  margin-top:-90px;
  margin-bottom:90px;

  @media (max-width: 768px) {
    font-size: 24px;
    margin-left: 0;
    margin-top: 0;
  }
`;

const FooterDivider = styled.hr`
  border-top: 2px solid black;
  width: 100%;
  margin-top: 80px; /* Adjust the top margin to move it down */
  margin-bottom: -80px;
`;

const FooterSocialLinks = styled.div`
  display: flex;
  align-items: center;
`;

const SocialLink = styled.a`
  font-size: 20px;
  margin-right: 10px;
  color: #000;
  transition: color 0.2s ease-in-out;

  &:hover {
    color: #ccc;
  }
`;
const FooterCopyright = styled.div`
  margin-top: 90px; /* Adjust the top margin to move it down */
  margin-bottom: -90px; /* Adjust the bottom margin to compensate for the top margin */
  text-align: center;
  font-size: 13px;
  color: #000;
  width: 100%;
`;

const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #000;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
  transition: opacity 0.3s; /* Adding transition effect */

  &:hover {
    background-color: #0056b3;
  }
`;

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    const scrollTop =
      window.pageYOffset || document.documentElement.scrollTop;
    setShowScrollButton(scrollTop > window.innerHeight);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <FooterWrapper>
      <FooterColumnL>
        <>
          <FooterLogo src="/Logo.png" alt="SCOPAI logo" />
          <FooterHeadingB>SCOPAI</FooterHeadingB>
        </>
      </FooterColumnL>
      <FooterColumn>
        <FooterHeading>Company</FooterHeading>
        <FooterLink href="/h#about" responsive>About Us</FooterLink>
        <FooterLink href="/blog" responsive>Blog</FooterLink>
        <FooterLink href="/h#pricingpage" responsive>Pricing</FooterLink>
      </FooterColumn>
      <FooterColumn>
        <FooterHeading>Resources</FooterHeading>
        <FooterLink
          href="https://medium.com/coinmonks/smart-contract-optimization-part-1-understanding-the-basics-f74b78801287"
          responsive
        >
          Smart Contract Optimizations
        </FooterLink>
        <FooterLink href="https://www.gptechblog.com/" responsive>
          GenerativeAI
        </FooterLink>
      </FooterColumn>
      <FooterColumn>
        <FooterHeading>Try SCOPAI</FooterHeading>
        <FooterLink href="/register" responsive>Get Started</FooterLink>
        <FooterLink href="/advertise" responsive>Place Advertisement</FooterLink>
        <FooterLink href="/h#features" responsive>Features</FooterLink>
      </FooterColumn>
      <FooterDivider />
      <FooterSocialLinks>
        <SocialLink href="#" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-facebook-f"></i>
        </SocialLink>
        <SocialLink href="#" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-twitter"></i>
        </SocialLink>
        <SocialLink href="#" target="_blank" rel="noopener noreferrer">
          <i className="fab fa-instagram"></i>
        </SocialLink>
      </FooterSocialLinks>
      <FooterCopyright>
        Copyright &copy; {new Date().getFullYear()} SCOPAI. All Rights Reserved.
      </FooterCopyright>
      <ScrollToTopButton isVisible={showScrollButton} onClick={scrollToTop}>
        <IoIosArrowUp />
      </ScrollToTopButton>
    </FooterWrapper>
  );
};

export default Footer;
