const Form = () => {
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
                <label htmlFor="exampleFormControlInput1">Nume</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Introduceti numele"
                />
              </div>
              <div className="form-group pb-2">
                <label htmlFor="exampleFormControlInput1">Prenume</label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Introduceti prenumele"
                />
              </div>
              <div className="form-group pb-2">
                <label htmlFor="exampleFormControlInput1">
                  Numar de telefon
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Introduceti numarul de telefon mobil"
                />
              </div>
              <div className="form-group pb-2">
                <label htmlFor="exampleFormControlInput1">
                  Adresa de email
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="exampleFormControlInput1"
                  placeholder="Introduceti adresa de email"
                />
              </div>
              <div className="form-group pb-2">
                <label htmlFor="exampleFormControlSelect1">
                  Tipul de mobila dorit
                </label>
                <select className="form-control" id="exampleFormControlSelect1">
                  <option>Bucatarie</option>
                  <option>Baie</option>
                  <option>Living Room</option>
                  <option>Dormitor</option>
                </select>
              </div>
              <div className="form-group pb-2">
                <label htmlFor="exampleFormControlSelect1">Designul</label>
                <select className="form-control" id="exampleFormControlSelect1">
                  <option>Clasic</option>
                  <option>Modern</option>
                </select>
              </div>
              <div className="form-group pb-3">
                <label htmlFor="exampleFormControlTextarea1">
                  Specificatii suplimentare
                </label>
                <textarea
                  className="form-control"
                  id="exampleFormControlTextarea1"
                  rows="3"
                  placeholder="*In cazul in care sunt neclaritati legate de comanda, o sa va contactam pentru a cere eventuale detalii. Va multumim pentru intelegere! "
                ></textarea>
              </div>
              <div className="form-group d-flex justify-content-center">
                <button type="submit" className="btn btn-danger">
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
