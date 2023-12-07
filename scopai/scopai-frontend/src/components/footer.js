import React from "react";
import styled from "styled-components";
import { Inter } from "@fontsource/inter";

const FooterWrapper = styled.footer`
  background-color: #000000;
  width: 100%;
  padding: 80px 20px 40px;
  position:relative;
  display: flex;
  justify-content: space-between;
  font-family: "Inter", sans-serif;
  flex-wrap: wrap; /* Allow columns to wrap to the next row on smaller screens */
`;

const FooterColumn = styled.div`
  width: 20%;
  color: #fff;
  margin-bottom: 20px; /* Add margin between columns */
`;

const FooterColumnL = styled.div`
  display: flex;
  flex-direction: column;
  width: 7%;
  color: #fff;
  margin-bottom: 20px; /* Add margin between columns */
`;
const FooterLogo = styled.img`
  max-width: 150px;
  height: auto;
`;

const FooterLink = styled.a`
  display: block;
  text-decoration: none;
  color: #fff;
  font-size: 14px;
  transition: 0.2s ease-in-out;
  margin-bottom: 10px;

  &:hover {
    color: #f0f0f0;
  }
`;

const FooterHeading = styled.h3`
  margin-bottom: 10px;
  font-weight: bold;
  font-size: 16px;
`;

const FooterHeadingB = styled.h4`
   position: relative;
  left: 100px; /* Adjust this value to move the text above */
  bottom: 120px; /* Adjust this value to move the text to the right */
  font-weight: bold;
  font-size: 30px;
`;

const FooterDivider = styled.hr`
  border-top: 1px solid #ddd;
  width: 100%; /* Adjusted width to 100% */
  position: absolute;
  bottom: 50px;
  left: 0;
  right: 0;
  margin: 0;
`;

const FooterCopyright = styled.div`
position:absolute;
  text-align: center;
  font-size: 15px;
  color: #777777;
  width: 100%;
  left: 0;
  bottom:10px;
  right: 0;
`;

const Footer = () => {
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
        <FooterLink href="/aboutus">About Us</FooterLink>
        <FooterLink href="/blog">Blog</FooterLink>
        <FooterLink href="/pricing_and_subscription">Pricing</FooterLink>
        <FooterLink href="/contactus">Contact Us</FooterLink>
      </FooterColumn>
      <FooterColumn>
        <FooterHeading>Resources</FooterHeading>
        <FooterLink href="/resources/smart_contract_optimization">Smart Contract Optimizations</FooterLink>
        <FooterLink href="/resources/generativeAI">GenerativeAI</FooterLink>
      </FooterColumn>
      <FooterColumn>
        <FooterHeading>Try SCOPAI</FooterHeading>
        <FooterLink href="/login">Get Started</FooterLink>
        <FooterLink href="/place_advertisement">Place Advertisement</FooterLink>
        <FooterLink href="/features">Features</FooterLink>
      </FooterColumn>
      <FooterDivider />
      <FooterColumn style={{ width: "100%" }}>
        <FooterCopyright>
          Copyright &copy; {new Date().getFullYear()} SCOPAI. All Rights Reserved.
        </FooterCopyright>
      </FooterColumn>
    </FooterWrapper>
  );
};

export default Footer;
