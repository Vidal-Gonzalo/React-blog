import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar/Navbar";
import CreatePost from "./pages/CreatePost/CreatePost";
import Home from "./pages/Home/Home";
import DetailPage from "./pages/DetailPage/DetailPage";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import PageNotFound from "./components/PageNotFound/PageNotFound";
import { AuthContextProvider } from "./context/Auth";
import Profile from "./pages/Profile/Profile";

function App() {
  return (
    <div>
      <AuthContextProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/createpost" element={<CreatePost />} />
            <Route path="/post/:id" element={<DetailPage />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile/:id" element={<Profile />} />
            <Route path="*" element={<PageNotFound />} />
          </Routes>
        </Router>
      </AuthContextProvider>
    </div>
  );
}

export default App;
