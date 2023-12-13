import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { IoIosArrowUp } from "react-icons/io";
import { Inter } from "@fontsource/inter";

const FooterWrapper = styled.footer`
  background-color: #000; /* Black background */
  padding: 30px 10px 100px; /* Adjusted padding for better spacing */
  display: flex;
  position:relative;
  justify-content: space-between;
  font-family: "Inter", sans-serif;
  flex-wrap: wrap; /* Allow columns to wrap to the next row on smaller screens */
`;

const FooterColumn = styled.div`

  width: 20%;
  color: #fff; /* White text color on black background */
  margin-bottom: 20px; /* Add margin between columns */
`;

const FooterColumnL = styled.div`
  display: flex;
  flex-direction: column;
  width: 20%; /* Set width to 20% for consistency */
  color: #fff; /* White text color on black background */
 margin-bottom: 60px; /* Add margin between columns */
`;

const FooterLogo = styled.img`
  max-width: 140px;
  height: auto;
`;

const FooterLink = styled.a`
  display: block;
  text-decoration: none;
  color: #fff; /* White text color on black background */
  font-size: 14px;
  transition: 0.2s ease-in-out;
  margin-bottom: 10px;

  &:hover {
    color: #ccc; /* Lighter color on hover if needed */
  }
`;

const FooterHeading = styled.h3`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 18px;
`;

const FooterHeadingB = styled.h4`
  font-weight: bold;
  font-size: 30px;
  margin-left:130px;
  margin-top:-90px;
`;

const FooterDivider = styled.hr`
  border-top: 1px solid #777; /* Darker color for divider */
  width: 100%;

`;

const FooterCopyright = styled.div`
margin-bottom:20px;
  text-align: center;
  font-size: 13px;
  color: #ccc; /* Lighter color for copyright text */
  width: 100%;
`;
const ScrollToTopButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  border-radius: 50%;
  padding: 10px;
  font-size: 18px;
  cursor: pointer;
  display: ${({ isVisible }) => (isVisible ? "block" : "none")};
`;

const Footer = () => {
  const [showScrollButton, setShowScrollButton] = useState(false);

  const handleScroll = () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
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
        <FooterLink href="/home#about">About Us</FooterLink>
        <FooterLink href="/blog">Blog</FooterLink>
        <FooterLink href="/home#pricingpage">Pricing</FooterLink>
      </FooterColumn>
      <FooterColumn>
        <FooterHeading>Resources</FooterHeading>
        <FooterLink href="https://medium.com/coinmonks/smart-contract-optimization-part-1-understanding-the-basics-f74b78801287">Smart Contract Optimizations</FooterLink>
        <FooterLink href="https://www.gptechblog.com/">GenerativeAI</FooterLink>
      </FooterColumn>
      <FooterColumn>
        <FooterHeading>Try SCOPAI</FooterHeading>
        <FooterLink href="/register">Get Started</FooterLink>
        <FooterLink href="/register">Place Advertisement</FooterLink>
        <FooterLink href="/home#features">Features</FooterLink>
      </FooterColumn>
      <FooterDivider />
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
