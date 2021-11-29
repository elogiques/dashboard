import React from "react";

import { Routes, Route, Router } from "react-router-dom";

import Layout from "./Layout";
import Dashboard from "./pages/dashboard";
import ListMerchant from "./pages/merchants/listMerchant";

import AddMerchant from "./pages/merchants/createMerchant";

import ListUser from "./pages/users/listUsers";

import AddUser from "./pages/users/createUser";

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
        <Route exact path="/merchants" element={<ListMerchant />} />
        <Route path="/merchants/create" element={<AddMerchant />} />
        <Route path="/users" element={<ListUser />} />
        <Route path="/users/create" element={<AddUser />} />

        <Route path="/banking" element={<Home />} />
        <Route path="*" element={<Error />} />
      </Route>
    </Routes>
  );
};

export default App;
