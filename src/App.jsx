import React from "react";
import Navbar from "./Navbar";
import Card from "./Card";
import Footer from "./Footer";
function App() {
  return (
    <>
      <Navbar />
      <div className="container-fluid">
        <div className="row">
          <Card
            imgsrc="https://www.thespruce.com/thmb/Ba5hg_Dly4IrrInQ-XdKiGVAePo=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/fancy-bathroom-ideas-4325947-hero-4777bf14fe2b447b86a21e8a64194c29.jpg"
            title="Baie"
            color={"rgba(245, 155, 145, 0.6)"}
          />
          <Card
            imgsrc="https://www.decorilla.com/online-decorating/wp-content/uploads/2022/12/Luxurious-bedrooms-luxury-bedroom-design.jpg"
            title="Dormitor"
            color={"rgba(65, 150, 186, 0.43)"}
          />
        </div>
        <div className="row">
          <Card
            imgsrc="https://hips.hearstapps.com/hmg-prod/images/2-1673453547.jpg?crop=0.670xw:1.00xh;0.123xw,0&resize=1200:*"
            title="Bucatarie"
            color={"rgba(65, 150, 186, 0.43)"}
          />
          <Card
            imgsrc="https://www.thespruce.com/thmb/c1xl6ax-LRVnZwNPZSUR09SPlhg=/3000x0/filters:no_upscale():max_bytes(150000):strip_icc()/minimalist-living-room-ideas-5213203-hero-d27f8dcfa0b84706adbbd28ea0e1b48d.jpg"
            title="Living Room"
            color={"rgba(245, 155, 145, 0.6)"}
          />
        </div>
      </div>
      <Footer />
    </>
  );
}

export default App;
