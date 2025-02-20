import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
	poweredByHeader: false,
	productionBrowserSourceMaps: false,
	// exportPathMap() {
	// 	return {
	// 		'/image.svg': { page: '/api/image.svg' },
	// 	}
	// },
	experimental: {
		useLightningcss: true,
	},
}

export default nextConfig
