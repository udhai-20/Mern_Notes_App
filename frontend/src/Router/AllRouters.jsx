import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../Screens/Landing/Landing";
import AddNotes from "../Component/Notes/MyNotes";
import Login from "../Screens/Login/Login";
import Signup from "../Screens/Signup/Signup";
import MyNotes from "../Component/Notes/MyNotes";

function AllRouters() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/mynotes" element={<MyNotes />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </>
  );
}

export default AllRouters;
