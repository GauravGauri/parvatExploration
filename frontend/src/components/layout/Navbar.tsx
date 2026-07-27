'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const { isAuthenticated, user, logout } = useAuthStore();
  const pathname = usePathname();

  const isHome = pathname === '/';

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', href: '/' },
    { name: 'Destinations', href: '/trips' },
    { name: 'About Us', href: '/about' },
    { name: 'Contact', href: '/contact' },
  ];

  const navbarBg = isHome && !isScrolled 
    ? 'bg-transparent text-white' 
    : 'bg-white/80 backdrop-blur-md shadow-sm text-slate-900 border-b border-slate-200';

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${navbarBg}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <div className="flex items-center">
            <Link href="/" className="flex items-center gap-2">
              <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${isHome && !isScrolled ? 'bg-white text-rose-600' : 'bg-rose-600 text-white'}`}>
                <span className="font-bold text-xl font-heading">P</span>
              </div>
              <span className="font-heading font-bold text-xl tracking-tight">Parvat<span className={isHome && !isScrolled ? 'text-rose-300' : 'text-rose-600'}>Exploration</span></span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <div className="flex space-x-6">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`text-sm font-medium transition-colors hover:opacity-70 ${
                    pathname === link.href ? 'opacity-100 font-bold border-b-2 border-rose-500' : 'opacity-80'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-4">
              {mounted && (isAuthenticated ? (
                <>
                  <div className={`flex items-center gap-2 mr-2 ${isHome && !isScrolled ? 'text-white' : 'text-slate-900'}`}>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${isHome && !isScrolled ? 'bg-white/20 text-white' : 'bg-rose-100 text-rose-600'}`}>
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="font-semibold text-sm hidden lg:block">{user?.name}</span>
                  </div>
                  {user?.role === 'admin' ? (
                    <Link href="/admin">
                      <Button variant={isHome && !isScrolled ? 'outline' : 'ghost'} className={isHome && !isScrolled ? 'text-white border-white hover:bg-white/10' : ''}>
                        Admin Panel
                      </Button>
                    </Link>
                  ) : (
                    <Link href="/dashboard">
                      <Button variant={isHome && !isScrolled ? 'outline' : 'ghost'} className={isHome && !isScrolled ? 'text-white border-white hover:bg-white/10' : ''}>
                        Dashboard
                      </Button>
                    </Link>
                  )}
                  <Button variant="primary" onClick={logout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link href="/login">
                    <Button variant={isHome && !isScrolled ? 'outline' : 'ghost'} className={isHome && !isScrolled ? 'text-white border-white hover:bg-white/10' : ''}>
                      Login
                    </Button>
                  </Link>
                  <Link href="/signup">
                    <Button variant="primary">Sign Up</Button>
                  </Link>
                </>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-md focus:outline-none"
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white shadow-xl border-t border-slate-100 text-slate-900"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  href={link.href}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="block px-3 py-3 rounded-md text-base font-medium hover:bg-slate-50"
                >
                  {link.name}
                </Link>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-100 flex flex-col gap-3">
                {mounted && (isAuthenticated ? (
                  <>
                    <div className="flex items-center gap-3 px-3 mb-2">
                      <div className="w-10 h-10 rounded-full bg-rose-100 text-rose-600 flex items-center justify-center font-bold text-lg">
                        {user?.name?.charAt(0).toUpperCase() || 'U'}
                      </div>
                      <div>
                        <p className="font-semibold text-slate-900">{user?.name}</p>
                        <p className="text-xs text-slate-500">{user?.email}</p>
                      </div>
                    </div>
                    {user?.role === 'admin' ? (
                      <Link href="/admin" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full justify-center" variant="outline">Admin Panel</Button>
                      </Link>
                    ) : (
                      <Link href="/dashboard" onClick={() => setIsMobileMenuOpen(false)}>
                        <Button className="w-full justify-center" variant="outline">Dashboard</Button>
                      </Link>
                    )}
                    <Button className="w-full justify-center" variant="primary" onClick={() => { logout(); setIsMobileMenuOpen(false); }}>
                      Logout
                    </Button>
                  </>
                ) : (
                  <>
                    <Link href="/login" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full justify-center" variant="outline">Login</Button>
                    </Link>
                    <Link href="/signup" onClick={() => setIsMobileMenuOpen(false)}>
                      <Button className="w-full justify-center" variant="primary">Sign Up</Button>
                    </Link>
                  </>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
