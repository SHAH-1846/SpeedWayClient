'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { MapPin, Phone, Mail, Instagram, Facebook, Twitter } from 'lucide-react';
import { COMPANY } from '@/lib/companyConfig';

const Footer: React.FC = () => {
    return (
        <footer className="bg-slate-950 border-t border-slate-800/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
                    {/* Brand */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-xl overflow-hidden shadow-lg shadow-amber-500/25">
                                <Image
                                    src="/logo.jpg"
                                    alt={COMPANY.brandName}
                                    width={40}
                                    height={40}
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-white">{COMPANY.brandName}</h3>
                                <p className="text-[10px] text-amber-400 font-medium tracking-wider uppercase">
                                    {COMPANY.tagline}
                                </p>
                            </div>
                        </div>
                        <p className="text-sm text-slate-400 leading-relaxed">
                            {COMPANY.philosophy}
                        </p>
                        <div className="flex gap-3">
                            {[
                                { Icon: Instagram, href: COMPANY.social.instagram },
                                { Icon: Facebook, href: COMPANY.social.facebook },
                                { Icon: Twitter, href: COMPANY.social.twitter },
                            ].map(({ Icon, href }, i) => (
                                <a
                                    key={i}
                                    href={href}
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
                                { href: '/about', label: 'About Us' },
                                { href: '/contact', label: 'Contact Us' },
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
                                <a
                                    href={COMPANY.headquarters.googleMapsUrl}
                                    target="_blank"
                                    className="hover:text-amber-400 transition-colors"
                                >
                                    {COMPANY.headquarters.building}, {COMPANY.headquarters.area},<br />
                                    {COMPANY.headquarters.floor}, {COMPANY.headquarters.office},<br />
                                    {COMPANY.headquarters.city}, {COMPANY.headquarters.country}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={COMPANY.contact.phoneHref}
                                    className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-amber-400 transition-colors"
                                >
                                    <Phone className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                    {COMPANY.contact.phone}
                                </a>
                            </li>
                            <li>
                                <a
                                    href={COMPANY.contact.emailHref}
                                    className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-amber-400 transition-colors"
                                >
                                    <Mail className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                    {COMPANY.contact.email}
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="mt-12 pt-8 border-t border-slate-800/50 flex flex-col sm:flex-row items-center justify-between gap-3">
                    <p className="text-xs text-slate-500">
                        © {new Date().getFullYear()} {COMPANY.legalName} ({COMPANY.parentEntity}). All rights reserved.
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
