'use client';

import React from 'react';
import Link from 'next/link';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-amber-400 to-orange-600
                flex items-center justify-center shadow-lg shadow-amber-500/25">
                                <span className="text-white font-black text-lg">S</span>
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">Speed Way</h3>
                                <p className="text-[10px] text-amber-400 font-medium tracking-wider uppercase">
                                    Vacation Rentals
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            Discover luxury vacation homes curated for unforgettable
                            experiences. Your dream getaway awaits.
                        </p>
                        <div className="flex gap-3">
                            {[Instagram, Facebook, Twitter].map((Icon, i) => (
                                <a
                                    key={i}
                                    href="#"
                                    className="w-9 h-9 rounded-lg bg-slate-800/50 border border-slate-700/50
                    flex items-center justify-center text-slate-400
                    hover:text-amber-400 hover:border-amber-500/50 hover:bg-amber-500/10
                    transition-all duration-300"
                                >
                                    <Icon className="w-4 h-4" />
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Quick Links</h4>
                        <ul className="space-y-2.5">
                            {[
                                { href: '/', label: 'Home' },
                                { href: '/properties', label: 'Properties' },
                                { href: '/login', label: 'Sign In' },
                                { href: '/register', label: 'Get Started' },
                            ].map(({ href, label }) => (
                                <li key={href}>
                                    <Link
                                        href={href}
                                        className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
                                    >
                                        {label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Property Types */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Property Types</h4>
                        <ul className="space-y-2.5">
                            {['Villas', 'Apartments', 'Cottages', 'Cabins', 'Penthouses', 'Beach Houses'].map(
                                (type) => (
                                    <li key={type}>
                                        <Link
                                            href={`/properties?type=${type.toLowerCase().replace(' ', '-')}`}
                                            className="text-sm text-slate-400 hover:text-amber-400 transition-colors"
                                        >
                                            {type}
                                        </Link>
                                    </li>
                                )
                            )}
                        </ul>
                    </div>

                    {/* Contact */}
                    <div>
                        <h4 className="text-white font-semibold mb-4">Contact Us</h4>
                        <ul className="space-y-3">
                            <li className="flex items-start gap-2.5 text-sm text-slate-400">
                                <MapPin className="w-4 h-4 text-amber-500 flex-shrink-0 mt-0.5" />
                                <span>123 Luxury Avenue,<br />Paradise City, FL 33101</span>
                            </li>
                            <li className="flex items-center gap-2.5 text-sm text-slate-400">
                                <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                <span>+1 (555) 123-4567</span>
                            </li>
                            <li className="flex items-center gap-2.5 text-sm text-slate-400">
                                <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                <span>hello@speedwayrentals.com</span>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} Speed Way Vacation Rentals. All rights reserved.
                    </p>
                    <div className="flex gap-5 text-xs text-slate-500">
                        <a href="#" className="hover:text-slate-300 transition-colors">Privacy Policy</a>
                        <a href="#" className="hover:text-slate-300 transition-colors">Terms of Service</a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
