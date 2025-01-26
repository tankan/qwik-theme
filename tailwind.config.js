/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary)",
        secondary: "var(--secondary)",
        accent: "var(--accent)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        "text-primary": "var(--text-primary)",
        "text-secondary": "var(--text-secondary)",
        success: "var(--success)",
        warning: "var(--warning)",
        error: "var(--error)",
        info: "var(--info)",
        disabled: "var(--disabled)",
        link: "var(--link)",
        hover: "var(--hover)",
        focus: "var(--focus)",
        divider: "var(--divider)",
        shadow: "var(--shadow)",
        highlight: "var(--highlight)",
        muted: "var(--muted)",
        surface: "var(--surface)",
        outline: "var(--outline)",
        brand: "var(--brand)",
        "error-bg": "var(--error-bg)",
        "success-bg": "var(--success-bg)",
      },
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
      spacing: {
        // 移动端友好的间距
        '1': '0.25rem',    // 4px
        '2': '0.5rem',     // 8px
        '3': '0.75rem',    // 12px
        '4': '1rem',       // 16px
        '5': '1.25rem',    // 20px
        '6': '1.5rem',     // 24px
        '8': '2rem',       // 32px
        '10': '2.5rem',    // 40px
        '12': '3rem',      // 48px
        '16': '4rem',      // 64px
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],      // 12px
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],  // 14px
        'base': ['1rem', { lineHeight: '1.5rem' }],     // 16px
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],  // 18px
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],   // 20px
        '2xl': ['1.5rem', { lineHeight: '2rem' }],      // 24px
      },
      borderRadius: {
        'none': '0',
        'sm': '0.125rem',    // 2px
        DEFAULT: '0.25rem',   // 4px
        'md': '0.375rem',     // 6px
        'lg': '0.5rem',       // 8px
        'full': '9999px',
      },
    },
  },
  plugins: [],
}; 