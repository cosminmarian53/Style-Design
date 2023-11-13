import React from "react";

function Contact({ title, location, email, tel }) {
  return (
    <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
      <h6 className="text-uppercase mb-4 font-weight-bold">{title}</h6>
      <p>
        <i className="fas fa-home mr-3"></i> {location}
      </p>
      <p>
        <i className="fas fa-envelope mr-3"></i> {email}
      </p>
      <p>
        <i className="fas fa-phone mr-3"></i> {tel}
      </p>
    </div>
  );
}

export default Contact;
