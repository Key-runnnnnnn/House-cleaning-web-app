"use client"
import { Button } from "@/components/ui/button";
import { signIn, signOut, useSession } from "next-auth/react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

function Header() {
  const { data } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    console.log(data);
  }, [data]);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="p-5 shadow-sm flex justify-between">
      <div className="flex items-center gap-8">
        <Link href={"/"}>
          <Image
            src="/h2.jpg"
            alt="logo"
            width={50}
            height={50}
            className="border rounded-lg"
          />
        </Link>
        <div className="md:flex items-center gap-6 hidden">
          <Link
            href={"/"}
            className="font-bold text-[20px] hover:scale-105 text-primary"
          >
            HomeShine
          </Link>
          <Link
            href={"/"}
            className="hover:scale-105 hover:text-primary cursor-pointer"
          >
            Home
          </Link>
          <Link
            href={"/search/Cleaning"}
            className="hover:scale-105 hover:text-primary cursor-pointer"
          >
            Services
          </Link>
          <Link
            href={"/about"}
            className="hover:scale-105 hover:text-primary cursor-pointer"
          >
            About Us
          </Link>
        </div>
      </div>
      <div>
        <div className="md:hidden">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button onClick={toggleMenu}>Menu</Button>
            </DropdownMenuTrigger>
            {isMenuOpen && (
              <DropdownMenuContent>
                <DropdownMenuLabel>Navigation</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={"/"}>Home</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/search/Cleaning"}>Services</Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                  <Link href={"/about"}>About Us</Link>
                </DropdownMenuItem>
                {data?.user && (
                  <>
                    <DropdownMenuSeparator />
                    <DropdownMenuLabel>Account</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      <Link href={"/mybooking"}>My Booking</Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => signOut()}>
                      Logout
                    </DropdownMenuItem>
                  </>
                )}
                {!data?.user && (
                  <DropdownMenuItem>
                    <Button onClick={() => signIn("descope")}>
                      Login / Sign Up
                    </Button>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            )}
          </DropdownMenu>
        </div>
        <div className="hidden md:block">
          {data?.user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Image
                  src={data?.user?.image}
                  alt="user"
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>
                  <Link href={"/mybooking"}>My Booking</Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => signOut()}>
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <Button onClick={() => signIn("descope")}>Login / Sign Up</Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;
