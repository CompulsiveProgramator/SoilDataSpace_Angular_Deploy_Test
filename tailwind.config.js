module.exports = {
  // Configuración de contenido para que Tailwind escanee tus archivos de Angular
  content: [
    "./src/**/*.{html,ts}", // Asegura que escanee todos los archivos HTML y TypeScript
  ],
  
  // Lista de seguridad (Safelist) para clases dinámicas
  safelist: [
    // Generamos las clases de fondo (bg) necesarias para el color dinámico y la tonalidad 500
    { 
      pattern: /bg-(red|blue|green|indigo|purple|pink|yellow|teal|rose|emerald)-500/ 
    },
    // Generamos las clases de borde (border) necesarias para el color dinámico
    { 
      pattern: /border-(red|blue|green|indigo|purple|pink|yellow|teal|rose|emerald)-(300|400|500)/ 
    },
    // Si tienes clases de texto dinámicas (text-COLOR-600) agrégalas aquí:
    // { pattern: /text-(red|blue|green|indigo|purple|pink|yellow|teal|rose|emerald)-600/ }
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: 0, transform: 'scale(0.95)' },
          '100%': { opacity: 1, transform: 'scale(1)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.3s ease-out',
      },
        colors: {
          emerald: '#009966'
      }
    },
  },
  plugins: [
    require("tailwindcss-animate")
  ],
}

const colors = require('tailwindcss/colors')
