"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Menu,
  X,
  Search,
  Bell,
  User,
  LogOut,
  Home,
  Film,
  Tv,
  Bookmark,
  Crown,
  PlayCircle,
  Settings,
  ChevronDown,
  Sparkles,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/context/auth-context";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const pathname = usePathname();

  const auth = useAuth();
  const user = auth?.user;
  const signOut = auth?.signOut;

  const isAuthPage =
    pathname?.includes("/login") ||
    pathname?.includes("/forgot-password");

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't render navbar on auth pages
  if (isAuthPage) return null;

  const navLinks = [
    { href: "/", label: "Home", icon: Home },
    { href: "/shows", label: "Browse", icon: PlayCircle },
    { href: "/movies", label: "Movies", icon: Film },
    { href: "/series", label: "Series", icon: Tv },
    { href: "/watchlist", label: "My List", icon: Bookmark },
  ];

  const handleSignOut = async () => {
    if (signOut) {
      await signOut();
    }
  };

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-black/95 backdrop-blur-xl shadow-2xl shadow-red-500/10"
            : "bg-gradient-to-b from-black/80 via-black/40 to-transparent"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-8">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center gap-3 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-600 to-purple-600 blur-xl opacity-50 group-hover:opacity-75 transition-opacity" />
                <Sparkles className="w-8 h-8 text-red-500 relative z-10" />
              </div>
              <span className="text-2xl font-black tracking-tighter">
                <span className="bg-gradient-to-r from-red-500 via-red-600 to-purple-600 bg-clip-text text-transparent">
                  BLACK
                </span>
                <span className="text-white">STREAM</span>
              </span>
              <Badge className="bg-red-600 text-white text-[10px] px-1.5 py-0 hidden sm:block">
                HD
              </Badge>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                const isActive = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="relative group px-4 py-2"
                  >
                    <motion.div
                      className={`flex items-center gap-2 text-sm font-semibold transition-all ${
                        isActive
                          ? "text-white"
                          : "text-gray-300 group-hover:text-white"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Icon className="w-4 h-4" />
                      {link.label}
                    </motion.div>
                    {isActive && (
                      <motion.div
                        layoutId="navbar-indicator"
                        className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-red-500 to-purple-600 rounded-full"
                        transition={{
                          type: "spring",
                          stiffness: 380,
                          damping: 30,
                        }}
                      />
                    )}
                    {!isActive && (
                      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white opacity-0 group-hover:opacity-20 transition-opacity rounded-full" />
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Right side actions */}
            <div className="flex items-center gap-3">
              {/* Search */}
              <AnimatePresence>
                {searchOpen ? (
                  <motion.div
                    initial={{ width: 0, opacity: 0 }}
                    animate={{ width: 280, opacity: 1 }}
                    exit={{ width: 0, opacity: 0 }}
                    className="hidden md:block"
                  >
                    <div className="relative">
                      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                      <Input
                        type="text"
                        placeholder="Search titles, actors..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        onBlur={() => {
                          if (!searchQuery) setSearchOpen(false);
                        }}
                        autoFocus
                        className="pl-10 bg-black/50 border-gray-700 text-white placeholder:text-gray-500 focus:border-red-500 h-10"
                      />
                      <button
                        onClick={() => {
                          setSearchOpen(false);
                          setSearchQuery("");
                        }}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </motion.div>
                ) : (
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={() => setSearchOpen(true)}
                    className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors"
                  >
                    <Search className="h-5 w-5 text-gray-300" />
                  </motion.button>
                )}
              </AnimatePresence>

              {user ? (
                <>
                  {/* Notifications */}
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    className="hidden md:flex items-center justify-center w-10 h-10 rounded-full hover:bg-white/10 transition-colors relative"
                  >
                    <Bell className="h-5 w-5 text-gray-300" />
                    <span className="absolute top-1 right-1 w-2 h-2 bg-red-600 rounded-full" />
                  </motion.button>

                  {/* Profile Dropdown */}
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="ghost"
                        className="relative h-10 gap-2 pl-2 pr-3 rounded-full hover:bg-white/10"
                      >
                        <Avatar className="h-8 w-8 ring-2 ring-red-500/50">
                          <AvatarImage
                            src={user.photoURL || undefined}
                            alt={user.displayName || "User"}
                          />
                          <AvatarFallback className="bg-gradient-to-br from-red-500 to-purple-600 text-white">
                            {user.displayName?.charAt(0) ||
                              user.email?.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <ChevronDown className="h-4 w-4 text-gray-300 hidden md:block" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent
                      className="w-64 bg-black/95 backdrop-blur-xl border-gray-800"
                      align="end"
                      forceMount
                    >
                      <DropdownMenuLabel className="font-normal">
                        <div className="flex items-center gap-3 p-2">
                          <Avatar className="h-12 w-12 ring-2 ring-red-500/50">
                            <AvatarImage
                              src={user.photoURL || undefined}
                              alt={user.displayName || "User"}
                            />
                            <AvatarFallback className="bg-gradient-to-br from-red-500 to-purple-600 text-white">
                              {user.displayName?.charAt(0) ||
                                user.email?.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col">
                            <p className="text-sm font-semibold text-white">
                              {user.displayName || "User"}
                            </p>
                            <p className="text-xs text-gray-400 truncate max-w-[150px]">
                              {user.email}
                            </p>
                          </div>
                        </div>
                      </DropdownMenuLabel>
                      <DropdownMenuSeparator className="bg-gray-800" />
                      <DropdownMenuItem
                        asChild
                        className="hover:bg-white/5 cursor-pointer"
                      >
                        <Link href="/profile" className="flex items-center">
                          <User className="mr-3 h-4 w-4 text-gray-400" />
                          <span className="text-gray-200">Profile</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        className="hover:bg-white/5 cursor-pointer"
                      >
                        <Link href="/watchlist" className="flex items-center">
                          <Bookmark className="mr-3 h-4 w-4 text-gray-400" />
                          <span className="text-gray-200">My List</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        className="hover:bg-white/5 cursor-pointer"
                      >
                        <Link
                          href="/subscription"
                          className="flex items-center"
                        >
                          <Crown className="mr-3 h-4 w-4 text-yellow-500" />
                          <span className="text-gray-200">Subscription</span>
                          <Badge className="ml-auto bg-yellow-500/20 text-yellow-500 text-xs">
                            Premium
                          </Badge>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        asChild
                        className="hover:bg-white/5 cursor-pointer"
                      >
                        <Link href="/profile" className="flex items-center">
                          <Settings className="mr-3 h-4 w-4 text-gray-400" />
                          <span className="text-gray-200">Settings</span>
                        </Link>
                      </DropdownMenuItem>
                      <DropdownMenuSeparator className="bg-gray-800" />
                      <DropdownMenuItem
                        onClick={handleSignOut}
                        className="hover:bg-red-500/10 cursor-pointer text-red-400"
                      >
                        <LogOut className="mr-3 h-4 w-4" />
                        <span>Sign Out</span>
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </>
              ) : (
                <Button
                  asChild
                  className="bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 text-white font-semibold shadow-lg shadow-red-500/50"
                >
                  <Link href="/login">Sign In</Link>
                </Button>
              )}

              {/* Mobile menu button */}
              <Button
                variant="ghost"
                size="icon"
                className="lg:hidden hover:bg-white/10"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-6 w-6 text-white" />
                ) : (
                  <Menu className="h-6 w-6 text-white" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden bg-black/95 backdrop-blur-xl border-t border-gray-800"
            >
              <div className="container mx-auto px-4 py-6">
                {/* Mobile Search */}
                <div className="mb-6">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                      type="text"
                      placeholder="Search..."
                      className="pl-10 bg-white/5 border-gray-700 text-white"
                    />
                  </div>
                </div>

                {/* Mobile Links */}
                <nav className="flex flex-col space-y-1">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = pathname === link.href;
                    return (
                      <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 p-4 rounded-lg transition-colors ${
                          isActive
                            ? "bg-red-600 text-white"
                            : "text-gray-300 hover:bg-white/5 hover:text-white"
                        }`}
                        onClick={() => setIsOpen(false)}
                      >
                        <Icon className="w-5 h-5" />
                        <span className="font-medium">{link.label}</span>
                      </Link>
                    );
                  })}
                </nav>

                {/* Mobile User Actions */}
                {user && (
                  <div className="mt-6 pt-6 border-t border-gray-800">
                    <div className="flex flex-col space-y-1">
                      <Link
                        href="/profile"
                        className="flex items-center gap-3 p-4 rounded-lg text-gray-300 hover:bg-white/5 hover:text-white transition-colors"
                        onClick={() => setIsOpen(false)}
                      >
                        <Settings className="w-5 h-5" />
                        <span className="font-medium">Settings</span>
                      </Link>
                      <button
                        onClick={() => {
                          handleSignOut();
                          setIsOpen(false);
                        }}
                        className="flex items-center gap-3 p-4 rounded-lg text-red-400 hover:bg-red-500/10 transition-colors text-left"
                      >
                        <LogOut className="w-5 h-5" />
                        <span className="font-medium">Sign Out</span>
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.header>

      {/* Spacer to prevent content from going under navbar */}
      <div className="h-20" />
    </>
  );
}
