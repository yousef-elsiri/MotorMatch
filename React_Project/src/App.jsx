import "./App.css";

import { Routes, Route } from "react-router-dom";

import Home from "./components/pages/Home";
import Browse from "./components/pages/Browse";
import Sell from "./components/pages/Sell";
import Dashboard from "./components/pages/Dashboard";
import Messages from "./components/pages/Messages";
import Admin from "./components/pages/Admin";
import Profile from "./components/pages/Profile";
import Register from "./components/pages/Register";
import CarDetails from "./components/pages/CarDetails";
import ProfileUser from "./components/pages/ProfileUser";
import ProtectedRoute from "./ProtectedRoute";

import { useState } from "react";

function App() {
  const [theme, setTheme] = useState("dark");

  return (
    <div className={`app ${theme}`}>
      <Routes>
        <Route path="/" element={<Home theme={theme} setTheme={setTheme} />} />

        <Route path="/profile" element={<Profile />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/browse"
          element={
            <ProtectedRoute>
              <Browse />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sell"
          element={
            <ProtectedRoute>
              <Sell />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard/:brand"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/messages"
          element={
            <ProtectedRoute>
              <Messages />
            </ProtectedRoute>
          }
        />

        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <Admin theme={theme} setTheme={setTheme} />
            </ProtectedRoute>
          }
        />

        <Route
          path="/car/:id"
          element={
            <ProtectedRoute>
              <CarDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/user-profile"
          element={
            <ProtectedRoute>
              <ProfileUser />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
