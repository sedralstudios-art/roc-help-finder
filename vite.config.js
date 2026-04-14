import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          // React and React-DOM into their own chunk — shared by every page.
          if (id.includes('node_modules/react') || id.includes('node_modules/scheduler')) {
            return 'react';
          }
          // Stripe JS into its own chunk — only loaded on /support.
          if (id.includes('node_modules/@stripe')) {
            return 'stripe';
          }
          // All legal library data and components into their own chunk.
          // Only loaded when user navigates to /know-your-rights.
          if (id.includes('src/data/legal/') || id.includes('src/components/LegalLibrary')) {
            return 'legal';
          }
          // HelpFinder questionnaire and program directory into their own chunk.
          // Only loaded when user navigates to /help.
          if (id.includes('src/components/HelpFinder') || id.includes('src/components/HelpFinderQuestions')) {
            return 'helpfinder';
          }
        },
      },
    },
    // Raise the default 500 KB warning threshold — our chunks are reasonably sized now.
    chunkSizeWarningLimit: 800,
  },
})
