import React from "react";
import Login from "./pages/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Home from "./pages/home";
import Comfirmation from "./pages/comfirmation";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
          <Route path="/comfirmation" element={<Comfirmation />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
