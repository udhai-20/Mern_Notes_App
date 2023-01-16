import React from "react";
import { Route, Routes } from "react-router-dom";
import Landing from "../Screens/Landing/Landing";
import AddNotes from "../Component/Notes/MyNotes";
import Login from "../Screens/Login/Login";
import Signup from "../Screens/Signup/Signup";
import MyNotes from "../Component/Notes/MyNotes";
import PrivateRouter from "./PrivateRouter";
import CreateNotes from "../Screens/CreateNotes/CreateNotes";

function AllRouters({ search }) {
  console.log("  search:", search);
  return (
    <>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route
          path="/mynotes"
          element={
            <PrivateRouter>
              <MyNotes search={search} />
            </PrivateRouter>
          }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        {/* <Route
          path="/createnote"
          element={
            <PrivateRouter>
              <CreateNotes />
            </PrivateRouter>
          }
        /> */}
      </Routes>
    </>
  );
}

export default AllRouters;
