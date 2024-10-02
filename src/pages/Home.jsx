import { useState } from "react";

import Navbar from "../components/Navbar";
import Card from "../components/Card";
import Footer from "../components/Footer/Footer";
import bedroom from "../assets/Produse/dormitor/Bedroom.jpg";
function Home() {
  // Dark Mode
  const [darkMode, setDarkMode] = useState(false);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };
  return (
    <>
      <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />
      <div className={`container-fluid fs-4 ${darkMode ? "dark-mode-bg" : ""}`}>
        <div className="row">
          <Card
            imgsrc="https://www.thespruce.com/thmb/Ba5hg_Dly4IrrInQ-XdKiGVAePo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fancy-bathroom-ideas-4325947-hero-4777bf14fe2b447b86a21e8a64194c29.jpg"
            title="Baie"
            slogan="Creează o Oază de Binecuvântare în Baia Ta cu Mobilierul Nostru Premium!"
            color={"rgba(245, 155, 145, 0.6)"}
          />
        </div>
        <div className="row">
          <Card
            imgsrc={bedroom}
            title="Dormitor"
            slogan="Adormi într-un vis de lux, trezește-te în realitatea rafinamentului!"
            color={"rgba(65, 150, 186, 0.43)"}
          />
        </div>
        <div className="row">
          <Card
            imgsrc="https://hips.hearstapps.com/hmg-prod/images/2-1673453547.jpg?crop=0.670xw:1.00xh;0.123xw,0&resize=1200:*"
            title="Bucătărie"
            slogan="Inovează în bucătărie cu mobilier care să reflecte pasiunea pentru gătit!"
            color={"rgba(65, 150, 186, 0.43)"}
          />
        </div>
        <div className="row">
          <Card
            imgsrc="https://www.thespruce.com/thmb/c1xl6ax-LRVnZwNPZSUR09SPlhg=/3000x0/filters:no_upscale():max_bytes(150000):strip_icc()/minimalist-living-room-ideas-5213203-hero-d27f8dcfa0b84706adbbd28ea0e1b48d.jpg"
            title="Living Room"
            slogan="Fă fiecare moment memorabil într-un living cu design de excepție!"
            color={"rgba(245, 155, 145, 0.6)"}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Home;
