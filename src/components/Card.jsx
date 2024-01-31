import { useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";

function Card(props) {
  // Button visibility state
  const [isButtonVisible, setButtonVisibility] = useState(false);

  const handleMouseEnter = () => {
    setButtonVisibility(true);
  };

  const handleMouseLeave = () => {
    setButtonVisibility(false);
  };

  // Animation: fade-in-on-scroll
  const [ref, inView] = useInView({
    triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes in view
  });

  const animation = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(55px)",
    config: { duration: 200 },
    transition: "opacity 1.2s ease-in-out, transform 1.2s ease-in-out",
    padding: "0",
  });

  // Card component
  return (
    // Fade-in-on-scroll animation-wrapped around the card
    <animated.div ref={ref} style={animation}>
      <div
        className="col-12 col-md-12"
        style={{ height: "100vh", padding: "0" }}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Image for the card */}
        <div className="card h-100 w-100 position-relative">
          <img
            src={props.imgsrc}
            className="card-img h-100 w-100"
            alt="background-image"
            style={{ objectFit: "cover" }}
          />
          <div
            className="position-absolute h-100 w-100"
            style={{
              backgroundColor: props.color,
              opacity: isButtonVisible ? 1 : 0,
              transition: "1.5s",
            }}
          ></div>
          {/* Card content */}
          <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
            {/* Header */}
            <h5
              style={{
                fontSize: "4rem",
                transition:
                  "opacity 0.8s ease-in-out, transform 1.3s ease-in-out",
                transitionDelay: "0.2s", // Add delay here
                opacity: isButtonVisible ? 1 : 0,
                transform: isButtonVisible
                  ? "translateY(-25px)"
                  : "translateY(0)",
                fontFamily: "Bebas Neue",
                letterSpacing: "0.3rem",
              }}
              className="card-title text-center text-white text-uppercase mb-4"
            >
              {props.title}
            </h5>
            <div className="card-container container-fluid">
              <div className="row">
                <div className="col-12 col-md-12">
                  {/* Text */}
                  <p
                    style={{
                      transition:
                        "opacity 0.8s ease-in-out, transform 1.5s ease-in-out",
                      transitionDelay: "0.4s", // Add delay here
                      opacity: isButtonVisible ? 1 : 0,
                      transform: isButtonVisible
                        ? "translateY(-25px)"
                        : "translateY(0)",
                      fontFamily: "Bebas Neue",
                      letterSpacing: "0.3rem",
                    }}
                    className="card-text text-center text-white text-uppercase mb-4"
                  >
                    {props.slogan}
                  </p>
                  {/* Thematic break-line */}
                  <hr
                    className="line-card"
                    style={{
                      transition:
                        "opacity 0.8s ease-in-out, transform 1.6s ease-in-out",
                      transitionDelay: "0.6s", // Add delay here
                      opacity: isButtonVisible ? 1 : 0,
                      transform: isButtonVisible
                        ? "translateY(-25px)"
                        : "translateY(0)",
                    }}
                  />
                </div>
              </div>
            </div>
            {/* Button */}
            {isButtonVisible && (
              <a
                href="#"
                className="btn btn-card"
                style={{
                  transition:
                    "opacity 1s ease-in-out, transform 1s ease-in-out",
                  transitionDelay: "0.8s", // Add delay here
                  opacity: isButtonVisible ? 1 : 0,
                }}
              >
                Explorează <LaunchIcon />
              </a>
            )}
          </div>
        </div>
      </div>
    </animated.div>
  );
}

export default Card;
