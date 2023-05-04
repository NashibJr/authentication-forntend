import React from "react";
import Login from "./pages/login";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Signup from "./pages/signup";
import Home from "./pages/home";

const App = () => {
  return (
    <div>
      <Router>
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/home" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
