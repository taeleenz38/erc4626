"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "investor",
    path: "/investor",
  },
  {
    name: "admin",
    path: "/admin",
  },
  {
    name: "borrower",
    path: "/borrower",
  },
];

const Nav = () => {
  const pathname = usePathname();
  return (
    <nav className="flex gap-8 px-8 py-4">
      {links.map((link, index) => {
        return (
          <Link
            href={link.path}
            key={index}
            className={`${
              link.path === pathname && "text-accent border-b-2 border-accent"
            } capitalize font-semibold hover:text-accent transition-all`}
          >
            {link.name}
          </Link>
        );
      })}
    </nav>
  );
};

export default Nav;
