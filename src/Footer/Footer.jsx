import React from "react";
import Contact from "./Contact";
import Socials from "./Socials";
import About, { infoText } from "./About";
import CopyrightSD from "./CopyrightSD";
function Footer() {
  return (
    <>
      {/* <!-- Footer --> */}

      <footer
        className="text-center text-lg-start text-white"
        style={{ backgroundColor: "#4563c9" }}
      >
        {/* <!-- Grid container --> */}

        <div className="container p-4 pb-0">
          {/* <!-- Section: Links --> */}

          <section className="">
            {/* <!--Grid row--> */}

            <div className="row">
              {/* <!-- About --> */}

              <About title={"Style Design"} text={infoText} />

              {/* <!-- Contact --> */}
              <Contact
                title={"Contact"}
                location={"Targoviste, TG 10012, RO"}
                email={"info@gmail.com"}
                tel={"+ 407 234 567 88"}
              />
              {/* <!-- Contact --> */}

              {/* <!-- Socials --> */}
              <Socials />
            </div>
            {/* <!--Socials--> */}
          </section>
          {/* <!-- Section: Links --> */}
        </div>
        {/* <!-- Grid container --> */}

        {/* <!-- Copyright --> */}
        <CopyrightSD />
        {/* <!-- Copyright --> */}
      </footer>
      {/* <!-- Footer --> */}
    </>
  );
}
export default Footer;
