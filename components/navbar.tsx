"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, Search, Bell, User, LogOut } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useMobile } from "@/hooks/use-mobile";
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
  const isMobile = useMobile();
  const pathname = usePathname();

  const auth = useAuth();
  const user = auth?.user;
  const signOut = auth?.signOut;

  const isAuthPage =
    pathname?.includes("/login") ||
    pathname?.includes("/register") ||
    pathname?.includes("/forgot-password");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Don't render navbar on auth pages
  if (isAuthPage) return null;

  const navLinks = [
    { href: "/", label: "Home" },
    { href: "/shows", label: "Shows" },
    { href: "/movies", label: "Movies" },
    { href: "/series", label: "Series" },
    { href: "/video-demo", label: "Player Demo" },
  ];

  const handleSignOut = async () => {
    if (signOut) {
      await signOut();
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-background/80 backdrop-blur-md shadow-md"
          : "bg-gradient-to-b from-background/80 to-transparent"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center">
            <span className="text-xl font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-600">
              BLACKSTREAM
            </span>
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <nav className="hidden md:flex items-center space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:text-primary ${
                    pathname === link.href
                      ? "text-primary"
                      : "text-muted-foreground"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </nav>
          )}

          {/* Right side actions */}
          <div className="flex items-center space-x-4">
            <Link
              href="/shows"
              className="text-muted-foreground hover:text-foreground"
            >
              <Search className="h-5 w-5" />
            </Link>

            {user ? (
              <>
                <Link
                  href="/watchlist"
                  className="text-muted-foreground hover:text-foreground"
                >
                  <Bell className="h-5 w-5" />
                </Link>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      className="relative h-8 w-8 rounded-full"
                    >
                      <Avatar className="h-8 w-8">
                        <AvatarImage
                          src={user.photoURL || undefined}
                          alt={user.displayName || "User"}
                        />
                        <AvatarFallback>
                          {user.displayName?.charAt(0) || user.email?.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="w-56" align="end" forceMount>
                    <DropdownMenuLabel className="font-normal">
                      <div className="flex flex-col space-y-1">
                        <p className="text-sm font-medium leading-none">
                          {user.displayName || "User"}
                        </p>
                        <p className="text-xs leading-none text-muted-foreground">
                          {user.email}
                        </p>
                      </div>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem asChild>
                      <Link href="/profile">
                        <User className="mr-2 h-4 w-4" />
                        <span>Profile</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/watchlist">
                        <span>My List</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link href="/subscription">
                        <span>Subscription</span>
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleSignOut}>
                      <LogOut className="mr-2 h-4 w-4" />
                      <span>Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
            ) : (
              <Button asChild size="sm">
                <Link href="/login">Sign In</Link>
              </Button>
            )}

            {/* Mobile menu button */}
            {isMobile && (
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                onClick={() => setIsOpen(!isOpen)}
              >
                {isOpen ? (
                  <X className="h-6 w-6" />
                ) : (
                  <Menu className="h-6 w-6" />
                )}
              </Button>
            )}
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {isMobile && isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-background border-t"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    className={`text-sm font-medium transition-colors hover:text-primary ${
                      pathname === link.href
                        ? "text-primary"
                        : "text-muted-foreground"
                    }`}
                    onClick={() => setIsOpen(false)}
                  >
                    {link.label}
                  </Link>
                ))}
                {user ? (
                  <>
                    <Link
                      href="/profile"
                      className="text-sm font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      Profile
                    </Link>
                    <Link
                      href="/watchlist"
                      className="text-sm font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      My List
                    </Link>
                    <button
                      onClick={handleSignOut}
                      className="text-sm font-medium text-left text-red-500 hover:text-red-600 transition-colors"
                    >
                      Sign Out
                    </button>
                  </>
                ) : (
                  <Link
                    href="/login"
                    className="text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    onClick={() => setIsOpen(false)}
                  >
                    Sign In
                  </Link>
                )}
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
