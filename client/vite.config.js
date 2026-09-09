import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      // Precache the app shell (HTML, JS, CSS bundles)
      includeAssets: ['logo.svg', 'robots.txt', 'offline.html'],
      manifest: {
        name: 'Mr. Baraiya Portfolio',
        short_name: 'Baraiya',
        description: 'Portfolio of Vishal Baraiya — Full-Stack Software Engineer',
        theme_color: '#050508',
        background_color: '#050508',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: 'logo.svg',
            sizes: 'any',
            type: 'image/svg+xml',
            purpose: 'any maskable',
          },
        ],
      },
      workbox: {
        // ── Runtime caching rules (applied on top of precache) ─────────────

        runtimeCaching: [
          // 1. Vercel Blob images & PDFs — Cache First (30 days)
          //    These assets are immutable once uploaded to Blob storage.
          {
            urlPattern: /^https:\/\/catgbuvicqq4rhla\.public\.blob\.vercel-storage\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'vercel-blob-assets',
              expiration: {
                maxEntries: 150,
                maxAgeSeconds: 60 * 60 * 24 * 30, // 30 days
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          // 2. API GET responses — Stale While Revalidate (5 min)
          //    Serve cached API data instantly, refresh in background.
          {
            urlPattern: ({ url, request }) =>
              url.hostname.includes('mr-baraiya-portfolio-server') &&
              url.pathname.startsWith('/api') &&
              request.method === 'GET',
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'api-responses',
              expiration: {
                maxEntries: 30,
                maxAgeSeconds: 60 * 5, // 5 minutes
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          // 3. Google Fonts — Cache First (1 year, they're versioned)
          {
            urlPattern: /^https:\/\/fonts\.(googleapis|gstatic)\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: {
                maxEntries: 20,
                maxAgeSeconds: 60 * 60 * 24 * 365, // 1 year
              },
              cacheableResponse: { statuses: [0, 200] },
            },
          },

          // 4. Any other external images — Stale While Revalidate (7 days)
          {
            urlPattern: /\.(?:png|jpg|jpeg|webp|gif|svg|ico)$/i,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'images-general',
              expiration: {
                maxEntries: 60,
                maxAgeSeconds: 60 * 60 * 24 * 7, // 7 days
              },
            },
          },
        ],

        // Show offline.html when navigation fails (user is offline)
        navigateFallback: '/offline.html',
        navigateFallbackDenylist: [/^\/api/, /^\/admin/],

        // Skip waiting so new SW activates immediately
        skipWaiting: true,
        clientsClaim: true,
      },
    }),
  ],

  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:5000',
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
