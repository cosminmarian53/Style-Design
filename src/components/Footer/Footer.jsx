import Contact from "./Contact";
import Socials from "./Socials";
import About from "./About";
import CopyrightSD from "./CopyrightSD";
function Footer() {
  return (
    <>
      {/* <!-- Footer --> */}

      <footer
        className="text-center footer-info text-lg-start text-white"
        // style={{ backgroundImage: `url("/src/assets/background-footer.jpg")` }}
      >
        {/* <!-- Grid container --> */}

        <div className="container p-4 pb-0">
          {/* <!-- Section: Links --> */}

          <section className="">
            {/* <!--Grid row--> */}

            <div className="row">
              {/* <!-- About --> */}

              <About />

              {/* <!-- Contact --> */}
              <Contact
                title={"Contact"}
                location={"Targoviste, TG 10012, RO"}
                email={"info@gmail.com"}
                tel={"+40 721 796 093"}
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
