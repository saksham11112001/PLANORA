import type { NextConfig } from 'next'

const config: NextConfig = {
  // Compress responses
  compress: true,

  // Experimental optimizations
  experimental: {
    // Optimize package imports — reduces bundle size for large icon/UI libs
    optimizePackageImports: ['lucide-react', 'recharts', '@supabase/supabase-js'],
    // Faster server components

  },

  // Images
  images: {
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 3600,
  },

  // Headers — aggressive caching for static assets
  async headers() {
    return [
      {
        source: '/_next/static/(.*)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=31536000, immutable' }],
      },
      {
        source: '/favicon.svg',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400' }],
      },
    ]
  },
}

export default config
