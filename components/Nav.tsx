"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAccount } from "wagmi";
import React from "react";

const links = [
  {
    name: "home",
    path: "/",
  },
  {
    name: "investor",
    path: "/investor",
    wallet: process.env.NEXT_PUBLIC_INVESTOR_WALLET_ADDRESS,
  },
  {
    name: "admin",
    path: "/admin",
    wallet: process.env.NEXT_PUBLIC_ADMIN_WALLET_ADDRESS,
  },
  {
    name: "originator",
    path: "/originator",
    wallet: process.env.NEXT_PUBLIC_ORIGINATOR_WALLET_ADDRESS,
  },
  {
    name: "borrower",
    path: "/borrower",
    wallet: process.env.NEXT_PUBLIC_BORROWER_WALLET_ADDRESS,
  },
  {
    name: "pools",
    path: "/pools",
  },
];

const Nav = () => {
  const pathname = usePathname();
  const { address } = useAccount();

  return (
    <nav className="flex justify-between items-center">
      <div className="flex gap-8 px-8 py-4">
        {links
          .filter(
            (link) =>
              !link.wallet ||
              link.wallet.toLowerCase() === address?.toLowerCase()
          )
          .map((link, index) => (
            <Link
              href={link.path}
              key={index}
              className={`${
                link.path === pathname && "text-accent border-b-2 border-accent"
              } capitalize font-semibold hover:text-accent transition-all`}
            >
              {link.name}
            </Link>
          ))}
      </div>
      <div className="px-8 py-4">
        <appkit-button />
      </div>
    </nav>
  );
};

export default Nav;
