import React from "react";
import Container from "./Container";
import { IoLogoLinkedin } from "react-icons/io";
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";

const Footer = () => {
  return (
    <div className="md:pb-[100px] pb-10">
      <Container className={`py-[30px] border-t border-[#E4E7EC] dark:border-[#282726]`}>
        <div className="flex  items-center justify-between">
          <div>
            <p className="font-inter text-[#5C5C5C] dark:text-[#8B8B8C] font-medium">
              AI Video Chat Platform
            </p>
          </div>

          <div className="flex items-center gap-4">
            <a  href="">
              < IoLogoLinkedin className="h-6 w-6 text-[#2F1186]" />
            </a>
            <a  href="">
              < FaTwitter className="h-6 w-6 text-[#505255] "  />
            </a>
            <a  href="">
              < FaInstagram  className="h-6 w-6 text-[#FFADAD]" />
            </a>
            <a  href="">
              < FaYoutube  className="h-6 w-6 text-[#CE1E27]" />
            </a>
            <a  href="">
              < FaFacebook className="h-6 w-6 text-[#1752B8]"  />
            </a>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default Footer;
