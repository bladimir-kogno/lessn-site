/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        './src/app/**/*.{ts,tsx}',
        './src/components/**/*.{ts,tsx}',
        './src/pages/**/*.{ts,tsx}'
    ],
    theme: {
        extend: {
            colors: {
                brand: {
                    DEFAULT: '#5f5ffd',
                    200: '#7f7ffd',
                    700: '#4343b1',
                    ink: '#1c1c4c',
                    tint: '#efefff'
                }
            },
            boxShadow: { card: '0 8px 24px rgba(31,38,135,.08)' },
            borderRadius: { xl2: '1.25rem' },
            fontFamily: {
                nikkei: ['PPNikkeiJournal', 'serif']
            },
            fontSize: {
                xs: ['0.85rem', { lineHeight: '1.4' }],
                sm: ['0.95rem', { lineHeight: '1.5' }],
                base: ['1.1rem', { lineHeight: '1.6' }],
                lg: ['1.25rem', { lineHeight: '1.6' }],
                xl: ['1.5rem', { lineHeight: '1.6' }],
                '2xl': ['1.75rem', { lineHeight: '1.6' }],
                '3xl': ['2rem', { lineHeight: '1.2' }],
                '4xl': ['2.5rem', { lineHeight: '1.2' }],
                '5xl': ['3rem', { lineHeight: '1.1' }],
                '6xl': ['3.5rem', { lineHeight: '1.1' }]
            }
        }
    },
    plugins: []
};
