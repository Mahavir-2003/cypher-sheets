import { UserButton } from "@clerk/nextjs";
import React from "react";
import { ModeToggle } from "./ThemeToggle";

const Navbar = () => {
  return (
    <nav className="w-full flex justify-between items-center px-6 border-border border-[1px] rounded-md py-2 lg:px-10">
      <h1 className="text-xl font-semibold tracking-wide">Cypher Sheets</h1>
      <div className="flex justify-center items-center gap-x-4">
        <ModeToggle />
        <UserButton />
      </div>
    </nav>
  );
};

export default Navbar;