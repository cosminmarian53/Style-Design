import React, { useState } from "react";
import LaunchIcon from "@mui/icons-material/Launch";
function Card(props) {
  const [isButtonVisible, setButtonVisibility] = useState(false);

  const handleMouseEnter = () => {
    setButtonVisibility(true);
  };

  const handleMouseLeave = () => {
    setButtonVisibility(false);
  };

  return (
    <div
      className="col-12 col-md-6"
      style={{ height: "50vh", maxWidth: "100vw", padding: "0" }}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
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
            opacity: isButtonVisible ? 1 : 0.3,
            transition: "1s",
          }}
        ></div>
        <div className="card-img-overlay d-flex flex-column align-items-center justify-content-center">
          <h5
            style={{
              fontSize: "4rem",
              transition: "opacity 0.8s ease-in-out, transform 1.5s ease-in-out",
              opacity: isButtonVisible ? 1 : 0,
              transform: isButtonVisible
                ? "translateY(10px)"
                : "translateY(-10px)",
            }}
            className="card-title text-center text-white text-uppercase mb-4"
          >
            {props.title}
          </h5>
          {isButtonVisible && (
            <a
              href="#"
              className="btn btn-light"
              style={{
                transition: "opacity 1s ease-in-out, transform 1s ease-in-out",
                opacity: isButtonVisible ? 1 : 0,
                transform: isButtonVisible
                  ? "translateY(0)"
                  : "translateY(-10px)",
              }}
            >
              Deschide <LaunchIcon />
            </a>
          )}
        </div>
      </div>
    </div>
  );
}

export default Card;
