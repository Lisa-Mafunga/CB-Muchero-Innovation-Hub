import { defineConfig } from 'vite'
import path from 'path'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: './',
  plugins: [
    // The React and Tailwind plugins are both required for Make, even if
    // Tailwind is not being actively used – do not remove them
    react(),
    tailwindcss(),
  ],
  resolve: {
    alias: {
      // Alias @ to the src directory
      '@': path.resolve(__dirname, './src'),
    },
  },

  // File types to support raw imports. Never add .css, .tsx, or .ts files to this.
  assetsInclude: ['**/*.svg', '**/*.csv'],
  // Build optimizations to avoid very large single chunks and silence
  // noisy warnings. Tailor `manualChunks` to split large vendor libs.
  build: {
    // Increase warning limit to 1000 KB while we split large deps
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks(id: string) {
          if (!id.includes('node_modules')) return undefined

          // Keep React and small React-related helper packages in a single chunk
          if (id.includes('react') || id.includes('react-dom')) return 'vendor-react'
          if (id.includes('use-sidecar') || id.includes('use-callback-ref')) return 'vendor-react'

          // Derive package name from path to create per-package chunks and avoid
          // a single catch-all 'vendor' chunk which can create circular deps.
          const nm = id.split('node_modules/')[1] ?? id.split('node_modules\\')[1]
          if (!nm) return undefined
          const segments = nm.split(/[/\\]/)
          let pkg = segments[0]
          if (pkg.startsWith('@') && segments.length > 1) pkg = `${pkg}/${segments[1]}`

          // Whitelist of packages we want to force into separate vendor chunks.
          const whitelist = new Set([
            'react',
            'react-dom',
            'sonner',
            'tailwind-merge',
            'recharts',
            'embla-carousel-react',
            'react-slick',
            'react-dnd',
            'react-dnd-html5-backend',
            'lucide-react',
            'motion',
            'next-themes',
            'class-variance-authority',
            '@supabase/supabase-js',
            '@supabase/auth-js',
            '@mui/material',
            '@emotion/react',
            '@emotion/styled',
          ])

          // Group radix and supabase scopes as well.
          if (pkg.startsWith('@radix-ui') || pkg.startsWith('@supabase') || pkg.startsWith('@mui') || whitelist.has(pkg) || whitelist.has(`${segments[0]}/${segments[1]}`)) {
            const safeName = pkg.replace('@', '').replace('/', '-')
            return `vendor-${safeName}`
          }

          // Otherwise let Rollup decide (avoid empty tiny chunks)
          return undefined
        },
      },
    },
  },
})
