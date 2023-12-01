function CopyrightSD() {
  const year = new Date().getFullYear();
  return (
    <>
      <div
        className="text-center p-3"
        style={{ backgroundColor: "rgba(0, 0, 0, 0.2)" }}
      >
        © {year} Copyright:{" "}
        <a className="text-white copyright-link" href="https://styledesign.ro/">
          styledesign.ro
        </a>
      </div>
    </>
  );
}
export default CopyrightSD;
