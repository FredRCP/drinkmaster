import type { Config } from 'tailwindcss'

const config: Config = {
  // Desabilitado - usando CSS variables puro
  content: [],
  theme: { extend: {} },
  plugins: [],
  corePlugins: {
    preflight: false, // não reseta os estilos
  },
}

export default config