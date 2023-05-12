import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

export default function MainLayout({ currentUser, clearUserData }) {
  return (
    <>
      <Navbar currentUser={currentUser} clearUserData={clearUserData} />
      <Outlet />
    </>
  );
}
