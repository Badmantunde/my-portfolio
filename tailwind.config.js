/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  // hover: styles only apply on devices that can hover, so taps on touch screens never leave a stuck hover state.
  future: { hoverOnlyWhenSupported: true },
  theme: {
    extend: {
      // A stronger ease-out than Tailwind's default: quick to respond, long to settle.
      transitionTimingFunction: { out: 'cubic-bezier(0.23, 1, 0.32, 1)' },
      colors: {
        bp: {
          ink: '#071A2D',
          deep: '#0D2D4A',
          cyan: '#42D9FF',
          text: '#EAF7FF',
          muted: '#93AEC3',
          line: 'rgba(66, 217, 255, 0.16)',
        },
      },
    },
  },
  plugins: [],
}
