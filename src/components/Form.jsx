const Form = () => {
  function sendwhatsapp() {
    var phonenumber = "+4076688455545";

    var name = document.querySelector("#name").value;
    var lastname = document.querySelector("#lastname").value;
    var location = document.querySelector("#location").value;
    var email = document.querySelector("#email").value;
    var mobila = document.querySelector("#mobila").value;
    var design = document.querySelector("#design").value;
    var textarea = document.querySelector("#textarea").value;

    var url =
      "https://wa.me/" +
      phonenumber +
      "?text=" +
      "*Nume :* " +
      name +
      "%0a" +
      "*Prenume :* " +
      lastname +
      "%0a" +
      "*Județ și Localitate :* " +
      location +
      "%0a" +
      "*Email :* " +
      email +
      "%0a" +
      "*Tipul de Mobila :* " +
      mobila +
      "%0a" +
      "*Design :* " +
      design +
      "%0a" +
      "*Specificații adiționale :* " +
      textarea +
      "%0a%0a";
    window.open(url, "_blank").focus();
  }
  return (
    <>
      {" "}
      <div className="container-fluid form-products">
        <div className="row form-wrapper">
          <div className="col-md-12 col-sm-12 form-content-wrapper">
            <form
              className="form-contents"
              style={{ fontFamily: "Orbitron,sans-serif" }}
            >
              <h2
                className="md-title text-center"
                style={{
                  fontFamily: "Orbitron,sans-serif",
                  fontWeight: "bold",
                }}
              >
                Te-am convins?<br></br> Trimite acum comanda pentru mobila
                dorita!
              </h2>
              <div className="form-group pb-2">
                <label htmlFor="name">Nume</label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  placeholder="Introduceti numele"
                />
              </div>
              <div className="form-group pb-2">
                <label htmlFor="lastname">Prenume</label>
                <input
                  type="text"
                  className="form-control"
                  id="lastname"
                  placeholder="Introduceti prenumele"
                />
              </div>
              <div className="form-group pb-2">
                <label htmlFor="location">Județ și Localitate</label>
                <input
                  type="text"
                  className="form-control"
                  id="location"
                  placeholder="Introduceti județul și localitatea din care sunteți"
                />
              </div>
              <div className="form-group pb-2">
                <label htmlFor="email">Adresa de email</label>
                <input
                  type="email"
                  className="form-control"
                  id="email"
                  placeholder="Introduceti adresa de email"
                />
              </div>
              <div className="form-group pb-2">
                <label htmlFor="mobila">Tipul de mobila dorit</label>
                <select className="form-control" id="mobila">
                  <option>Bucatarie</option>
                  <option>Baie</option>
                  <option>Living Room</option>
                  <option>Dormitor</option>
                </select>
              </div>
              <div className="form-group pb-2">
                <label htmlFor="design">Designul</label>
                <select className="form-control" id="design">
                  <option>Clasic</option>
                  <option>Modern</option>
                </select>
              </div>
              <div className="form-group pb-3">
                <label htmlFor="textarea">Specificatii suplimentare</label>
                <textarea
                  className="form-control"
                  id="textarea"
                  rows="3"
                  placeholder="*In cazul in care sunt neclaritati legate de comanda, o sa va contactam pentru a cere eventuale detalii. Va multumim pentru intelegere! "
                ></textarea>
              </div>
              <div className="form-group d-flex justify-content-center">
                <button
                  type="submit"
                  onClick={sendwhatsapp}
                  className="btn btn-danger"
                >
                  Trimite comanda
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Form;
