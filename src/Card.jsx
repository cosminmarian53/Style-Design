import React from "react";

function Card(props) {
  return (
    <div
      className="col-12 col-md-6"
      style={{ height: "50vh", maxWidth: "100vw", padding: "0" }}
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
          style={props.color}
        ></div>
        <div className="card-img-overlay d-flex align-items-center justify-content-center">
          <h5
            style={{ fontSize: "4rem" }}
            className="card-title text-center text-white text-uppercase"
          >
            {props.title}
          </h5>
        </div>
      </div>
    </div>
  );
}

export default Card;
