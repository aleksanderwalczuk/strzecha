const plugin = require('tailwindcss/plugin');

module.exports = {
  content: [
    './components/**/*.{js,vue,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './plugins/**/*.{js,ts}',
    './nuxt.config.{js,ts}',
  ],

  theme: {
    extend: {
      colors: {
        default: '#111111',
        leading: {
          DEFAULT: '#111111',
          hover: '#111111',
        },
        gray: {
          25: '#F1F1F1',
          50: '#F9F8F8',
          100: '#E5E5E5',
          200: '#BDBDBD',
          250: '#ADADAD',
          300: '#DBDBDB',
          400: '#C4C4C4',
          450: '#989898',
          500: '#909090',
          550: '#818080',
          600: '#727272',
          650: '#767676',
          700: '#5C5C5C',
        },
        black: {
          300: '#2C2022',
          500: '#212020',
        },
        green: {
          300: '#28E8A8',
        },
        red: {
          300: '#FF4DA2',
        },
        error: '#FF4DA2',
        success: '#28E8A8',
      },
      fontSize: {
        '6xl': ['4rem', { lineHeight: '1.143' }],
        '5xl': ['3.5rem', { lineHeight: '1.143' }],
        '4xl': '2.75rem',
        '3xl': ['2rem', { lineHeight: '1.25' }],
        '2xl': '1.6875rem',
        xl: ['1.375rem', { lineHeight: '1.3' }],
        lg: '1.1875rem',
        md: '1.125rem',
        base: ['1rem', { lineHeight: '1.625' }],
        sm: '0.9375rem',
        xs: ['0.875rem', { lineHeight: '1.214' }],
        '2xs': ['0.75rem'],
        '3xs': ['0.5rem', { lineHeight: '1.25' }],
      },
      borderRadius: {
        sm: '0.1875rem',
        lg: '0.5625rem',
      },
      margin: {
        30: '7.5rem',
      },
      typography: {
        DEFAULT: {
          css: {
            color: '#111111',
            fontWeight: 500,
            maxWidth: '46rem',
            h1: {
              fontSize: '3rem',
              lineHeight: '1.143',
              letterSpacing: '-0.01em',
              marginBottom: '5.5rem',
            },
            h2: {
              fontSize: '2rem',
              letterSpacing: '-0.01em',
              lineHeight: '1.25',
            },
            p: {
              marginTop: '0',
              marginBottom: '1.5rem',
              lineHeight: '1.5rem',
            },
            strong: {
              fontWeight: '700',
            },
            '> :first-child': false,
          },
        },
      },
    },
    transitionDuration: {
      160: '160ms',
    },
    lineHeight: {
      snug: '1.3',
    },
    fontFamily: {
      sans: 'Lato, ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"',
      serif: 'EB Garamond',
      title: "'Open Sans', sans-serif",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        html: {
          color: '#111111',
          fontWeight: '400',
          lineHeight: '1.625',
        },
        '.fade-enter-active, .fade-leave-active': {
          transition: 'opacity ease-in-out 140ms',
        },
        '.fade-enter, .fade-leave-to': {
          opacity: 0,
        },
        '::placeholder': {
          opacity: 1,
        },
        '::selection': {
          backgroundColor: '#111111',
          color: 'white',
        },
      });
    }),
  ],
};
