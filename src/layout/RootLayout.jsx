import React from "react";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { Outlet } from "react-router-dom";

function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-neutral-50 font-Inter">
      <Navbar />

      <main className="flex-grow p-5 md:py-10 md:px-10 overflow-hidden">
        <Outlet />
      </main>

      <Footer />
    </div>
  );
}

export default RootLayout;
