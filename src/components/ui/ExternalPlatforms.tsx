'use client';

import React from 'react';
import { motion } from 'framer-motion';
import { ExternalLink, BadgeCheck } from 'lucide-react';

// ─── Platform Config ────────────────────────────────
const PLATFORMS = [
    {
        key: 'airbnb' as const,
        name: 'Airbnb',
        color: '#FF5A5F',
        bg: 'rgba(255, 90, 95, 0.08)',
        border: 'rgba(255, 90, 95, 0.20)',
        hoverBg: 'rgba(255, 90, 95, 0.15)',
        badge: 'Superhost',
        cta: 'View on Airbnb',
        globalUrl: 'https://www.airbnb.ae/rooms/1586782882613135635',
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.6 0 12 0zm5.1 17.4c-.3.6-.9 1-1.5 1.2-.2 0-.4.1-.6.1-.5 0-1-.2-1.5-.5-.6-.4-1.2-.9-1.8-1.5-.8-.9-1.5-1.9-1.7-2.2-.2.3-.9 1.3-1.7 2.2-.6.6-1.2 1.1-1.8 1.5-.5.3-1 .5-1.5.5-.2 0-.4 0-.6-.1-.6-.2-1.2-.6-1.5-1.2-.3-.6-.4-1.3-.3-2.1.2-1.1.7-2.3 1.5-3.6.9-1.4 2.1-2.8 3.5-4.2.2-.2.4-.4.5-.5l.4-.4.4.4c.2.2.3.3.5.5 1.4 1.4 2.6 2.8 3.5 4.2.8 1.3 1.3 2.5 1.5 3.6.1.8 0 1.5-.3 2.1z" />
            </svg>
        ),
    },
    {
        key: 'bookingCom' as const,
        name: 'Booking.com',
        color: '#003580',
        bg: 'rgba(0, 53, 128, 0.08)',
        border: 'rgba(0, 53, 128, 0.20)',
        hoverBg: 'rgba(0, 53, 128, 0.15)',
        badge: 'Verified Listing',
        cta: 'View on Booking.com',
        globalUrl: 'https://www.booking.com/Share-24JCOS',
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M2.27 5.07h4.73c2.73 0 4.07 1.2 4.07 3.2 0 1.47-.8 2.53-2.13 3 1.6.4 2.53 1.6 2.53 3.2 0 2.27-1.53 3.53-4.4 3.53H2.27V5.07zm4.4 5.47c1.2 0 1.87-.6 1.87-1.6s-.67-1.53-1.87-1.53H4.93v3.13h1.74zm.27 5.73c1.33 0 2.07-.67 2.07-1.73 0-1.07-.74-1.67-2.07-1.67H4.93v3.4h2.01zM18.8 18.27c-.93 0-1.67-.4-2.13-1.13v.86h-2.54V5.07h2.67v5.2c.46-.73 1.2-1.13 2.13-1.13 2 0 3.33 1.6 3.33 4.53 0 3-1.33 4.6-3.46 4.6zm-.73-7.14c-1.13 0-1.73.93-1.73 2.47s.6 2.53 1.73 2.53c1.07 0 1.73-.93 1.73-2.53 0-1.53-.66-2.47-1.73-2.47z" />
            </svg>
        ),
    },
    {
        key: 'agoda' as const,
        name: 'Agoda',
        color: '#5391F0',
        bg: 'rgba(83, 145, 240, 0.08)',
        border: 'rgba(83, 145, 240, 0.20)',
        hoverBg: 'rgba(83, 145, 240, 0.15)',
        badge: 'Top Rated Host',
        cta: 'View on Agoda',
        globalUrl: 'https://www.agoda.com/speedway-vacation-homes-h84383914/hotel/dubai-ae.html',
        logo: (
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-7 h-7">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 3c1.66 0 3 1.34 3 3s-1.34 3-3 3-3-1.34-3-3 1.34-3 3-3zm0 14.2c-2.5 0-4.71-1.28-6-3.22.03-1.99 4-3.08 6-3.08 1.99 0 5.97 1.09 6 3.08-1.29 1.94-3.5 3.22-6 3.22z" />
            </svg>
        ),
    },
];

