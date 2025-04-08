// tailwind.config.mjs

export default {
    content: [
      './**/*.html',
      './**/*.js',
      './**/*.ts',
      '!./node_modules/**/*', // Exclure les fichiers dans node_modules
    ],
    theme: {
      container: {
        center: true,
        padding: {
          DEFAULT: '1rem',
        },
      },
      extend: {
        fontFamily: {
          sans: ['Montserrat', 'sans-serif'],
          inter: ['Inter', 'sans-serif'],
        },
        colors: {
          'emerald-75': '#A7E3D4',  // Couleur personnalisée entre emerald-50 et emerald-100
        },       
      },
    },
    plugins: [
      require('daisyui'),
    ],
  };
  