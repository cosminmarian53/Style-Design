import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Socials() {
  return (
    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
      <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>
      <div className="d-flex justify-content-center">
        <a href="#" className="btn">
          <FacebookIcon fontSize="large" />
        </a>
        <a href="#" className="btn">
          <InstagramIcon fontSize="large" />
        </a>
        <a href="#" className="btn">
          <LinkedInIcon fontSize="large" />
        </a>
      </div>
    </div>
  );
}

export default Socials;