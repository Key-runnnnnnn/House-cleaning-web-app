"use client";
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
import {
  User,
  Calendar,
  LogOut,
  Menu,
  X,
  Home,
  Info,
  Search,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

function Header() {
  const { data, status } = useSession();
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/search/Cleaning", label: "Services", icon: Search },
    { href: "/about", label: "About Us", icon: Info },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white/95 backdrop-blur-md shadow-lg border-b border-gray-200/50"
          : "bg-white/80 backdrop-blur-sm"
      }`}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3 group">
          <div className="relative">
            <Image
              src="/h2.jpg"
              alt="logo"
              width={44}
              height={44}
              className="rounded-xl border-2 border-white shadow-lg transition-transform duration-200 group-hover:scale-110"
            />
          </div>
          <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
            HomeShine
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-1">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center space-x-2 px-4 py-2 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200 font-medium"
            >
              <item.icon className="h-4 w-4" />
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>

        {/* User section */}
        <div className="flex items-center space-x-4">
          {status === "loading" ? (
            <div className="h-8 w-8 animate-pulse rounded-full bg-gray-200" />
          ) : data?.user ? (
            <>
              {/* My Bookings Button - Hidden on mobile */}
              <Link href="/mybooking" className="hidden sm:block">
                <Button
                  variant="outline"
                  size="sm"
                  className="border-blue-200 text-blue-600 hover:bg-blue-50 hover:border-blue-300 transition-all duration-200"
                >
                  <Calendar className="h-4 w-4 mr-2" />
                  My Bookings
                </Button>
              </Link>

              {/* User Avatar Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-12 w-12 rounded-full ring-2 ring-transparent hover:ring-blue-200 transition-all duration-200"
                  >
                    <Image
                      src={data?.user?.image || "/default-avatar.png"}
                      alt="user"
                      width={44}
                      height={44}
                      className="rounded-full object-cover"
                    />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56 mt-2" align="end">
                  <DropdownMenuLabel className="flex items-center space-x-2">
                    <Image
                      src={data?.user?.image || "/default-avatar.png"}
                      alt="user"
                      width={40}
                      height={40}
                      className="rounded-full"
                    />
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium">{data?.user?.name}</p>
                      <p className="text-xs text-gray-500">
                        {data?.user?.email}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild className="cursor-pointer">
                    <Link href="/mybooking" className="flex items-center">
                      <Calendar className="mr-2 h-4 w-4" />
                      My Bookings
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    onClick={() => signOut()}
                    className="cursor-pointer text-red-600 focus:text-red-600 focus:bg-red-50"
                  >
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <Button
              onClick={() => signIn("descope")}
              className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium px-6 py-2 rounded-lg shadow-lg shadow-blue-200 hover:shadow-xl transition-all duration-200 transform hover:scale-105"
            >
              Sign In
            </Button>
          )}

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden hover:bg-gray-100 transition-colors duration-200"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col space-y-4 mt-6">
                <div className="flex items-center space-x-3 pb-4 border-b">
                  <Image
                    src="/h2.jpg"
                    alt="logo"
                    width={36}
                    height={36}
                    className="rounded-lg"
                  />
                  <span className="text-lg font-bold text-blue-600">
                    HomeShine
                  </span>
                </div>

                {/* Mobile Navigation */}
                <nav className="flex flex-col space-y-2">
                  {navItems.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                    >
                      <item.icon className="h-5 w-5" />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  ))}

                  {data?.user && (
                    <Link
                      href="/mybooking"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-gray-700 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
                    >
                      <Calendar className="h-5 w-5" />
                      <span className="font-medium">My Bookings</span>
                    </Link>
                  )}
                </nav>

                {/* Mobile User Section */}
                {data?.user && (
                  <div className="pt-4 border-t">
                    <div className="flex items-center space-x-3 px-4 py-3">
                      <Image
                        src={data?.user?.image || "/default-avatar.png"}
                        alt="user"
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">
                          {data?.user?.name}
                        </p>
                        <p className="text-xs text-gray-500">
                          {data?.user?.email}
                        </p>
                      </div>
                    </div>
                    <Button
                      onClick={() => signOut()}
                      variant="ghost"
                      className="w-full justify-start text-red-600 hover:text-red-600 hover:bg-red-50 mt-2"
                    >
                      <LogOut className="mr-2 h-4 w-4" />
                      Sign Out
                    </Button>
                  </div>
                )}

                {/* Mobile Sign In */}
                {!data?.user && (
                  <div className="pt-4 border-t">
                    <Button
                      onClick={() => signIn("descope")}
                      className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-medium"
                    >
                      Sign In / Sign Up
                    </Button>
                  </div>
                )}
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}

export default Header;
