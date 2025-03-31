import { useState } from "react";

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer/Footer";
import image1 from "../assets/imag1.jpg";
function Home() {
  // Dark Mode
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className={`container-fluid m-0 ${darkMode ? "dark-mode-bg" : ""}`}>
        <div className="row">
          <Card
            imgsrc={image1}
            title="Aztek Origins"
            slogan="Discover the ancient roots of bold flavor."
            color={"rgba(0, 0, 0, 0.5)"}
          />
        </div>
        <div className="row">
          <Card
            imgsrc="https://m.media-amazon.com/images/I/61pJB6W+C1L.jpg"
            title="Roast"
            slogan="Masterfully roasted for a taste that awakens legends."
            color={"rgba(0, 0, 0, 0.5)"}
          />
        </div>
        <div className="row">
          <Card
            imgsrc="https://cdn.prod.website-files.com/60414b21f1ffcdbb0d5ad688/66181abf2dbc25ec0de5b763_nathan-dumlao-gOn7dKcCWKg-unsplash.jpg"
            title="Blend"
            slogan="A harmonious blend of tradition and modern craft."
            color={"rgba(0, 0, 0, 0.5)"}
          />
        </div>
        <div className="row">
          <Card
            imgsrc="https://www.themissingbean.co.uk/cdn/shop/files/organic-coffee-beans.jpg?v=1690550801&width=3840"
            title="Essence"
            slogan="Capture the essence of Aztek in every cup."
            color={"rgba(0, 0, 0, 0.5)"}
          />
        </div>
      </div>

      <Footer />
    </>
  );
}

export default Home;
