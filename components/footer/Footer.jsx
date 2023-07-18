"use client";
import React from "react";
import { BsInstagram, BsLinkedin, BsGithub } from "react-icons/bs";

import "./footer.css";

const Footer = () => {
  return (
    <div className="footer-container">
      {/* <p>{new Date().getFullYear}©Urban Junction All Rights reserved</p> */}
      <p>
        {new Date().getFullYear()}© Made with ❤️ by{" "}
        <span>Saurabh</span>!
      </p>
      <p className="icons">
        <a href="https://www.linkedin.com/in/saurabhkumarrai/" target="_blank">
          <BsLinkedin />
        </a>
        <a href="https://github.com/srai86825" target="_blank">
          <BsGithub />
        </a>
        <a href="https://www.instagram.com/unknown_saurabh/" target="_blank">
          <BsInstagram />
        </a>
      </p>
    </div>
  );
};

export default Footer;
