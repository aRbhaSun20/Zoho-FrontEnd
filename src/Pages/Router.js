import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AuthorityDashboard from "./AuthorityDashboard/AuthorityDashboard";
import Home from "./Home";

export default function Router() {
  return (
    <React.Fragment>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="authoritydashboard" element={<AuthorityDashboard />} />
        </Routes>
      </BrowserRouter>
    </React.Fragment>
  );
}