// ─── Types ───────────────────────────────────────────
interface ExternalLinks {
    airbnb?: string;
    bookingCom?: string;
    agoda?: string;
}

interface Props {
    links?: ExternalLinks;
    variant?: 'home' | 'property';
}

// ─── Animations ──────────────────────────────────────
const containerVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.15, delayChildren: 0.1 } },
};

const cardVariants = {
    hidden: { opacity: 0, y: 30, scale: 0.95 },
    visible: {
        opacity: 1, y: 0, scale: 1,
        transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number] },
    },
};

// ─── Component ───────────────────────────────────────
export default function ExternalPlatforms({ links, variant = 'home' }: Props) {
    const isHome = variant === 'home';

    return (
        <section className={isHome ? 'py-20 px-4 sm:px-6 lg:px-8' : 'mt-10'}>
            <div className={isHome ? 'max-w-7xl mx-auto' : ''}>
                {/* Header */}
                <motion.div
                    className="text-center mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5 }}
                >
                    <h2 className={`font-bold text-white mb-2 ${isHome ? 'text-3xl sm:text-4xl' : 'text-xl sm:text-2xl'}`}>
                        Book on Your Favorite Platform
                    </h2>
                    <p className="text-slate-400 text-sm sm:text-base max-w-lg mx-auto">
                        {isHome
                            ? 'Find us on the world\'s most trusted travel platforms — same quality, your choice.'
                            : 'Also available on these trusted platforms'}
                    </p>
                </motion.div>

                {/* Cards */}
                <motion.div
                    className={`grid gap-5 ${isHome ? 'grid-cols-1 sm:grid-cols-3 max-w-4xl mx-auto' : 'grid-cols-1 sm:grid-cols-3'}`}
                    variants={containerVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: '-30px' }}
                >
                    {PLATFORMS.map((platform) => {
                        const url = links?.[platform.key] || platform.globalUrl;

                        return (
                            <motion.a
                                key={platform.key}
                                href={url}
                                target="_blank"
                                rel="noopener noreferrer"
                                variants={cardVariants}
                                whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.2 } }}
                                className="group relative rounded-2xl p-6 text-center backdrop-blur-xl transition-colors duration-300 cursor-pointer block"
                                style={{
                                    backgroundColor: 'rgba(255,255,255,0.03)',
                                    border: '1px solid rgba(255,255,255,0.06)',
                                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                                }}
                            >
                                {/* Badge */}
                                <div
                                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-[10px] font-semibold uppercase tracking-wider mb-4"
                                    style={{
                                        backgroundColor: platform.bg,
                                        color: platform.color,
                                        border: `1px solid ${platform.border}`,
                                    }}
                                >
                                    <BadgeCheck className="w-3 h-3" />
                                    {platform.badge}
                                </div>

                                {/* Logo */}
                                <div
                                    className="w-14 h-14 rounded-2xl mx-auto mb-4 flex items-center justify-center transition-transform duration-300 group-hover:scale-110"
                                    style={{
                                        backgroundColor: platform.bg,
                                        color: platform.color,
                                        border: `1px solid ${platform.border}`,
                                    }}
                                >
                                    {platform.logo}
                                </div>

                                {/* Name */}
                                <h3 className="text-lg font-semibold text-white mb-4">{platform.name}</h3>

                                {/* CTA Button */}
                                <div
                                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-medium text-white transition-all duration-300 group-hover:gap-3"
                                    style={{ backgroundColor: platform.color }}
                                >
                                    {platform.cta}
                                    <ExternalLink className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-0.5" />
                                </div>
                            </motion.a>
                        );
                    })}
                </motion.div>
            </div>
        </section>
    );
}
