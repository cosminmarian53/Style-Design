import React from "react";
import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
function Footer() {
  const year = new Date().getFullYear();
  return (
    <>
      {/* <!-- Footer --> */}
      <footer
        className="bg-secondary text-center text-lg-start text-white"
        style={{ backgroundColor: "#db6930" }}
      >
        {/* <!-- Grid container --> */}
        <div className="container p-4 pb-0">
          {/* <!-- Section: Links --> */}
          <section className="">
            {/* <!--Grid row--> */}
            <div className="row">
              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  STYLE Design
                </h6>
                <p>
                  Style Design oferă mobilier elegant și contemporan, aducând un
                  aer proaspăt și rafinat în casele tale. Cu o gamă variată de
                  piese de înaltă calitate, magazinul nostru îmbină designul
                  modern cu funcționalitatea practică pentru a satisface
                  gusturile sofisticate ale clienților noștri.
                </p>
              </div>
              {/* <!-- Grid column --> */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Contact
                </h6>
                <p>
                  <i className="fas fa-home mr-3"></i> Targoviste, TG 10012, RO
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i> info@gmail.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> + 407 234 567 88
                </p>
                <p>
                  <i className="fas fa-print mr-3"></i> + 407 234 567 89
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Follow us
                </h6>
                {/* <!-- Facebook --> */}
                <div className="d-flex justify-content-center">
                  <a href="#" className="btn">
                    <FacebookIcon fontSize="large" />
                  </a>

                  {/* <!-- Instagram --> */}
                  <a href="#" className="btn">
                    <InstagramIcon fontSize="large" />
                  </a>

                  {/* <!-- Linkedin --> */}
                  <a href="#" className="btn">
                    <LinkedInIcon fontSize="large" />
                  </a>
                </div>
              </div>
            </div>
            {/* <!--Grid row--> */}
          </section>
          {/* <!-- Section: Links --> */}
        </div>
        {/* <!-- Grid container --> */}

        {/* <!-- Copyright --> */}
        <div
          className="text-center p-3"
          style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
        >
          © {year} Copyright:
          <a className="text-white" href="https://styledesign.ro/">
            styledesign.ro
          </a>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
      {/* <!-- Footer --> */}
    </>
  );
}
export default Footer;
