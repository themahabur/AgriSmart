import React from "react";
import FooterTop from "./FooterTop";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
    <footer className="border-t border-gray-300">
      <FooterTop />
      <FooterBottom/>
    </footer>
  );
};

export default Footer;
