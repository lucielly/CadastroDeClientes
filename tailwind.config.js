module.exports = {
 //  precisamos transformar o purge em objeto {} 
// e declarar as variáveis para não serem excluidas quando estiver em modo produção.
  purge: {
    content: [
      './src/pages/**/*.{js,ts,jsx,tsx}',
          './src/components/**/*.{js,ts,jsx,tsx}'
],
  safelist: [
    /^bg-/,
    /^to-/,
    /^from-/,
]
  
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
