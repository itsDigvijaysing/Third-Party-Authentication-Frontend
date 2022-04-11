import React, { useState } from "react";
import "../App.css";

function User() {
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          backgroundColor: "#d0d0d0",
        }}
      >
        <div style={{ width: "50%", height: "80vh", padding: 20 }}>
          <div>
            <div>
              <h3>Login History</h3>
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
              }}
            >
              <table>
                <tr>
                  <th> Organization Name </th>
                  <th> Organization Website </th>
                  <th> Date of Login </th>
                  <th> Action (block/unblock) </th>
                </tr>
                <tr>
                  <td>E-Store</td>
                  <td>estore.com</td>
                  <td>22-02-2022</td>
                  <td>Block</td>
                </tr>
                <tr>
                  <td>Google</td>
                  <td>Google.com</td>
                  <td>22-02-2022</td>
                  <td>Block</td>
                </tr>
              </table>
            </div>
          </div>
        </div>
        <div style={{ width: "50%", height: "80vh" }}>
          <div>
            <div>
              <h3>User Name</h3>
            </div>
            <div className="container">
              <div className="card-3d-wrap mx-auto" style={{ height: "60vh" }}>
                <div className="card-3d-wrapper">
                  <div className="card-front" style={{ padding: 25 }}>
                    <div className="section text-center">
                      <h4 className="mb-4 pb-1" style={{ color: "white" }}>
                        Update Personal Details
                      </h4>
                    </div>
                    <div className="form-group mt-2">
                      <input
                        type="text"
                        name="logemail"
                        className="form-style"
                        value={regName}
                        onChange={(e) => setRegName(e.target.value)}
                        placeholder="Your Name"
                        id="logemail"
                        autocomplete="off"
                      />
                      <i className="input-icon uil uil-at"></i>
                    </div>
                    <div className="form-group mt-2">
                      <input
                        type="email"
                        name="logemail"
                        className="form-style"
                        value={regEmail}
                        onChange={(e) => setRegEmail(e.target.value)}
                        placeholder="Your Email"
                        id="logemail"
                        autocomplete="off"
                      />
                      <i className="input-icon uil uil-at"></i>
                    </div>
                    <div className="form-group mt-2">
                      <input
                        type="number"
                        name="logpass"
                        className="form-style"
                        value={regPhone}
                        onChange={(e) => setRegPhone(e.target.value)}
                        placeholder="Your Phone"
                        id="logpass"
                        autocomplete="off"
                      />
                      <i className="input-icon uil uil-lock-alt"></i>
                    </div>
                    <div className="form-group mt-2">
                      <input
                        type="password"
                        name="logpassword"
                        className="form-style"
                        value={regPassword}
                        onChange={(e) => setRegPassword(e.target.value)}
                        placeholder="Your Password"
                        id="logpassword"
                        autocomplete="off"
                      />
                      <i className="input-icon uil uil-lock-alt"></i>
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
        </div>
      </div>
    </div>
  );
}

export default User;
