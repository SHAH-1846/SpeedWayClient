/**
 * Speedway Properties — Single Source of Truth (SSOT)
 *
 * All company-wide data lives here. Change a value once and it
 * propagates to every footer, navbar, contact page, and SEO tag.
 *
 * ⚠️  This object is frozen — any accidental mutation will throw
 *     in strict mode or silently fail.
 */

// ─── Company Info ────────────────────────────────────

export const COMPANY = Object.freeze({
    legalName: 'Speedway Vacation Homes Rental L.L.C',
    parentEntity: 'Speedway Properties LLC',
    brandName: 'Speedway Properties',
    tagline: 'Vacation Homes Rental',
    established: 2022,
    expertiseYears: '20+',
    philosophy:
        'Your comfort is our priority — ensuring a seamless and pleasant experience at every step.',

    // ── Contact ───────────────────────────────────────
    contact: Object.freeze({
        phone: '+971 4 548 4800',
        phoneHref: 'tel:+97145484800',
        email: 'hello@speedwayproperties.ae',
        emailHref: 'mailto:hello@speedwayproperties.ae',
        workingHours: 'Sun – Thu: 9:00 AM – 6:00 PM',
    }),

    // ── Headquarters ──────────────────────────────────
    headquarters: Object.freeze({
        building: 'The Atrium Building',
        area: 'Al Mankhool',
        floor: '2nd Floor',
        office: 'Office No: 208',
        city: 'Dubai',
        country: 'United Arab Emirates',
        full: 'The Atrium Building, Al Mankhool, 2nd Floor, Office No: 208, Dubai, United Arab Emirates',
        mapCoords: Object.freeze({ lat: 25.2505, lng: 55.2974 }),
        googleMapsUrl:
            'https://maps.google.com/?q=The+Atrium+Building+Al+Mankhool+Dubai',
        embedUrl:
            'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3608.6!2d55.298!3d25.2485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3e5f43348a67e24b%3A0xff45e502e1ceb7e2!2sAl%20Mankhool%20-%20Bur%20Dubai%20-%20Dubai%20-%20United%20Arab%20Emirates!5e0!3m2!1sen!2s!4v1700000000000!5m2!1sen!2s',
    }),

    // ── Services ──────────────────────────────────────
    coreServices: Object.freeze([
        'Residential Sales',
        'Commercial Leasing',
        'Property Management',
        'Vacation Home Rentals',
        'Investment Advisory',
    ] as const),

    // ── Key Projects ──────────────────────────────────
    keyProjects: Object.freeze([
        'Rotana Building (Bur Dubai)',
        'Barsha Star (Barsha-1)',
    ] as const),

    // ── Partners ──────────────────────────────────────
    partners: Object.freeze([
        'Al Attar Group',
        'Modern Real Estate',
        'Emerald Properties',
        'Bin Ghalita',
    ] as const),

    // ── Social Links (placeholders) ───────────────────
    social: Object.freeze({
        instagram: '#',
        facebook: '#',
        twitter: '#',
    }),
});

// ─── SEO Defaults ────────────────────────────────────

export const SEO = Object.freeze({
    siteName: `${COMPANY.brandName} | Vacation Homes Rental Dubai`,
    description: `Discover premium vacation homes in Dubai & UAE. ${COMPANY.legalName} — your trusted partner for property management, residential leasing, and luxury vacation rentals in Bur Dubai & beyond.`,
    keywords:
        'Bur Dubai Vacation Rentals, Property Management Dubai, Speedway Properties UAE, Dubai holiday homes, vacation rental Dubai, Al Mankhool rental, luxury vacation homes UAE',
    url: 'https://speedwayproperties.ae',
});

// ─── Schema.org JSON-LD ──────────────────────────────

export function generateOrganizationSchema() {
    return {
        '@context': 'https://schema.org',
        '@type': 'Organization',
        name: COMPANY.legalName,
        alternateName: COMPANY.parentEntity,
        url: SEO.url,
        telephone: COMPANY.contact.phone,
        email: COMPANY.contact.email,
        foundingDate: String(COMPANY.established),
        description: SEO.description,
        address: {
            '@type': 'PostalAddress',
            streetAddress: `${COMPANY.headquarters.building}, ${COMPANY.headquarters.area}, ${COMPANY.headquarters.floor}, ${COMPANY.headquarters.office}`,
            addressLocality: COMPANY.headquarters.city,
            addressCountry: COMPANY.headquarters.country,
        },
        geo: {
            '@type': 'GeoCoordinates',
            latitude: COMPANY.headquarters.mapCoords.lat,
            longitude: COMPANY.headquarters.mapCoords.lng,
        },
        sameAs: Object.values(COMPANY.social).filter((u) => u !== '#'),
    };
}
