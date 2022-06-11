import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './components/App';
import Register from './components/Login/Register';
import Login from './components/Login/Login';
import Logout from './components/Login/Logout';
import { BrowserRouter, Route, Routes } from 'react-router-dom'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <BrowserRouter>
    <Routes>
        <Route path="/" element={<App />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/logout" element={<Logout />} />
    </Routes>
  </BrowserRouter>
);