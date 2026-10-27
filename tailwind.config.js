/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // Blueprint version (/blueprint)
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
