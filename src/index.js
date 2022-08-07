import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Provider } from 'react-redux';

import App from "./App";
import Navbar from "./components/Navbar";
import Login from "./components/Login";
import Register from "./components/Register";
import RegisterCompleted from "./components/RegisterCompleted";
import Profile from "./components/Profile";
import { store } from './services/store';

import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/js/bootstrap.js';
import "bootstrap-icons/font/bootstrap-icons.css";

const root = ReactDOM.createRoot(
  document.getElementById("root")
);
root.render(
  <Provider store={store}>
    <BrowserRouter>
      <Navbar />
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/register/completed" element={<RegisterCompleted />} />
        <Route path="/profile" element={<Profile />} />
      </Routes>
    </BrowserRouter>
  </Provider>
);