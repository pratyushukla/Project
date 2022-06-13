import React from "react";
import {
  FaFacebook,
  FaGithub,
  FaInstagram,
  FaLinkedin,
  FaTwitter,
} from "react-icons/fa";

const Footer = () => {
  return (
    <footer
      className="p-5 text-white"
      style={{ backgroundColor: "rgba(0, 0, 0, 0.70)" }}
    >
      <div className="container">
        <div className="row">
          <div className="col-lg-4">
            <div>
              <h2>
                <em>
                  Online <br></br>Portfolio
                </em>
              </h2>
            </div>
          </div>
          <div className="col-lg-4 " style={{ fontSize: "30px" }}>
            <div className="col-lg-12 justify-content-around d-flex">
              <a
                href="https://github.com/ravi0818/OnlinePortfolioForJobRecommendation"
                target={"_blacnk"}
                className="text-decoration-none text-reset"
              >
                <FaGithub />
              </a>

              <a
                href=""
                target={"_blacnk"}
                className="text-decoration-none text-reset"
              >
                <FaLinkedin />
              </a>
              <a
                href=""
                target={"_blacnk"}
                className="text-decoration-none text-reset"
              >
                <FaFacebook />
              </a>
              <a
                href=""
                target={"_blacnk"}
                className="text-decoration-none text-reset"
              >
                <FaTwitter />
              </a>
              <a
                href=""
                target={"_blacnk"}
                className="text-decoration-none text-reset"
              >
                <FaInstagram />
              </a>
            </div>
            <div
              className="col-lg-12 justify-content-around d-flex mt-4"
              style={{ fontSize: "18px" }}
            >
              ©OnlinePortfolio: All rights reserved
            </div>
          </div>
          <div className="col-lg-4 justify-content-end d-flex">
            <div>
              <div>About Us</div>
              <div>Contact Us</div>
              <div>Careers</div>
              <div>Privacy Policy</div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
