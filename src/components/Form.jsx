import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";
import backgroundImageForm from "../assets/background-products-form.jpg";

const Form = () => {
  // Function to send the form data to WhatsApp
  function sendwhatsapp(e) {
    e.preventDefault();
    var phonenumber = "+4074887694554455";

    var firstName = document.querySelector("#name").value;
    var lastName = document.querySelector("#lastname").value;
    var location = document.querySelector("#location").value;
    var email = document.querySelector("#email").value;
    var coffeeType = document.querySelector("#coffeeType").value;
    var roast = document.querySelector("#roast").value;
    var textarea = document.querySelector("#textarea").value;

    if (
      !firstName ||
      !lastName ||
      !location ||
      !email ||
      !coffeeType ||
      !roast ||
      !textarea
    ) {
      alert("Please fill in all fields!");
      return;
    }

    var url =
      "https://wa.me/" +
      phonenumber +
      "?text=" +
      "*First Name:* " +
      firstName +
      "%0a" +
      "*Last Name:* " +
      lastName +
      "%0a" +
      "*Location:* " +
      location +
      "%0a" +
      "*Email:* " +
      email +
      "%0a" +
      "*Coffee Type:* " +
      coffeeType +
      "%0a" +
      "*Roast Level:* " +
      roast +
      "%0a" +
      "*Additional Notes:* " +
      textarea +
      "%0a%0a";
    window.open(url, "_blank").focus();
  }

  // Animation: fade-in-on-scroll
  const [ref, inView] = useInView({
    triggerOnce: true,
  });

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(55px)",
    delay: 50,
    config: { duration: 200 },
    transition: "opacity 1.2s ease-in-out, transform 1.2s ease-in-out",
    padding: "0",
  });

  const animation1 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(55px)",
    delay: 100,
    config: { duration: 200 },
    transition: "opacity 1.2s ease-in-out, transform 1.2s ease-in-out",
    padding: "0",
  });

  return (
    <>
      <animated.div style={animation} ref={ref}>
        <div
          className="container-fluid form-products"
          style={{
            backgroundImage: `url(${backgroundImageForm})`,
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div className="row form-wrapper">
            <div className="col-md-12 col-sm-12 form-content-wrapper">
              <animated.div style={animation1} ref={ref}>
                <form
                  className="form-contents"
                  style={{ fontFamily: "Orbitron, sans-serif" }}
                >
                  <h2
                    className="md-title text-center"
                    style={{
                      fontFamily: "Orbitron, sans-serif",
                      fontWeight: "bold",
                    }}
                  >
                    Ready for a taste of Aztek Coffee?
                    <br />
                    Place your order now!
                  </h2>
                  <div className="form-group pb-2">
                    <label htmlFor="name">First Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="name"
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="form-group pb-2">
                    <label htmlFor="lastname">Last Name</label>
                    <input
                      type="text"
                      className="form-control"
                      id="lastname"
                      placeholder="Enter your last name"
                    />
                  </div>
                  <div className="form-group pb-2">
                    <label htmlFor="location">Location</label>
                    <input
                      type="text"
                      className="form-control"
                      id="location"
                      placeholder="Enter your location"
                    />
                  </div>
                  <div className="form-group pb-2">
                    <label htmlFor="email">Email Address</label>
                    <input
                      type="email"
                      className="form-control"
                      id="email"
                      placeholder="Enter your email address"
                    />
                  </div>
                  <div className="form-group pb-2">
                    <label htmlFor="coffeeType">Select Coffee Type</label>
                    <select className="form-control" id="coffeeType">
                      <option>Arabica</option>
                      <option>Espresso</option>
                      <option>Blend Aztek</option>
                      <option>Cappuccino</option>
                    </select>
                  </div>
                  <div className="form-group pb-2">
                    <label htmlFor="roast">Roast Level</label>
                    <select className="form-control" id="roast">
                      <option>Light Roast</option>
                      <option>Medium Roast</option>
                      <option>Dark Roast</option>
                    </select>
                  </div>
                  <div className="form-group pb-3">
                    <label htmlFor="textarea">Additional Specifications</label>
                    <textarea
                      className="form-control"
                      id="textarea"
                      rows="3"
                      placeholder="If you have any special requests, let us know!"
                    ></textarea>
                  </div>
                  <div className="form-group d-flex justify-content-center">
                    <button
                      type="submit"
                      onClick={sendwhatsapp}
                      className="btn btn-warning"
                    >
                      Submit Order
                    </button>
                  </div>
                </form>
              </animated.div>
            </div>
          </div>
        </div>
      </animated.div>
    </>
  );
};

export default Form;
