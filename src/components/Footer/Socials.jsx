import FacebookIcon from "@mui/icons-material/Facebook";
import InstagramIcon from "@mui/icons-material/Instagram";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function Socials() {
  return (
    <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
      <h6 className="text-uppercase mb-4 font-weight-bold">Follow us</h6>
      <div className="d-flex flex-row align-items-center justify-content-center">
        <a
          href="#"
          className="btn btn-primary p-1"
          style={{ marginRight: "0.5rem" }}
        >
          <FacebookIcon fontSize="large" />
        </a>
        <a
          href="#"
          className="btn btn-danger p-1"
          style={{ marginRight: "0.5rem" }}
        >
          <InstagramIcon fontSize="large" />
        </a>
        <a href="#" className="btn btn-primary p-1">
          <LinkedInIcon fontSize="large" />
        </a>
      </div>
    </div>
  );
}

export default Socials;
