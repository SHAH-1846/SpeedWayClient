// Types used across the application — SSOT

export interface User {
    _id: string;
    id?: string;
    name: string;
    email: string;
    role: 'user' | 'admin';
    avatar?: string;
    phone?: string;
}

export interface PropertyImage {
    url: string;
    alt?: string;
}

export interface Property {
    _id: string;
    title: string;
    slug: string;
    description: string;
    type: 'villa' | 'apartment' | 'cottage' | 'cabin' | 'penthouse' | 'beach-house';
    price: {
        perNight: number;
        cleaningFee: number;
        serviceFee: number;
    };
    location: {
        address: string;
        city: string;
        state: string;
        country: string;
        zipCode: string;
        coordinates?: { lat: number; lng: number };
    };
    amenities: string[];
    images: PropertyImage[];
    bedrooms: number;
    bathrooms: number;
    maxGuests: number;
    availability?: { startDate: string; endDate: string }[];
    featured: boolean;
    status: 'active' | 'inactive' | 'maintenance';
    rating: number;
    reviewCount: number;
    owner: { name: string; avatar: string } | string;
    createdAt: string;
    updatedAt: string;
}

export interface Booking {
    _id: string;
    property: Property | string;
    user: User | string;
    checkIn: string;
    checkOut: string;
    guests: { adults: number; children: number };
    totalPrice: number;
    nightlyRate: number;
    nights: number;
    cleaningFee: number;
    serviceFee: number;
    status: 'pending' | 'confirmed' | 'cancelled' | 'completed';
    paymentStatus: 'pending' | 'paid' | 'refunded' | 'failed';
    paymentId?: string;
    specialRequests?: string;
    createdAt: string;
    updatedAt: string;
}

export interface Enquiry {
    _id: string;
    name: string;
    email: string;
    phone: string;
    property: Property | string | null;
    subject: string;
    message: string;
    status: 'new' | 'read' | 'responded' | 'closed';
    createdAt: string;
    updatedAt: string;
}

export interface PaginationInfo {
    page: number;
    limit: number;
    total: number;
    pages: number;
}

export interface ApiResponse<T> {
    success: boolean;
    message?: string;
    data: T;
    pagination?: PaginationInfo;
    errors?: { field: string; message: string }[];
}
