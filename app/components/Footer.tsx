"use client";
import React from "react";

const Footer = () => {
  return (
    <footer className="p-4 bg-gray-800 text-white text-center shadow-md">
      <p className="text-sm">
        © {new Date().getFullYear()} Adrian Bourke. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
