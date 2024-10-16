import React from "react";

const LandingContent = ({ openModal }) => {
  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-sm-6 d-flex justify-content-center align-items-center">
          <img
            src="images/brand-logo.png"
            alt="Brand Logo"
            style={{
              width: "75%", // Ensures the image takes the full width of the column
              height: "auto", // Maintains the aspect ratio of the image
              objectFit: "contain", // Ensures the image scales without being distorted
            }}
          />
        </div>
        <div className="col-sm-6 align-self-center">
          <h1>Kang Service</h1>
          <h2>Tempat Service Smartphone dan Komputer Terpercaya</h2>
          {/* <h3>Solusi Cepat dan Terpercaya untuk Masalah Teknologi Anda</h3> */}
          <p>
            Di Kang Service, kami memahami betapa pentingnya perangkat teknologi
            Anda dalam kehidupan sehari-hari. Dengan layanan profesional dan
            teknisi berpengalaman, kami siap membantu Anda mengatasi masalah
            smartphone dan komputer dengan cepat dan efisien.
          </p>
          <button className="btn btn-dark" onClick={openModal}>
            Ajukan Service Sekarang
          </button>
        </div>
      </div>

      <div className="mt-5">
        <h2>Layanan Kami</h2>

        <div className="row mt-4">
          <div className="col-4">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h6 className="card-title">Perbaikan Smartphone</h6>
                <ul className="list-unstyled">
                  <li>Layar pecah</li>
                  <li>Baterai boros</li>
                  <li>Masalah perangkat lunak</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h6 className="card-title">Perbaikan Komputer</h6>
                <ul className="list-unstyled">
                  <li>Kerusakan hardware</li>
                  <li>Virus dan malware</li>
                  <li>Upgrade sistem</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="col-4">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h6 className="card-title">Penyediaan Aksesori</h6>
                <ul className="list-unstyled">
                  <li>Charger</li>
                  <li>Kasing</li>
                  <li>Screen protector</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingContent;
