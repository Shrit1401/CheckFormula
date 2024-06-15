"use client";
import Link from "next/link";
import React, { useState } from "react";
import Logo from "../../../public/logo.svg";
import Image from "next/image";
const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const links = [
    { href: "/", label: "Home" },
    { href: "/math", label: "Maths" },
    { href: "/physics", label: "Physics" },
    { href: "/chemistry", label: "Chemistry" },
  ];

  return (
    <nav className="bg-transparent border-b border-gray-200">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <Link href="/" className="flex items-center space-x-2">
          <Image src={Logo} alt="Logo" width={40} height={40} />
          <span className="text-2xl font-semibold">Check Formula</span>
        </Link>
        <button
          onClick={handleToggle}
          type="button"
          className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm rounded-lg md:hidden hover:bg-primary"
          aria-controls="navbar-default"
          aria-expanded={isOpen}
        >
          <span className="sr-only">Open main menu</span>
          <svg
            className="w-5 h-5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 17 14"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M1 1h15M1 7h15M1 13h15"
            />
          </svg>
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:block md:w-auto`}
          id="navbar-default"
        >
          <ul className="flex flex-col md:flex-row items-center md:mt-0 mt-5 p-0 text-lg">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block py-2 px-3 text-black rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0"
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="flex flex-row">
              <Link href="/sign-up">
                <button className="btn btn-primary">Sign in / up</button>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
