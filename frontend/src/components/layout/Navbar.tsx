'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/store/useAuthStore';
import { Button } from '@/components/ui/Button';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X, User, ChevronDown, LogOut, LayoutDashboard } from 'lucide-react';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
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
              <div className={`w-8 h-8 shrink-0 rounded-lg flex items-center justify-center ${isHome && !isScrolled ? 'bg-white text-rose-600' : 'bg-rose-600 text-white'}`}>
                <span className="font-bold text-xl font-heading">P</span>
              </div>
              <span className="font-heading font-bold text-lg sm:text-xl tracking-tight truncate">Parvat<span className={isHome && !isScrolled ? 'text-rose-300' : 'text-rose-600'}>Exploration</span></span>
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
                <div className="relative">
                  <button
                    onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
                    className={`flex items-center gap-2 p-1.5 rounded-full hover:bg-slate-100/10 transition-colors ${isHome && !isScrolled ? 'text-white' : 'text-slate-900'}`}
                  >
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg ${isHome && !isScrolled ? 'bg-white text-rose-600' : 'bg-rose-100 text-rose-600'}`}>
                      {user?.name?.charAt(0).toUpperCase() || 'U'}
                    </div>
                    <span className="font-semibold text-sm hidden lg:block ml-1">{user?.name}</span>
                    <ChevronDown className={`w-4 h-4 hidden lg:block transition-transform ${isUserMenuOpen ? 'rotate-180' : ''}`} />
                  </button>

                  {isUserMenuOpen && (
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setIsUserMenuOpen(false)}
                    />
                  )}

                  <AnimatePresence>
                    {isUserMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                        animate={{ opacity: 1, y: 0, scale: 1 }}
                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                        transition={{ duration: 0.15 }}
                        className="absolute right-0 mt-2 w-56 bg-white rounded-xl shadow-lg border border-slate-100 py-2 text-slate-700 z-50 overflow-hidden"
                      >
                        <div className="px-4 py-3 border-b border-slate-100 mb-1 bg-slate-50/50">
                          <p className="font-semibold text-slate-900 truncate">{user?.name}</p>
                          <p className="text-xs text-slate-500 truncate">{user?.email}</p>
                        </div>
                        
                        {user?.role === 'admin' ? (
                          <Link href="/admin" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 hover:text-rose-600 transition-colors">
                            <LayoutDashboard className="w-4 h-4" />
                            <span className="text-sm font-medium">Admin Panel</span>
                          </Link>
                        ) : (
                          <Link href="/dashboard" onClick={() => setIsUserMenuOpen(false)} className="flex items-center gap-3 px-4 py-2.5 hover:bg-slate-50 hover:text-rose-600 transition-colors">
                            <LayoutDashboard className="w-4 h-4" />
                            <span className="text-sm font-medium">Dashboard</span>
                          </Link>
                        )}
                        
                        <div className="h-px bg-slate-100 my-1 mx-2" />
                        
                        <button
                          onClick={() => {
                            logout();
                            setIsUserMenuOpen(false);
                          }}
                          className="w-full flex items-center gap-3 px-4 py-2.5 hover:bg-rose-50 text-rose-600 transition-colors"
                        >
                          <LogOut className="w-4 h-4" />
                          <span className="text-sm font-medium">Logout</span>
                        </button>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
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
