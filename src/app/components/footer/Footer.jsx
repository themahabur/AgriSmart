import React from "react";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
    <footer className="bg-white shadow-inner text-gray-800">
      <FooterTop />
      <FooterBottom/>
    </footer>
  );
};

export default Footer;
