function About({ title, text }) {
  return (
    <>
      <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
        <h2
          className="text-uppercase mb-4 font-weight-bold text-center"
          style={{ letterSpacing: "0.2rem" }}
        >
          <a href="#" className="text-white">
            <span>
              <b>STYLE</b>
            </span>{" "}
            DESIGN
          </a>
        </h2>
        <hr></hr>
        <p className="text-center">Where Quality Meets Craftsmanship</p>
      </div>
    </>
  );
}

export default About;
