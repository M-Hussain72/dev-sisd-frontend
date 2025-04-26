/** @type {import('tailwindcss').Config} */

export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        themeBlue: '#307EE1',
        themeBlack: '#2B2B2B',
        themeGray: '#949697',
        themeGray6: '#626465',
      },
      fontSize: {
        resHeading: 'clamp(1.3rem,calc(1.3rem + (2.6 - 1.3) * ((100vw - 36rem) / (87.5 - 36))),2.6rem)',
        resLg: 'clamp(0.8rem,calc(0.8rem + (1.2 - 0.8) * calc((100vw - 36rem) / (87.5 - 36))),1.2rem)',
      },
    },
    screens: {
      xs: '480px',
      sm: '640px',
      // => @media (min-width: 640px) { ... }

      md: '768px',
      // => @media (min-width: 768px) { ... }

      lg: '1024px',
      // => @media (min-width: 1024px) { ... }

      xl: '1280px',
      // => @media (min-width: 1280px) { ... }

      '2xl': '1536px',
      // => @media (min-width: 1536px) { ... }
    },
    // typography: {
    //   DEFAULT: {
    //     css: {
    //       h1: { fontWeight: '600', fontSize: '30px' },
    //       h2: { fontWeight: '600', fontSize: '28px' },
    //       h3: { fontWeight: '600', fontSize: '26px' },
    //       h4: { fontWeight: '500', fontSize: '24px' },
    //       h5: { fontWeight: '500', fontSize: '22px' },
    //     },
    //   },
    // },
  },

  plugins: [require('@tailwindcss/typography')],
};
