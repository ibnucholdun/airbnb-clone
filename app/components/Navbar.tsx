import Link from "next/link";
import React from "react";
import DesktopLogo from "@/public/airbnb-desktop.png";
import MobileLogo from "@/public/airbnb-mobile.webp";
import Image from "next/image";
import UserNav from "./UserNav";

type Props = {};

const Navbar = (props: Props) => {
  return (
    <nav className="w-full border-b">
      <div className="flex items-center justify-between container mx-auto px-5 lg-px-10 py-5">
        <Link href="/">
          <Image
            src={DesktopLogo}
            alt="Desktop Logo"
            className="w-32 hidden lg:block"
          />
          <Image
            src={MobileLogo}
            alt="Mobile Logo"
            className="block lg:hidden w-12"
          />
        </Link>
        <div className="rounded-full border px-5 py-2">
          <h1>Search</h1>
        </div>
        <UserNav />
      </div>
    </nav>
  );
};

export default Navbar;
