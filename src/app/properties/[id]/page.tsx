'use client';

import React, { useState, useEffect, use } from 'react';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
    MapPin, Bed, Bath, Users, Star, ChevronLeft, ChevronRight,
    Wifi, Car, Waves, Flame, Tv, Snowflake, PawPrint, Shield,
    Check, Calendar, Loader2,
} from 'lucide-react';
import Button from '@/components/ui/Button';
import DateRangePicker from '@/components/ui/DateRangePicker';
import Input from '@/components/ui/Input';
import Textarea from '@/components/ui/Textarea';
import { useAuth } from '@/context/AuthContext';
import api from '@/lib/api';
import type { Property } from '@/types';

const AMENITY_ICONS: Record<string, React.ElementType> = {
    wifi: Wifi, pool: Waves, parking: Car, 'air-conditioning': Snowflake,
    heating: Flame, tv: Tv, 'pet-friendly': PawPrint, security: Shield,
};

interface PageParams {
    id: string;
}

export default function PropertyDetailPage({ params }: { params: Promise<PageParams> }) {
    const { id } = use(params);
    const router = useRouter();
    const { isAuthenticated } = useAuth();

    const [property, setProperty] = useState<Property | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeImage, setActiveImage] = useState(0);

    // Booking state
    const [checkIn, setCheckIn] = useState<Date | null>(null);
    const [checkOut, setCheckOut] = useState<Date | null>(null);
    const [adults, setAdults] = useState(1);
    const [children, setChildrenCount] = useState(0);
    const [specialRequests, setSpecialRequests] = useState('');
    const [bookingLoading, setBookingLoading] = useState(false);
    const [bookingMessage, setBookingMessage] = useState('');

    useEffect(() => {
        const fetchProperty = async () => {
            try {
                const { data: res } = await api.get(`/properties/${id}`);
                setProperty(res.data);
            } catch {
                router.push('/properties');
            } finally {
                setLoading(false);
            }
        };
        fetchProperty();
    }, [id, router]);

    // Price calculation
    const numberOfNights =
        checkIn && checkOut
            ? Math.ceil(
                Math.abs(checkOut.getTime() - checkIn.getTime()) / (1000 * 60 * 60 * 24)
            )
            : 0;
    const nightlyTotal = (property?.price.perNight || 0) * numberOfNights;
    const cleaningFee = property?.price.cleaningFee || 0;
    const serviceFee = property?.price.serviceFee || 0;
    const totalPrice = nightlyTotal + cleaningFee + serviceFee;

    const handleBooking = async () => {
        if (!isAuthenticated) {
            router.push('/login');
            return;
        }
        if (!checkIn || !checkOut) return;

        setBookingLoading(true);
        setBookingMessage('');
        try {
            const { data: res } = await api.post('/bookings', {
                property: property?._id,
                checkIn: checkIn.toISOString(),
                checkOut: checkOut.toISOString(),
                guests: { adults, children: children },
                specialRequests,
            });

            // Simulate payment
            const bookingId = res.data._id;
            await api.put(`/bookings/${bookingId}/pay`);
            setBookingMessage('🎉 Booking confirmed! Redirecting to your bookings...');
            setTimeout(() => router.push('/bookings'), 2000);
        } catch (err: unknown) {
            const error = err as { response?: { data?: { message?: string } } };
            setBookingMessage(error.response?.data?.message || 'Booking failed. Please try again.');
        } finally {
            setBookingLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-screen bg-slate-950">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div>
        );
    }

    if (!property) return null;

    return (
        <div className="min-h-screen bg-slate-950 py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Back */}
                <button
                    onClick={() => router.back()}
                    className="flex items-center gap-1 text-sm text-slate-400 hover:text-white mb-6 transition-colors"
                >
                    <ChevronLeft className="w-4 h-4" /> Back to Properties
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    {/* Left: Details */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Image Gallery */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="relative aspect-[16/9] rounded-2xl overflow-hidden bg-slate-800"
                        >
                            {property.images.length > 0 ? (
                                <>
                                    <div
                                        className="w-full h-full bg-cover bg-center transition-all duration-500"
                                        style={{
                                            backgroundImage: `url(${property.images[activeImage]?.url})`,
                                        }}
                                    />
                                    {property.images.length > 1 && (
                                        <>
                                            <button
                                                onClick={() =>
                                                    setActiveImage(
                                                        (activeImage - 1 + property.images.length) %
                                                        property.images.length
                                                    )
                                                }
                                                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                          bg-black/40 backdrop-blur flex items-center justify-center text-white
                          hover:bg-black/60 transition-colors"
                                            >
                                                <ChevronLeft className="w-5 h-5" />
                                            </button>
                                            <button
                                                onClick={() =>
                                                    setActiveImage(
                                                        (activeImage + 1) % property.images.length
                                                    )
                                                }
                                                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full
                          bg-black/40 backdrop-blur flex items-center justify-center text-white
                          hover:bg-black/60 transition-colors"
                                            >
                                                <ChevronRight className="w-5 h-5" />
                                            </button>
                                        </>
                                    )}
                                    {/* Thumbnails */}
                                    {property.images.length > 1 && (
                                        <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
                                            {property.images.map((_, i) => (
                                                <button
                                                    key={i}
                                                    onClick={() => setActiveImage(i)}
                                                    className={`w-2 h-2 rounded-full transition-all ${i === activeImage ? 'bg-amber-500 w-6' : 'bg-white/50 hover:bg-white'
                                                        }`}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-slate-600">
                                    No images available
                                </div>
                            )}
                        </motion.div>

                        {/* Title & Location */}
                        <div>
                            <div className="flex items-start justify-between gap-4">
                                <div>
                                    <h1 className="text-2xl lg:text-3xl font-bold text-white">
                                        {property.title}
                                    </h1>
                                    <div className="flex items-center gap-1.5 mt-2 text-slate-400">
                                        <MapPin className="w-4 h-4 text-amber-500" />
                                        <span>
                                            {property.location.address}, {property.location.city},{' '}
                                            {property.location.country}
                                        </span>
                                    </div>
                                </div>
                                {property.rating > 0 && (
                                    <div className="flex items-center gap-1 px-3 py-1.5 bg-slate-900 border border-slate-800 rounded-xl">
                                        <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
                                        <span className="text-white font-semibold">{property.rating.toFixed(1)}</span>
                                        <span className="text-xs text-slate-400">({property.reviewCount})</span>
                                    </div>
                                )}
                            </div>

                            {/* Quick stats */}
                            <div className="flex flex-wrap gap-4 mt-5">
                                {[
                                    { icon: Bed, label: `${property.bedrooms} Bedrooms` },
                                    { icon: Bath, label: `${property.bathrooms} Bathrooms` },
                                    { icon: Users, label: `Up to ${property.maxGuests} Guests` },
                                ].map(({ icon: Icon, label }) => (
                                    <div
                                        key={label}
                                        className="flex items-center gap-2 px-4 py-2 bg-slate-900/50 border border-slate-800
                      rounded-xl text-sm text-slate-300"
                                    >
                                        <Icon className="w-4 h-4 text-amber-500" />
                                        {label}
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Description */}
                        <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                            <h3 className="text-lg font-semibold text-white mb-3">About this property</h3>
                            <p className="text-slate-300 leading-relaxed whitespace-pre-line">
                                {property.description}
                            </p>
                        </div>

                        {/* Amenities */}
                        {property.amenities.length > 0 && (
                            <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
                                <h3 className="text-lg font-semibold text-white mb-4">Amenities</h3>
                                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                                    {property.amenities.map((a) => {
                                        const Icon = AMENITY_ICONS[a] || Check;
                                        return (
                                            <div
                                                key={a}
                                                className="flex items-center gap-2 text-sm text-slate-300"
                                            >
                                                <Icon className="w-4 h-4 text-amber-500 flex-shrink-0" />
                                                <span className="capitalize">{a.replace(/-/g, ' ')}</span>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right: Booking Card */}
                    <div className="lg:col-span-1">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="sticky top-24 bg-slate-900/50 backdrop-blur-sm border border-slate-800
                rounded-2xl p-6 space-y-5"
                        >
                            <div className="flex items-baseline gap-1">
                                <span className="text-3xl font-bold text-white">
                                    ${property.price.perNight}
                                </span>
                                <span className="text-slate-400">/night</span>
                            </div>

                            <DateRangePicker
                                label="Select Dates"
                                startDate={checkIn}
                                endDate={checkOut}
                                onStartChange={setCheckIn}
                                onEndChange={setCheckOut}
                            />

                            <div className="grid grid-cols-2 gap-3">
                                <Input
                                    label="Adults"
                                    type="number"
                                    min={1}
                                    max={property.maxGuests}
                                    value={adults}
                                    onChange={(e) => setAdults(Number(e.target.value))}
                                />
                                <Input
                                    label="Children"
                                    type="number"
                                    min={0}
                                    value={children}
                                    onChange={(e) => setChildrenCount(Number(e.target.value))}
                                />
                            </div>

                            <Textarea
                                label="Special Requests"
                                placeholder="Any special requirements?"
                                rows={2}
                                value={specialRequests}
                                onChange={(e) => setSpecialRequests(e.target.value)}
                            />

                            {/* Price Breakdown */}
                            {numberOfNights > 0 && (
                                <div className="space-y-2 pt-3 border-t border-slate-800">
                                    <div className="flex justify-between text-sm text-slate-400">
                                        <span>
                                            ${property.price.perNight} × {numberOfNights} nights
                                        </span>
                                        <span>${nightlyTotal}</span>
                                    </div>
                                    {cleaningFee > 0 && (
                                        <div className="flex justify-between text-sm text-slate-400">
                                            <span>Cleaning fee</span>
                                            <span>${cleaningFee}</span>
                                        </div>
                                    )}
                                    {serviceFee > 0 && (
                                        <div className="flex justify-between text-sm text-slate-400">
                                            <span>Service fee</span>
                                            <span>${serviceFee}</span>
                                        </div>
                                    )}
                                    <div className="flex justify-between text-white font-semibold pt-2 border-t border-slate-800">
                                        <span>Total</span>
                                        <span>${totalPrice}</span>
                                    </div>
                                </div>
                            )}

                            <Button
                                fullWidth
                                size="lg"
                                onClick={handleBooking}
                                loading={bookingLoading}
                                disabled={!checkIn || !checkOut || numberOfNights < 1}
                            >
                                <Calendar className="w-4 h-4" />
                                {isAuthenticated ? 'Book Now' : 'Sign in to Book'}
                            </Button>

                            {bookingMessage && (
                                <p className={`text-sm text-center ${bookingMessage.includes('🎉') ? 'text-green-400' : 'text-red-400'
                                    }`}>
                                    {bookingMessage}
                                </p>
                            )}
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
}
