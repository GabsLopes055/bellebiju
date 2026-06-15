/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.{html,ts,scss}',
  ],
  corePlugins: {
    // Desligado durante coexistência com Angular Material.
    // Reativar na Fase 5 ao remover o Material.
    preflight: false,
  },
  theme: {
    extend: {
      colors: {
        primary:   { DEFAULT: '#770d7c', light: '#c94fd0', dark: '#5a0a5e' },
        secondary: { DEFAULT: '#138182', light: '#0f9090', dark: '#0d6e6f' },
        warning:   '#dbb40c',
        success:   '#198754',
        danger:    '#dc3545',
        bg:        '#f0f2f5',
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      borderRadius: {
        xl:  '12px',
        '2xl': '16px',
      },
      boxShadow: {
        card: '0 1px 4px rgba(0,0,0,0.06)',
        'card-hover': '0 4px 14px rgba(0,0,0,0.10)',
        'primary-glow': '0 4px 16px rgba(119,13,124,0.35)',
        'secondary-glow': '0 4px 16px rgba(19,129,130,0.35)',
      },
      transitionTimingFunction: {
        'material': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      keyframes: {
        'indeterminate': {
          '0%':   { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(400%)' },
        },
        'fade-in': {
          '0%':   { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'slide-in-right': {
          '0%':   { opacity: '0', transform: 'translateX(100%)' },
          '100%': { opacity: '1', transform: 'translateX(0)' },
        },
      },
      animation: {
        'indeterminate':    'indeterminate 1.4s ease-in-out infinite',
        'fade-in':          'fade-in 0.2s ease-out',
        'slide-in-right':   'slide-in-right 0.3s ease-out',
      },
    },
  },
  plugins: [],
};
