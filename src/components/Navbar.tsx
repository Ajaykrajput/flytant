import React from "react";
import todo_logo from "../../public/todo_logo.png";
import Image from "next/image";
import Link from "next/link";

const Navbar = () => {
  return (
    <div className="flex w-full h-[88px] bg-[#FFFFFF]">
      <Link href={"/"} className="flex items-center ml-10 gap-4">
        <Image src={todo_logo} alt="logo_todo" className="w-8 h-8" />
        <span className="text-black font-semibold text-3xl">TODO</span>
      </Link>
    </div>
  );
};

export default Navbar;
