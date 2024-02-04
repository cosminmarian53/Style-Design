import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import "/public/css/main.css";
const Products = () => {
  return (
    <>
      <div className="m-0">
        <Navbar />
        <div className="products">
          <h1 className="lg-title">mobilier de înaltă calitate</h1>
        </div>

        <div className="product-collection">
          <div className="container">
            <div className="product-collection-wrapper">
              {/* <!-- product col left --> */}
              <div className="product-col-left flex">
                <div className="product-col-content">
                  <h2 className="sm-title">men's shoes </h2>
                  <h2 className="md-title">men's collection </h2>
                  <p className="text-light">
                    Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                    Molestiae consequatur facilis eligendi quibusdam
                    voluptatibus exercitationem autem voluptatum, beatae
                    architecto odit, quisquam repellat. Deleniti, architecto ab.
                  </p>
                  <button type="button" className="btn-dark">
                    Shop now
                  </button>
                </div>
              </div>

              {/* <!-- product col right --> */}
              <div className="product-col-right">
                <div className="product-col-r-top flex">
                  <div className="product-col-content">
                    <h2 className="sm-title">women's dresses </h2>
                    <h2 className="md-title">women's collection </h2>
                    <p className="text-light">
                      Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                      Molestiae consequatur facilis eligendi quibusdam
                      voluptatibus exercitationem autem voluptatum, beatae
                      architecto odit, quisquam repellat. Deleniti, architecto
                      ab.
                    </p>
                    <button type="button" className="btn-dark">
                      Shop now
                    </button>
                  </div>
                </div>

                <div className="product-col-r-bottom">
                  {/* <!-- left --> */}
                  <div className="flex">
                    <div className="product-col-content">
                      <h2 className="sm-title">summer sale </h2>
                      <h2 className="md-title">Extra 50% Off </h2>
                      <p className="text-light">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Molestiae consequatur facilis eligendi quibusdam
                        voluptatibus exercitationem autem voluptatum, beatae
                        architecto odit, quisquam repellat. Deleniti, architecto
                        ab.
                      </p>
                      <button type="button" className="btn-dark">
                        Shop now
                      </button>
                    </div>
                  </div>
                  {/* <!-- right --> */}
                  <div className="flex">
                    <div className="product-col-content">
                      <h2 className="sm-title">shoes </h2>
                      <h2 className="md-title">best sellers </h2>
                      <p className="text-light">
                        Lorem ipsum dolor sit, amet consectetur adipisicing
                        elit. Molestiae consequatur facilis eligendi quibusdam
                        voluptatibus exercitationem autem voluptatum, beatae
                        architecto odit, quisquam repellat. Deleniti, architecto
                        ab.
                      </p>
                      <button type="button" className="btn-dark">
                        Shop now
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Products;
