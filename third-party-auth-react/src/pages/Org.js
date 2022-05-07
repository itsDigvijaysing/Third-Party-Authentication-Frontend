import React, { useState } from "react";
import "../App.css";
import Joi from "joi";
import axios from "axios";

function Org() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: "test",
    status: "success",
  });

  const registerCompany = async () => {
    const registerSchema = Joi.object({
      name: Joi.string().alphanum().max(30).min(3).required(),
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      phone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
    });

    const { error } = await registerSchema.validate({ name, email, phone });

    if (error) {
      console.log(error + " dasd");
      setAlertMessage({ message: `${error}`, status: "warning" });
      setAlert(true);
      return;
    }
    setAlert(false);

    const data = await axios.post("http://localhost:5000/company", {
      name,
      email,
      phone,
    });

    console.log(data);

    if (data.data.company_id) {
      setAlertMessage({
        message: `Your api creditional ${data.data.company_id}`,
        status: "success",
      });
      setAlert(true);
    } else {
      setAlertMessage({
        message: `error :- ${data.data.data}`,
        status: "danger",
      });
      setAlert(true);
    }

    setEmail("");
    setPhone("");
    setName("");
  };

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
              {alert && (
                <div
                  className={`alert alert-${alertMessage.status} alert-dismissible fade show`}
                  role="alert"
                >
                  {alertMessage.message}
                  <button
                    type="button"
                    className="btn-close"
                    onClick={() => setAlert(false)}
                  ></button>
                </div>
              )}
              <div className="form-group mt-2">
                <input
                  type="text"
                  name="logname"
                  className="form-style"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Org Name"
                  id="logname"
                  autocomplete="off"
                />
                <i className="input-icon uil uil-at"></i>
              </div>

              <div className="form-group mt-2">
                <input
                  type="number"
                  name="phone"
                  className="form-style"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Phone"
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your Email ID"
                  id="logemail"
                  autocomplete="off"
                />
                <i className="input-icon uil uil-at"></i>
              </div>
              <button
                type="button"
                onClick={() => registerCompany()}
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
