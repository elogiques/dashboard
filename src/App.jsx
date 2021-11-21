import React from "react";

import { Routes, Route, Router } from "react-router-dom";

import Layout from "./Layout";
import Dashboard from "./Dashboard";
import Merchant from "./Merchant";

const Home = () => <div>home</div>;
const Error = () => <div>No Page Found</div>;
const Login = () => <div>Login</div>;
const App = () => {
  return (
    <Routes>
      <Route>
        <Route path="/login" element={<Login />} />
      </Route>
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/merchants" element={<Merchant />} />
        <Route path="/banking" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App;
