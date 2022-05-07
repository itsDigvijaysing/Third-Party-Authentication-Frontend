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
  const [userHistory, setUserHistory] = useState([]);
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
    fetchHistory(user);
  }, []);

  const fetchHistory = async (id) => {
    let history = await axios.get("http://localhost:5000/history/" + id);

    console.log(history.data);
    setUserHistory(history.data);
    userHistory.reverse();
  };

  const getUser = async (user) => {
    let userDate = await axios.get("http://localhost:5000/user/" + user);
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
    <>
      <div class="container" style={{ minHeight: "84.8vh" }}>
        <div class="row">
          <div class="col-sm-12 col-md-8">
            <h1 className="py-3 text-dark font-monospace">Login History</h1>
            <div
              className="shadow-lg"
              style={{ maxHeight: "60vh", overflowY: "scroll" }}
            >
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Sr.</th>
                    <th scope="col">Company Name</th>
                    <th scope="col">Token</th>
                    <th scope="col">Login Time</th>
                  </tr>
                </thead>
                <tbody>
                  {userHistory.map((data, index) => (
                    <tr>
                      <th scope="row">{index + 1}</th>
                      <td>{data.name}</td>
                      <td style={{ cursor: "pointer" }}>{data.token}</td>
                      <td>{data.time}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div class="col-sm-12 col-md-4">
            <h1 className="py-3 text-dark font-monospace">Update Info</h1>
            <div className="card-3d-wrap-info">
              <div className="card-3d-wrapper">
                <div className="card-front" style={{ padding: 25 }}>
                  <div className="section text-center">
                    <h4 className="mb-3 pb-1" style={{ color: "white" }}>
                      Personal Details
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
    </>
  );
}

export default User;
