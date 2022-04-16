import React, { useState } from "react";
import "../App.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function User() {
  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: "test",
    status: "success",
  });
  let history = useNavigate();
  const [userId, setUserId] = React.useState("");

  React.useEffect(() => {
    let user = sessionStorage.getItem("user_id");
    if (!user) {
      history("/auth");
    }
    setUserId(user);
    getUser(user);
  }, []);

  const getUser = async (user) => {
    let userDate = await axios.get("http://127.0.0.1:5000/user/" + user);
    console.log(userDate, "geetting info ");

    setRegName(userDate.data.name);
    setRegEmail(userDate.data.email);
    setRegPhone(userDate.data.phone);
    setRegPassword(userDate.data.password);
  };

  const updateUser = async () => {
    const userDate = {
      name: regName,
      email: regEmail,
      phone: regPhone,
      password: regPassword,
    };

    // using axios

    let user = await axios.put(
      "http://127.0.0.1:5000/user/" + userId,
      userDate
    );
    if (user) {
      setAlertMessage({
        message: "User Updated",
        status: "success",
      });
      setAlert(true);
    }

    // using fetch
    // fetch("http://127.0.0.1:5000/user/" + userId,
    //   {
    //     method: 'PUT',
    //     headers: { 'Content-Type': 'application/json' },
    //     body: JSON.stringify(userDate)
    //   }).then((data) => console.log(data)).catch((err) => console.log(err))
  };

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
        <div style={{ width: "50%", height: "80vh", padding: 20 }}>
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
                    {alert && (
                      <div
                        className={`alert alert-${alertMessage.status} alert-dismissible fade show`}
                        role="alert"
                      >
                        {alertMessage.message}
                        <button
                          type="button"
                          className="btn-close"
                          data-bs-dismiss="alert"
                          aria-label="Close"
                        ></button>
                      </div>
                    )}
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
                      onClick={() => updateUser()}
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
