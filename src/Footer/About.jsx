import React from "react";
const infoText =
  "Style Design oferă mobilier elegant și contemporan, aducând un aer proaspăt și rafinat în casele tale. Cu o gamă variată de piese de înaltă calitate, magazinul nostru îmbină designul modern cu funcționalitatea practică pentru a satisface gusturile sofisticate ale clienților noștri.";
function About({ title, text }) {
  return (
    <>
      <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
        <h6 className="text-uppercase mb-4 font-weight-bold">{title}</h6>
        <p>{text}</p>
      </div>
    </>
  );
}

export default About;
export { infoText };
