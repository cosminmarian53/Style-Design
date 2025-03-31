function CopyrightSD() {
  const year = new Date().getFullYear();
  return (
    <>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        Copyright © {" " + year + " "}
        <a className="text-white copyright-link" href="#">
          aztek.ro
        </a>
        <span>.Powered by 💝</span>
      </div>
    </>
  );
}
export default CopyrightSD;
