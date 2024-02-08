import Navbar from "../components/Navbar";
import Footer from "../components/Footer/Footer";
import Form from "../components/Form";
import { useInView } from "react-intersection-observer";
import { useSpring, animated } from "react-spring";
import "/public/css/main.css";
const Products = () => {
  // Animation: fade-in-on-scroll
  const [ref, inView] = useInView({
    triggerOnce: true, // Change this to false if you want the animation to trigger again whenever it comes in view
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
  var swiper = new Swiper(".blog-slider", {
    spaceBetween: 30,
    effect: "fade",
    loop: true,
    mousewheel: {
      invert: false,
    },
    // autoHeight: true,
    pagination: {
      el: ".blog-slider__pagination",
      clickable: true,
    },
  });
  return (
    <>
      <div className="container-fluid m-0 p-0">
        {/* Navbar */}
        <Navbar />
        {/* Header-Section */}
        <div className="products">
          <h1
            className="lg-title header-title"
            style={{
              fontFamily: "Orbitron,sans-serif",
              letterSpacing: "0.3rem",
              fontSize: "4rem",
            }}
          >
            mobilier de înaltă calitate
          </h1>
        </div>

        {/* <!---PRODUCT CATALOGUE---> */}
        <div className="container-fluid">
          <div className="blog-slider">
            <div className="blog-slider__wrp swiper-wrapper">
              <div className="blog-slider__item swiper-slide">
                <div className="blog-slider__img">
                  <img src="../src/assets/Produse/bucatarie/21.jpg" alt="" />
                </div>
                <div className="blog-slider__content">
                  <span className="blog-slider__code">Bucătărie</span>
                  <div className="blog-slider__title">Stil modern</div>
                  <div className="blog-slider__text">
                    Un mobilier de bucătărie în stil modern, elegant și
                    funcțional, cu linii curate și finisaje mate sau lucioase.
                    Integrând tehnologie și spații inteligente de depozitare,
                    acest mobilier aduce un aspect contemporan oricărei
                    bucătării, oferind un echilibru perfect între estetică și
                    utilitate.
                  </div>
                </div>
              </div>
              <div className="blog-slider__item swiper-slide">
                <div className="blog-slider__img">
                  <img src="../src/assets/Produse/baie/1.jpg" alt="" />
                </div>
                <div className="blog-slider__content">
                  <span className="blog-slider__code">Baie</span>
                  <div className="blog-slider__title">Stil Modern</div>
                  <div className="blog-slider__text">
                    O mobilă de baie în stil modern îmbină designul minimalist
                    cu funcționalitatea sporită. Folosind materiale precum
                    sticla, metalul și lemnul în culori neutre și finisaje
                    lucioase, creează un spațiu elegant și relaxant. Dispune de
                    spații de depozitare inteligente și accesorii moderne,
                    completând astfel aspectul contemporan al băii.
                  </div>
                </div>
              </div>
              <div className="blog-slider__item swiper-slide">
                <div className="blog-slider__img">
                  <img src="../src/assets/Produse/living/33.jpg" alt="" />
                </div>
                <div className="blog-slider__content">
                  <span className="blog-slider__code">Living Room</span>
                  <div className="blog-slider__title">Stil clasic</div>
                  <div className="blog-slider__text">
                    Un dulap clasic pentru living room, confecționat din lemn
                    masiv și finisat cu detalii delicate. Cu linii elegante și
                    un design atemporal, este piesa perfectă pentru a completa
                    atmosfera caldă și primitoare a oricărui interior în stil
                    clasic. Un element de mobilier ce adaugă rafinament și
                    funcționalitate spațiului de relaxare.
                  </div>
                </div>
              </div>
            </div>
            <div className="blog-slider__pagination"></div>
          </div>
        </div>

        {/* <!-- PRODUCT COLLECTION --> */}
        <div className="product-collection">
          <div className="container-fluid">
            <div className="product-collection-wrapper">
              {/* <!-- product col left --> */}
              <animated.div ref={ref} style={animation}>
                <div className="product-col-left flex">
                  <div className="product-col-content">
                    <h2 className="sm-title">Bucătărie</h2>
                    <h2 className="md-title">
                      Mobilier Functional și Estetic!
                    </h2>
                    <p className="text-light">
                      Descoperă colecția noastră de mobilier de bucătărie, unde
                      eleganța se întâlnește cu funcționalitatea pentru a crea
                      un spațiu perfect echilibrat. De la dulapuri ingenioase
                      până la mese elegante și insule practic concepute, fiecare
                      piesă îți va aduce confortul și rafinamentul de care ai
                      nevoie în bucătăria ta.
                    </p>
                  </div>
                </div>
              </animated.div>

              {/* <!-- product col right --> */}
              <div className="product-col-right">
                <animated.div ref={ref} style={animation1}>
                  <div className="product-col-r-top flex">
                    <div className="product-col-content">
                      <h2 className="sm-title"> Baie </h2>
                      <h2 className="md-title">
                        Oază de Relaxare: Îmbracă-ți Baia în Eleganță și Răsfăț!{" "}
                      </h2>
                      <p className="text-light">
                        Transformă-ți baia într-un sanctuar de eleganță și
                        funcționalitate cu gama noastră de mobilier și
                        accesorii. De la lavoare compacte la soluții de
                        depozitare ingenioase, fiecare element este proiectat
                        pentru a aduce un strop de lux în spațiile mici.
                      </p>
                    </div>
                  </div>
                </animated.div>

                <animated.div ref={ref} style={animation2}>
                  <div className="product-col-r-bottom">
                    {/* <!-- left --> */}
                    <div className="flex">
                      <div className="product-col-content">
                        <h2 className="sm-title">Dormitor </h2>
                        <h2 className="md-title">
                          Răsfăță-ți Sufletul într-un Univers de Liniste
                        </h2>
                        <p className="text-light">
                          Transformă-ți dormitorul într-un sanctuar al relaxării
                          și rafinamentului. Cu o paletă de culori calmante și
                          mobilier confortabil, fiecare element este ales cu
                          grijă pentru a crea un mediu perfect pentru odihnă și
                          regenerare.
                        </p>
                      </div>
                    </div>
                    {/* <!-- right --> */}
                    <div className="flex">
                      <div className="product-col-content">
                        <h2 className="sm-title">Living Room </h2>
                        <h2 className="md-title">
                          Stilul Se Întâlnește cu Confortul{" "}
                        </h2>
                        <p className="text-light">
                          Livingul tău devine centrul vieții sociale și al
                          relaxării în același timp. Cu mobilierul nostru
                          elegant și accentele de design rafinate, creezi un
                          spațiu invitativ și confortabil pentru întâlniri cu
                          prietenii sau serile liniștite în familie.
                        </p>
                      </div>
                    </div>
                  </div>
                </animated.div>
              </div>
            </div>
          </div>
        </div>
        {/* <!-- FORM --> */}
        <Form />
      </div>
      {/* Footer */}
      <Footer />
    </>
  );
};

export default Products;
