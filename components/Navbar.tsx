"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X, HeartPulse, LogOut } from "lucide-react";
import { useAuth } from "@/hooks/use-auth";
import Image from "next/image";

const navigation = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Doctors", href: "/doctors" },
  { name: "Contact", href: "/contact" },
];

export function Navbar() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, signInWithGoogle, signOut, loading } = useAuth();

  return (
    <header className="bg-white sticky top-0 z-50 border-b border-slate-200 shadow-sm transition-all duration-300">
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4 lg:px-8 gap-4" aria-label="Global">
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2 group">
            <div className="bg-blue-600 text-white p-2 rounded-xl group-hover:bg-blue-700 transition-colors">
              <HeartPulse className="h-6 w-6" />
            </div>
            <span className="text-xl font-bold tracking-tight text-slate-900 group-hover:text-blue-600 transition-colors">WeCare</span>
          </Link>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-slate-700 hover:text-blue-600"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Menu className="h-6 w-6" aria-hidden="true" />
          </button>
        </div>
        <div className="hidden lg:flex lg:gap-x-6 xl:gap-x-10">
          {navigation.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-semibold leading-6 transition-colors ${
                  isActive ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </div>
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:items-center lg:gap-4 xl:gap-5 whitespace-nowrap">
          {!loading && (
            <>
              {user ? (
                <>
                  {user.email === 'darshjainteam@gmail.com' ? (
                    <Link
                      href="/admin"
                      className={`text-sm font-semibold leading-6 transition-colors whitespace-nowrap shrink-0 ${
                        pathname === "/admin" ? "text-red-600" : "text-slate-700 hover:text-red-600"
                      }`}
                    >
                      Admin Panel
                    </Link>
                  ) : (
                    <Link
                      href="/my-bookings"
                      className={`text-sm font-semibold leading-6 transition-colors whitespace-nowrap shrink-0 ${
                        pathname === "/my-bookings" ? "text-blue-600" : "text-slate-700 hover:text-blue-600"
                      }`}
                    >
                      My Bookings
                    </Link>
                  )}
                  <div className="flex items-center gap-3 pr-4 border-r border-slate-200 shrink-0">
                    <span className="text-sm font-medium text-slate-700 truncate max-w-[120px]">{user.displayName || user.email}</span>
                    {user.photoURL ? (
                      <img src={user.photoURL} alt="Profile" className="rounded-full h-8 w-8 object-cover" />
                    ) : (
                      <div className="w-8 h-8 rounded-full bg-slate-200 flex items-center justify-center">
                        <span className="text-slate-600 font-medium text-sm">{user.email?.charAt(0).toUpperCase()}</span>
                      </div>
                    )}
                  </div>
                  <button
                    onClick={signOut}
                    className="p-2 text-slate-500 hover:text-red-600 transition-colors rounded-full hover:bg-slate-50"
                    title="Sign Out"
                  >
                    <LogOut className="h-5 w-5" />
                  </button>
                  <Link
                    href="/book"
                    className="rounded-full bg-blue-600 px-6 py-2.5 text-sm font-semibold text-white shadow-md shadow-blue-600/20 hover:bg-blue-700 hover:shadow-blue-600/30 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 transition-all ml-2 shrink-0"
                  >
                    Book Appointment
                  </Link>
                </>
              ) : (
                <Link
                  href="/sign-in"
                  className="rounded-full bg-slate-900 px-6 py-2.5 text-sm font-semibold text-white shadow-md hover:bg-slate-800 transition-all shrink-0"
                >
                  Sign In
                </Link>
              )}
            </>
          )}
        </div>
      </nav>
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-x-0 top-0 z-50 bg-white shadow-2xl p-6 rounded-b-3xl max-h-screen overflow-y-auto">
            <div className="flex items-center justify-between">
              <Link href="/" className="-m-1.5 p-1.5 flex items-center gap-2" onClick={() => setMobileMenuOpen(false)}>
                <div className="bg-blue-600 text-white p-2 rounded-xl">
                  <HeartPulse className="h-5 w-5" />
                </div>
                <span className="text-xl font-bold tracking-tight text-slate-900">WeCare</span>
              </Link>
              <button
                type="button"
                className="-m-2.5 rounded-md p-2.5 text-slate-700 bg-slate-50 hover:bg-slate-100"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="sr-only">Close menu</span>
                <X className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>
            <div className="mt-8 flow-root">
              <div className="-my-6 divide-y divide-slate-200">
                <div className="space-y-4 py-6">
                  {navigation.map((item) => {
                    const isActive = pathname === item.href;
                    return (
                      <Link
                        key={item.name}
                        href={item.href}
                        onClick={() => setMobileMenuOpen(false)}
                        className={`-mx-3 block rounded-xl px-3 py-3 text-base font-semibold leading-7 transition-colors ${
                          isActive ? "text-blue-600 bg-blue-50" : "text-slate-900 hover:bg-slate-50"
                        }`}
                      >
                        {item.name}
                      </Link>
                    );
                  })}
                </div>
                <div className="py-6">
                  {!loading && (
                    user ? (
                      <div className="space-y-4">
                        <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl">
                           {user.photoURL ? (
                             <img src={user.photoURL} alt="Profile" className="rounded-full h-10 w-10 object-cover" />
                           ) : (
                             <div className="w-10 h-10 rounded-full bg-slate-200 flex items-center justify-center">
                               <span className="text-slate-600 font-medium">{user.email?.charAt(0).toUpperCase()}</span>
                             </div>
                           )}
                           <div className="flex flex-col">
                             <span className="text-sm font-bold text-slate-900">{user.displayName || "Patient"}</span>
                             <span className="text-xs text-slate-500">{user.email}</span>
                           </div>
                        </div>
                        {user.email === 'darshjainteam@gmail.com' ? (
                          <Link
                            href="/admin"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-mx-3 block w-full rounded-xl px-3 py-3 text-base font-semibold leading-7 text-red-600 bg-red-50 hover:bg-red-100 text-center mb-2"
                          >
                            Admin Panel
                          </Link>
                        ) : (
                          <Link
                            href="/my-bookings"
                            onClick={() => setMobileMenuOpen(false)}
                            className="-mx-3 block w-full rounded-xl px-3 py-3 text-base font-semibold leading-7 text-blue-600 bg-blue-50 hover:bg-blue-100 text-center mb-2"
                          >
                            My Bookings
                          </Link>
                        )}
                        <Link
                          href="/book"
                          onClick={() => setMobileMenuOpen(false)}
                          className="-mx-3 block w-full rounded-xl px-3 py-3 text-base font-semibold leading-7 text-white bg-blue-600 hover:bg-blue-700 text-center shadow-md shadow-blue-600/20"
                        >
                          Book Appointment
                        </Link>
                        <button
                          onClick={() => {
                            signOut();
                            setMobileMenuOpen(false);
                          }}
                          className="-mx-3 block w-full rounded-xl px-3 py-3 text-base font-semibold leading-7 text-red-600 bg-red-50 hover:bg-red-100 text-center"
                        >
                          Sign Out
                        </button>
                      </div>
                    ) : (
                      <Link
                        href="/sign-in"
                        onClick={() => setMobileMenuOpen(false)}
                        className="-mx-3 block w-full rounded-xl px-3 py-3 text-base font-semibold leading-7 text-white bg-slate-900 hover:bg-slate-800 text-center"
                      >
                        Sign In
                      </Link>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>
      )}
    </header>
  );
}
