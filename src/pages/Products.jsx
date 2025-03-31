import { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import Form from "../components/Form";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";
import "/public/css/main.css";
// Coffee images from provided links
const coffee1 =
  "https://i.pinimg.com/736x/6c/1e/35/6c1e35d59732b51edb484f5810651023.jpg";
const coffee2 =
  "https://i.pinimg.com/736x/2e/8d/0c/2e8d0c4137ae14bfa403157cfdd4a91f.jpg";
const coffee3 =
  "https://i.pinimg.com/736x/28/92/ac/2892ac7e2fc178da7232e1f695bee61d.jpg";

const Products = () => {
  const [darkMode, setDarkMode] = useState(true);
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

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
  const animation2 = useSpring({
    opacity: inView ? 1 : 0,
    transform: inView ? "translateY(0)" : "translateY(55px)",
    delay: 300,
    config: { duration: 200 },
    transition: "opacity 1.2s ease-in-out, transform 1.2s ease-in-out",
    padding: "0",
  });

  // Swiper initialization for slider
  var swiper = new Swiper(".blog-slider", {
    spaceBetween: 30,
    effect: "fade",
    loop: true,
    mousewheel: {
      invert: false,
    },
    pagination: {
      el: ".blog-slider__pagination",
      clickable: true,
    },
  });

  return (
    <>
      <div
        className={`container-fluid m-0 p-0 ${darkMode ? "dark-mode-bg" : ""}`}
      >
        {/* Navbar */}
        <Navbar darkMode={darkMode} toggleDarkMode={toggleDarkMode} />

        {/* Header Section without background image */}
        <div className="products">
          <h1
            className="lg-title header-title"
            style={{
              fontFamily: "Orbitron, sans-serif",
              letterSpacing: "0.3rem",
              fontSize: "4rem",
            }}
          >
            Aztek Coffee: Authentic Aroma
          </h1>
        </div>

        {/* Coffee Slider */}
        <div className="container-fluid">
          <div className="blog-slider">
            <div className="blog-slider__wrp swiper-wrapper">
              <div className="blog-slider__item swiper-slide">
                <div className="blog-slider__img">
                  <img src={coffee1} alt="Arabica Coffee" />
                </div>
                <div className="blog-slider__content">
                  <span className="blog-slider__code">Arabica</span>
                  <div className="blog-slider__title">Premium Selection</div>
                  <div className="blog-slider__text">
                    Discover the refinement of Arabica beans, harvested from the
                    finest plantations and perfectly roasted for an unparalleled
                    experience.
                  </div>
                </div>
              </div>
              <div className="blog-slider__item swiper-slide">
                <div className="blog-slider__img">
                  <img src={coffee2} alt="Intense Espresso" />
                </div>
                <div className="blog-slider__content">
                  <span className="blog-slider__code">Espresso</span>
                  <div className="blog-slider__title">Intense & Bold</div>
                  <div className="blog-slider__text">
                    Savor a concentrated infusion, perfectly balanced between
                    acidity and bitterness, designed to energize you from the
                    very first sip.
                  </div>
                </div>
              </div>
              <div className="blog-slider__item swiper-slide">
                <div className="blog-slider__img">
                  <img src={coffee3} alt="Blend Aztek" />
                </div>
                <div className="blog-slider__content">
                  <span className="blog-slider__code">Blend Aztek</span>
                  <div className="blog-slider__title">Unique Mix</div>
                  <div className="blog-slider__text">
                    Each blend is passionately crafted, combining carefully
                    selected beans to deliver a perfect harmony of flavors that
                    delight your senses.
                  </div>
                </div>
              </div>
            </div>
            <div className="blog-slider__pagination"></div>
          </div>
        </div>

        {/* Coffee Collection */}
        <div className="product-collection">
          <div className="container-fluid">
            <div className="product-collection-wrapper">
              {/* Left Column */}
              <animated.div ref={ref} style={animation}>
                <div className="product-col-left flex">
                  <div className="product-col-content">
                    <h2 className="sm-title">Arabica Coffee</h2>
                    <h2 className="md-title">
                      Discover Refinement in Every Bean
                    </h2>
                    <p className="text-light">
                      Choose the superior quality of Arabica coffee, masterfully
                      roasted to highlight its natural flavors and deliver an
                      authentic tasting experience.
                    </p>
                  </div>
                </div>
              </animated.div>

              {/* Right Column */}
              <div className="product-col-right">
                <animated.div ref={ref} style={animation1}>
                  <div className="product-col-r-top flex">
                    <div className="product-col-content">
                      <h2 className="sm-title">Intense Espresso</h2>
                      <h2 className="md-title">
                        The Power of Concentrated Flavors
                      </h2>
                      <p className="text-light">
                        Our espresso is a burst of taste, crafted for those who
                        appreciate intensity and depth, providing the energy you
                        need every day.
                      </p>
                    </div>
                  </div>
                </animated.div>

                <animated.div ref={ref} style={animation2}>
                  <div className="product-col-r-bottom">
                    {/* Bottom Left */}
                    <div className="flex">
                      <div className="product-col-content">
                        <h2 className="sm-title">Blend Aztek</h2>
                        <h2 className="md-title">
                          A Unique Harmony of Flavors
                        </h2>
                        <p className="text-light">
                          An exclusive blend made from the finest beans,
                          achieving a perfect balance between sweetness and
                          bitterness for a refined experience.
                        </p>
                      </div>
                    </div>
                    {/* Bottom Right */}
                    <div className="flex">
                      <div className="product-col-content">
                        <h2 className="sm-title">Cappuccino</h2>
                        <h2 className="md-title">Creamy Delicacy & Passion</h2>
                        <p className="text-light">
                          Enjoy the velvety texture of our Cappuccino, where
                          fine foam seamlessly blends with the intense aroma of
                          freshly roasted coffee.
                        </p>
                      </div>
                    </div>
                  </div>
                </animated.div>
              </div>
            </div>
          </div>
        </div>
        {/* Form Section */}
        <Form />
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Products;
