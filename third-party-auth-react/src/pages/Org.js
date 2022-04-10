import React, { useState } from "react";
import "../App.css";
// import axios from "axios";

function Org() {
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regWeb, setRegWeb] = useState("");

  return (
    <div style={{ backgroundColor: "#d0d0d0", padding: 25 }}>
      <div className="container">
        <div className="card-3d-wrap mx-auto" style={{ height: "60vh" }}>
          <div className="card-3d-wrapper">
            <div className="card-front" style={{ padding: 25 }}>
              <div className="section text-center">
                <h4 className="mb-4 pb-1" style={{ color: "white" }}>
                  Org Sign Up
                </h4>
              </div>
              <div className="form-group mt-2">
                <input
                  type="text"
                  name="logname"
                  className="form-style"
                  value={regName}
                  onChange={(e) => setRegName(e.target.value)}
                  placeholder="Org Name"
                  id="logname"
                  autocomplete="off"
                />
                <i className="input-icon uil uil-at"></i>
              </div>

              <div className="form-group mt-2">
                <input
                  type="website"
                  name="logweb"
                  className="form-style"
                  value={regWeb}
                  onChange={(e) => setRegWeb(e.target.value)}
                  placeholder="Website Address"
                  id="logweb"
                  autocomplete="off"
                />
                <i className="input-icon uil uil-lock-alt"></i>
              </div>
              <div className="form-group mt-2">
                <input
                  type="email"
                  name="logemail"
                  className="form-style"
                  value={regEmail}
                  onChange={(e) => setRegEmail(e.target.value)}
                  placeholder="Your Email ID"
                  id="logemail"
                  autocomplete="off"
                />
                <i className="input-icon uil uil-at"></i>
              </div>
              <button
                type="button"
                // onClick={() => registerUser()}
                className="btn-custom mt-4"
              >
                submit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Org;
