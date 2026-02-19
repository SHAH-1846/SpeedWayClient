'use client';

import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Loader2, MessageSquare, Mail, Clock } from 'lucide-react';
import api from '@/lib/api';
import type { Enquiry } from '@/types';

export default function AdminEnquiriesPage() {
    const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchEnquiries = async () => {
            try {
                const { data: res } = await api.get('/enquiries?limit=50');
                setEnquiries(res.data || []);
            } catch {
                setEnquiries([]);
            } finally {
                setLoading(false);
            }
        };
        fetchEnquiries();
    }, []);

    const updateStatus = async (id: string, status: string) => {
        try {
            await api.put(`/enquiries/${id}`, { status });
            setEnquiries((prev) =>
                prev.map((e) => (e._id === id ? { ...e, status: status as Enquiry['status'] } : e))
            );
        } catch (err) {
            console.error('Update status failed:', err);
        }
    };

    const statusColor: Record<string, string> = {
        new: 'text-blue-400 bg-blue-500/10 border-blue-500/20',
        read: 'text-yellow-400 bg-yellow-500/10 border-yellow-500/20',
        responded: 'text-green-400 bg-green-500/10 border-green-500/20',
        closed: 'text-slate-400 bg-slate-500/10 border-slate-500/20',
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center py-20">
                <Loader2 className="w-8 h-8 animate-spin text-amber-500" />
            </div>
        );
    }

    return (
        <div>
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-white">Enquiries</h1>
                <p className="text-sm text-slate-400 mt-1">View and manage customer enquiries</p>
            </div>

            {enquiries.length > 0 ? (
                <div className="space-y-4">
                    {enquiries.map((enquiry, i) => (
                        <motion.div
                            key={enquiry._id}
                            initial={{ opacity: 0, y: 15 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.05 }}
                            className="bg-slate-900/50 border border-slate-800/50 rounded-2xl p-5
                hover:border-slate-700/50 transition-all"
                        >
                            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2 mb-1">
                                        <h3 className="text-white font-medium">{enquiry.name}</h3>
                                        <select
                                            value={enquiry.status}
                                            onChange={(e) => updateStatus(enquiry._id, e.target.value)}
                                            className={`text-[11px] font-medium px-2 py-0.5 rounded-md border
                        bg-transparent cursor-pointer
                        ${statusColor[enquiry.status] || 'text-slate-400 border-slate-700'}
                      `}
                                        >
                                            <option value="new">New</option>
                                            <option value="read">Read</option>
                                            <option value="responded">Responded</option>
                                            <option value="closed">Closed</option>
                                        </select>
                                    </div>
                                    <div className="flex items-center gap-3 text-xs text-slate-400 mb-3">
                                        <span className="flex items-center gap-1">
                                            <Mail className="w-3 h-3" /> {enquiry.email}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <Clock className="w-3 h-3" />
                                            {new Date(enquiry.createdAt).toLocaleDateString()}
                                        </span>
                                    </div>
                                    {enquiry.subject && (
                                        <p className="text-sm text-amber-400 font-medium mb-1">{enquiry.subject}</p>
                                    )}
                                    <p className="text-sm text-slate-300 leading-relaxed">{enquiry.message}</p>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>
            ) : (
                <div className="text-center py-20">
                    <MessageSquare className="w-12 h-12 text-slate-700 mx-auto mb-4" />
                    <p className="text-xl text-slate-400">No enquiries yet</p>
                </div>
            )}
        </div>
    );
}
