import "./App.css";
import NavbarCustom from "./components/NavbarCustom";
import FooterCustom from "./components/FooterCustom";
import "bootstrap/dist/css/bootstrap.min.css";
// import Home from "./pages/Home";
// import Org from "./pages/Org";
// import Auth from "./pages/Auth";
// import User from "./pages/User";

// import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

function App() {
  return (
    <div>
      <div className="App">
        <NavbarCustom />
        <FooterCustom />
      </div>
      {/* <div>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/org" element={<Org />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/user" element={<User />} />
        </Routes>
      </div> */}
    </div>
  );
}

export default App;
