'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Plus, Pencil, Trash2, Loader2, Building, Eye } from 'lucide-react';
import Button from '@/components/ui/Button';
import api from '@/lib/api';
import type { Property } from '@/types';

export default function AdminPropertiesPage() {
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchProperties = async () => {
        setLoading(true);
        try {
            const { data: res } = await api.get('/properties?limit=50');
            setProperties(res.data || []);
        } catch {
            setProperties([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchProperties();
    }, []);

    const handleDelete = async (id: string) => {
        if (!confirm('Are you sure you want to delete this property?')) return;
        try {
            await api.delete(`/properties/${id}`);
            setProperties((prev) => prev.filter((p) => p._id !== id));
        } catch (err) {
            console.error('Delete failed:', err);
        }
    };

    return (
        <div>
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h1 className="text-2xl font-bold text-white">Properties</h1>
                    <p className="text-sm text-slate-400 mt-1">Manage your vacation rental listings</p>
                </div>
                <Link href="/admin/properties/new">
                    <Button>
                        <Plus className="w-4 h-4" /> Add Property
                    </Button>
                </Link>
            </div>

            {loading ? (
                <div className="flex items-center justify-center py-20">
                    <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
                </div>
            ) : properties.length > 0 ? (
                <div className="bg-slate-900/50 border border-slate-800/50 rounded-2xl overflow-hidden">
                    {/* Table Header */}
                    <div className="hidden sm:grid grid-cols-12 gap-4 px-6 py-3 border-b border-slate-800/50
            text-xs font-medium text-slate-500 uppercase tracking-wider">
                        <div className="col-span-5">Property</div>
                        <div className="col-span-2">Type</div>
                        <div className="col-span-2">Price</div>
                        <div className="col-span-1">Status</div>
                        <div className="col-span-2 text-right">Actions</div>
                    </div>

                    {/* Rows */}
                    <div className="divide-y divide-slate-800/50">
                        {properties.map((property, index) => (
                            <motion.div
                                key={property._id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: index * 0.03 }}
                                className="grid grid-cols-1 sm:grid-cols-12 gap-3 sm:gap-4 px-6 py-4
                  hover:bg-white/[0.02] transition-colors items-center"
                            >
                                {/* Property Info */}
                                <div className="sm:col-span-5 flex items-center gap-3">
                                    <div
                                        className="w-12 h-12 rounded-lg bg-cover bg-center flex-shrink-0"
                                        style={{
                                            backgroundImage: `url(${property.images?.[0]?.url || ''})`,
                                            backgroundColor: '#1e293b',
                                        }}
                                    />
                                    <div className="min-w-0">
                                        <p className="text-sm text-white font-medium truncate">
                                            {property.title}
                                        </p>
                                        <p className="text-xs text-slate-400 truncate">
                                            {property.location.city}, {property.location.country}
                                        </p>
                                    </div>
                                </div>

                                {/* Type */}
                                <div className="sm:col-span-2">
                                    <span className="px-2 py-0.5 text-xs font-medium bg-slate-800 text-slate-300
                    rounded-md capitalize">
                                        {property.type}
                                    </span>
                                </div>

                                {/* Price */}
                                <div className="sm:col-span-2 text-sm text-white font-medium">
                                    ${property.price.perNight}/night
                                </div>

                                {/* Status */}
                                <div className="sm:col-span-1">
                                    <span className={`inline-flex w-2 h-2 rounded-full ${property.status === 'active'
                                            ? 'bg-green-400'
                                            : property.status === 'inactive'
                                                ? 'bg-red-400'
                                                : 'bg-yellow-400'
                                        }`} />
                                </div>

                                {/* Actions */}
                                <div className="sm:col-span-2 flex items-center justify-end gap-2">
                                    <Link href={`/properties/${property._id}`}>
                                        <button className="p-2 rounded-lg text-slate-400 hover:text-white
                      hover:bg-white/5 transition-all" title="View">
                                            <Eye className="w-4 h-4" />
                                        </button>
                                    </Link>
                                    <Link href={`/admin/properties/${property._id}/edit`}>
                                        <button className="p-2 rounded-lg text-slate-400 hover:text-amber-400
                      hover:bg-amber-500/10 transition-all" title="Edit">
                                            <Pencil className="w-4 h-4" />
                                        </button>
                                    </Link>
                                    <button
                                        onClick={() => handleDelete(property._id)}
                                        className="p-2 rounded-lg text-slate-400 hover:text-red-400
                      hover:bg-red-500/10 transition-all"
                                        title="Delete"
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            ) : (
                <div className="text-center py-20">
                    <Building className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                    <p className="text-xl text-slate-400 mb-2">No properties yet</p>
                    <p className="text-sm text-slate-500 mb-6">
                        Add your first vacation rental property
                    </p>
                    <Link href="/admin/properties/new">
                        <Button>
                            <Plus className="w-4 h-4" /> Add Property
                        </Button>
                    </Link>
                </div>
            )}
        </div>
    );
}
