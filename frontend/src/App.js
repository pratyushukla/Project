import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { MyContext } from "./UserContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

import Home from "./pages/Home";
import Authentication from "./pages/Authentication";
import Dashboard from "./pages/Dashboard";
import Logout from "./pages/Logout";
import Update from "./pages/Update";

import UseNav from "./components/UseNav";
import Footer from "./components/Footer";

const App = () => {
  return (
    <MyContext>
      <Router>
        <div className="App fulid-container">
          <UseNav />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/authentication" element={<Authentication />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/update/:comp" element={<Update />} />
          </Routes>
          <Footer />
        </div>
      </Router>
    </MyContext>
  );
};

export default App;
