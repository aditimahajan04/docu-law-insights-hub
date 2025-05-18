const colors = require('tailwindcss/colors');

function withOpacityValue(variable) {
  return ({ opacityValue }) =>
    opacityValue === undefined
      ? `hsl(var(${variable}))`
      : `hsl(var(${variable}) / ${opacityValue})`;
}

module.exports = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px'
      }
    },
    extend: {
      colors: {
        ...colors,
        border: withOpacityValue('--border'),
        input: withOpacityValue('--input'),
        ring: withOpacityValue('--ring'),
        background: withOpacityValue('--background'),
        foreground: withOpacityValue('--foreground'),
        primary: {
          DEFAULT: withOpacityValue('--primary'),
          foreground: withOpacityValue('--primary-foreground')
        },
        secondary: {
          DEFAULT: withOpacityValue('--secondary'),
          foreground: withOpacityValue('--secondary-foreground')
        },
        destructive: {
          DEFAULT: withOpacityValue('--destructive'),
          foreground: withOpacityValue('--destructive-foreground')
        },
        muted: {
          DEFAULT: withOpacityValue('--muted'),
          foreground: withOpacityValue('--muted-foreground')
        },
        accent: {
          DEFAULT: withOpacityValue('--accent'),
          foreground: withOpacityValue('--accent-foreground')
        },
        popover: {
          DEFAULT: withOpacityValue('--popover'),
          foreground: withOpacityValue('--popover-foreground')
        },
        card: {
          DEFAULT: withOpacityValue('--card'),
          foreground: withOpacityValue('--card-foreground')
        },
        sidebar: {
          DEFAULT: withOpacityValue('--sidebar-background'),
          foreground: withOpacityValue('--sidebar-foreground'),
          primary: withOpacityValue('--sidebar-primary'),
          'primary-foreground': withOpacityValue('--sidebar-primary-foreground'),
          accent: withOpacityValue('--sidebar-accent'),
          'accent-foreground': withOpacityValue('--sidebar-accent-foreground'),
          border: withOpacityValue('--sidebar-border'),
          ring: withOpacityValue('--sidebar-ring')
        },
        navy: '#0A2463',
        lightblue: '#3E92CC',
        gold: '#FFD700',
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        'accordion-down': {
          from: {
            height: '0'
          },
          to: {
            height: 'var(--radix-accordion-content-height)'
          }
        },
        'accordion-up': {
          from: {
            height: 'var(--radix-accordion-content-height)'
          },
          to: {
            height: '0'
          }
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        }
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
        'fade-in': 'fade-in 0.3s ease-out',
      },
      fontFamily: {
        serif: ['Georgia', 'Times New Roman', 'serif'],
        sans: ['Inter', 'Arial', 'sans-serif'],
      }
    }
  },
  plugins: [require("tailwindcss-animate")],
}; 