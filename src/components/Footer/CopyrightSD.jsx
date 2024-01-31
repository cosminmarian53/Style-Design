function CopyrightSD() {
  const year = new Date().getFullYear();
  return (
    <>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        Copyright © {" " + year + " "}
        <a className="text-white copyright-link" href="https://styledesign.ro/">
          styledesign.ro
        </a>
        <span>.Powered by Infinite Bytes</span>
      </div>
    </>
  );
}
export default CopyrightSD;
