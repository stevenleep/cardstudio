/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Neo-Brutalism 主色 - 明亮黄
        main: '#FFE566',
        mainAccent: '#FFC800',
        
        // 背景色
        bg: '#e3dff2',
        bw: '#ffffff',
        blank: '#ffffff',
        
        // 文字/边框色
        text: '#000000',
        border: '#000000',
        
        // 功能色 - Neo-Brutalism 风格
        success: '#22c55e',
        warning: '#eab308',
        danger: '#ef4444',
        info: '#3b82f6',
        
        // 额外的亮色调色板
        nb: {
          pink: '#ff6b9d',
          purple: '#c084fc',
          blue: '#60a5fa',
          cyan: '#22d3d1',
          green: '#4ade80',
          yellow: '#facc15',
          orange: '#fb923c',
          red: '#f87171',
        }
      },
      fontFamily: {
        'sans': ['Lexend', 'Inter', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
        'mono': ['"JetBrains Mono"', '"SF Mono"', '"Fira Code"', 'Consolas', 'monospace'],
        'heading': ['Syne', 'Lexend', 'sans-serif'],
      },
      fontSize: {
        '2xs': ['10px', { lineHeight: '14px' }],
        'xs': ['11px', { lineHeight: '16px' }],
        'sm': ['13px', { lineHeight: '20px' }],
        'base': ['15px', { lineHeight: '24px' }],
        'md': ['16px', { lineHeight: '26px' }],
        'lg': ['18px', { lineHeight: '28px' }],
        'xl': ['20px', { lineHeight: '30px' }],
        '2xl': ['24px', { lineHeight: '32px' }],
      },
      fontWeight: {
        normal: '400',
        medium: '500',
        semibold: '600',
        bold: '700',
        black: '900',
      },
      boxShadow: {
        // Neo-Brutalism 标志性硬阴影
        'brutal': '4px 4px 0px 0px #000000',
        'brutal-sm': '2px 2px 0px 0px #000000',
        'brutal-md': '4px 4px 0px 0px #000000',
        'brutal-lg': '6px 6px 0px 0px #000000',
        'brutal-xl': '8px 8px 0px 0px #000000',
        // 悬停状态的彩色阴影
        'brutal-main': '4px 4px 0px 0px #FFC800',
        'brutal-pink': '4px 4px 0px 0px #ff6b9d',
        'brutal-purple': '4px 4px 0px 0px #c084fc',
        // 无阴影（用于active状态）
        'none': 'none',
      },
      borderWidth: {
        DEFAULT: '2px',
        '0': '0',
        '2': '2px',
        '3': '3px',
        '4': '4px',
      },
      borderRadius: {
        'none': '0',
        'sm': '4px',
        DEFAULT: '8px',
        'md': '8px',
        'lg': '12px',
        'xl': '16px',
        '2xl': '20px',
        'full': '9999px',
      },
      translate: {
        'brutal': '4px',
        'brutal-sm': '2px',
        'brutal-lg': '6px',
      },
      animation: {
        'fade-in': 'fadeIn 0.15s ease-out',
        'slide-up': 'slideUp 0.2s ease-out',
        'slide-down': 'slideDown 0.15s ease-out',
        'bounce-in': 'bounceIn 0.3s ease-out',
        'wiggle': 'wiggle 0.3s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        bounceIn: {
          '0%': { transform: 'scale(0.9)', opacity: '0' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-1deg)' },
          '50%': { transform: 'rotate(1deg)' },
        },
      },
    },
  },
  plugins: [],
}
