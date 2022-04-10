import React, { useState } from "react";
import "../App.css";
import Webcam from "react-webcam";
// import impimage from "../img/main_wall_3.png";
import axios from "axios";

function b64toBlob(b64Data, contentType, sliceSize) {
  contentType = contentType || "";
  sliceSize = sliceSize || 512;

  var byteCharacters = atob(b64Data); // window.atob(b64Data)
  var byteArrays = [];

  for (var offset = 0; offset < byteCharacters.length; offset += sliceSize) {
    var slice = byteCharacters.slice(offset, offset + sliceSize);

    var byteNumbers = new Array(slice.length);
    for (var i = 0; i < slice.length; i++) {
      byteNumbers[i] = slice.charCodeAt(i);
    }

    var byteArray = new Uint8Array(byteNumbers);

    byteArrays.push(byteArray);
  }

  var blob = new Blob(byteArrays, { type: contentType });
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
  const [alert, setAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState({
    message: "testin",
    status: "success",
  });

  const [regName, setRegName] = useState("");
  const [regEmail, setRegEmail] = useState("");
  const [regPhone, setRegPhone] = useState("");
  const [regPassword, setRegPassword] = useState("");

  const dummyDate = async () => {
    var ImageURL = image; // 'photo' is your base64 image
    // Split the base64 string in data and contentType
    var block = ImageURL.split(";");
    // Get the content type of the image
    var contentType = block[0].split(":")[1]; // In this case "image/gif"
    // get the real base64 content of the file
    var realData = block[1].split(",")[1];

    // Convert it to a blob to upload
    var blob = b64toBlob(realData, contentType);

    const formData = new FormData();
    formData.append("file", blob);
    formData.append("email", email);

    const data = await axios.post("http://localhost:5000/login", formData);
    console.log(data);
    setImage("");
    setEmail("");
    setAlertMessage({ message: data.data.data, status: "success" });
    setAlert(true);
  };

  const registerUser = async () => {
    var ImageURL = image; // 'photo' is your base64 image
    // Split the base64 string in data and contentType
    var block = ImageURL.split(";");
    // Get the content type of the image
    var contentType = block[0].split(":")[1]; // In this case "image/gif"
    // get the real base64 content of the file
    var realData = block[1].split(",")[1];

    // Convert it to a blob to upload
    var blob = b64toBlob(realData, contentType);

    const formData = new FormData();

    formData.append("name", regName);
    formData.append("email", regEmail);
    formData.append("phone", regPhone);
    // formData.append("password", regPassword);
    formData.append("file", blob);

    const data = await axios.post("http://localhost:5000/user", formData);
    console.log(data);
    setImage("");
    setRegEmail("");
    setRegName("");
    setRegPhone("");
    // setRegPassword("");
    setAlertMessage({ message: data.data.data, status: "success" });
    setAlert(true);
  };

  const capture = React.useCallback(() => {
    const imageSrc = webcamRef.current.getScreenshot();
    // console.log("load.... :- " + imageSrc)
    setImage(imageSrc);
  }, [webcamRef]);

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
                          {alert && (
                            <div
                              className={`alert alert-${alertMessage.status} alert-dismissible fade show`}
                              role="alert"
                            >
                              <strong>Hola!</strong> {alertMessage.message}
                              <button
                                type="button"
                                className="btn-close"
                                data-bs-dismiss="alert"
                                aria-label="Close"
                              ></button>
                            </div>
                          )}

                          <div className="section text-center">
                            <h4
                              className="mb-4 pb-1"
                              style={{ color: "white" }}
                            >
                              Log In
                            </h4>

                            <div className="form-group">
                              {image === "" ? (
                                <Webcam
                                  audio={false}
                                  height={300}
                                  ref={webcamRef}
                                  screenshotFormat="image/jpeg"
                                  width={300}
                                  videoConstraints={videoConstraints}
                                />
                              ) : (
                                <img
                                  src={image}
                                  alt="sadsad"
                                  id="limage"
                                  style={{
                                    marginBottom: "70px",
                                    marginTop: "65px",
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
                            {image !== "" && email && (
                              <button
                                className="btn-custom mt-4"
                                onClick={() => dummyDate()}
                              >
                                submit
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
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
                            <div className="form-group">
                              {image === "" ? (
                                <Webcam
                                  audio={false}
                                  height={300}
                                  ref={webcamRef}
                                  screenshotFormat="image/jpeg"
                                  width={300}
                                  videoConstraints={videoConstraints}
                                />
                              ) : (
                                <img
                                  src={image}
                                  alt="sadsad"
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
                            <button
                              type="button"
                              onClick={() => registerUser()}
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
          </div>
        </div>

        {/* <br /><br /><br /><br /><br /><br /> */}
      </div>
    </div>
  );
}

export default Auth;
