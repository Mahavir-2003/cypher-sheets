import { UserButton } from "@clerk/nextjs";
import React from "react";
import { ModeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-10 border-border border-[1px] rounded-md py-2">
      <h1 className="text-xl font-semibold tracking-wide">Cypher Sheets</h1>
      <div className="flex justify-center items-center gap-x-5">
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;