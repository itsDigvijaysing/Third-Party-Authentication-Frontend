import React, { useState } from "react";
import "../App.css";
import Webcam from "react-webcam";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Joi from "joi";

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;

  let byteCharacters = atob(b64Data); // window.atob(b64Data)
  let byteArrays = [];

  for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    let slice = byteCharacters.slice(offset, offset + sliceSize);

    let byteNumbers = new Array(slice.length);
    for (let i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    let byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  let blob = new Blob(byteArrays, { type: contentType });
  return blob;
}

const videoConstraints = {
  width: 1280,
  height: 720,
  facingMode: "user",
};

function Auth() {
  const webcamRef = React.useRef(null);

  const [image, setImage] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: "test",
    status: "success",
  });

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  let history = useNavigate();

  const userLogin = async () => {
    const verifySchema = Joi.object({
      email: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      password: Joi.string().alphanum().max(50).min(3).required(),
    });

    const { error } = await verifySchema.validate({ email, password });

    if (error) {
      setAlertMessage({ message: `${error}`, status: "warning" });
      setAlert(true);
      return;
    }
    setAlert(false);

    // // sending request
    const data = await axios.post("http://localhost:5000/login-user", {
      email,
      password,
    });
    console.log(data);
    setEmail("");
    setPassword("");
    if (Object.keys(data.data).length > 1) {
      sessionStorage.setItem("user_id", data.data.company_id);
      window.location.reload();
      history("/user");
    } else {
      setAlertMessage({ message: data.data.data, status: "warning" });
      setAlert(true);
    }
  };

  const registerUser = async () => {
    // validation input feilds
    const registerSchema = Joi.object({
      regName: Joi.string().alphanum().max(30).min(3).required(),
      regEmail: Joi.string()
        .email({ tlds: { allow: false } })
        .required(),
      regPhone: Joi.string()
        .length(10)
        .pattern(/^[0-9]+$/)
        .required(),
      regPassword: Joi.string().alphanum().max(50).min(3).required(),
    });

    const { error } = await registerSchema.validate({
      regName,
      regEmail,
      regPhone,
      regPassword,
    });

    if (error) {
      console.log(error + " dasd");
      setAlertMessage({ message: `${error}`, status: "warning" });
      setAlert(true);
      return;
    }
    setAlert(false);

    // image conversion
    let ImageURL = image;
    let block = ImageURL.split(";");
    let contentType = block[0].split(":")[1];
    let realData = block[1].split(",")[1];
    let blob = b64toBlob(realData, contentType);

    // creating formdata
    const formData = new FormData();
    formData.append("name", regName);
    formData.append("email", regEmail);
    formData.append("phone", regPhone);
    formData.append("password", regPassword);
    formData.append("file", blob);

    // sending request
    const data = await axios.post("http://localhost:5000/user", formData);
    console.log(data);
    setImage("");
    setRegEmail("");
    setRegName("");
    setRegPhone("");
    setRegPassword("");
    setAlertMessage({ message: data.data.data, status: "success" });
    setAlert(true);
  };

  // capturing image
  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    setImage(imageSrc);
  }, [webcamRef]);

  React.useEffect(() => {
    if (sessionStorage.getItem("user_id")) {
      history("/user");
    }
  });

  return (
    <div style={{ backgroundColor: "#d0d0d0" }}>
      <div className="webcam-container">
        <div className="section">
          <div className="container">
            <div className="row full-height justify-content-center">
              <div className="col-12 text-center align-self-center py-5">
                <div className="section pb-5 pt-5 pt-sm-2 text-center">
                  <h6 className="mb-0 pb-3">
                    <span
                      style={{
                        color: "white",
                        backgroundColor: "#2a2b38",
                        borderRadius: 20,
                        margin: 5,
                      }}
                    >
                      Log In
                    </span>
                    <span
                      style={{
                        color: "white",
                        backgroundColor: "#2a2b38",
                        borderRadius: 20,
                        margin: 5,
                      }}
                    >
                      Register
                    </span>
                  </h6>
                  <input
                    className="checkbox"
                    type="checkbox"
                    id="reg-log"
                    name="reg-log"
                  />
                  <label for="reg-log"></label>
                  <div className="card-3d-wrap mx-auto">
                    <div className="card-3d-wrapper">
                      <div className="card-front">
                        <div className="center-wrap">
                          <div className="section text-center">
                            <h4
                              className="mb-4 pb-1"
                              style={{ color: "white" }}
                            >
                              Log In
                            </h4>
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
                            <div className="form-group">
                              <input
                                type="email"
                                name="logemail"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="form-style"
                                placeholder="Your Email"
                                id="logemail"
                                autocomplete="off"
                              />
                              <i className="input-icon uil uil-at"></i>
                            </div>
                            <div className="form-group mt-2">
                              <input
                                type="password"
                                name="logpassword"
                                className="form-style"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                placeholder="Your Password"
                                id="logpassword"
                                autocomplete="off"
                              />
                              <i className="input-icon uil uil-lock-alt"></i>
                            </div>

                            <button
                              className="btn-custom mt-4"
                              onClick={() => userLogin()}
                            >
                              submit
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* user register code */}
                      <div className="card-back">
                        <div className="center-wrap">
                          <div
                            className="section text-center"
                            style={{
                              padding: 20,
                            }}
                          >
                            <h4
                              className="mb-4 pb-3"
                              style={{ color: "white", margin: 10 }}
                            >
                              Register
                            </h4>
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
                            <div className="form-group">
                              {image === "" ? (
                                <Webcam
                                  audio={false}
                                  height={"100%"}
                                  width={"100%"}
                                  ref={webcamRef}
                                  screenshotFormat="image/jpeg"
                                  videoConstraints={videoConstraints}
                                />
                              ) : (
                                <img
                                  src={image}
                                  alt="MainImage"
                                  id="limage"
                                  style={{
                                    marginBottom: "50px",
                                    marginTop: "55px",
                                  }}
                                />
                              )}
                              {image !== "" ? (
                                <button
                                  type="button"
                                  className="btn btn-outline-primary custom-button btn-sm"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    setImage("");
                                  }}
                                >
                                  <i className="fa-solid fa-camera-rotate"></i>
                                </button>
                              ) : (
                                <button
                                  onClick={(e) => {
                                    e.preventDefault();
                                    capture();
                                  }}
                                  type="button"
                                  className="btn btn-outline-primary custom-button btn-sm"
                                >
                                  <i className="fa-solid fa-camera"></i>
                                </button>
                              )}
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
                            {regEmail && regPassword && regName && regPhone && (
                              <button
                                type="button"
                                onClick={() => registerUser()}
                                className="btn-custom mt-4"
                              >
                                submit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* <br /><br /><br /><br /><br /><br /> */}
      </div>
    </div>
  );
}

export default Auth;
