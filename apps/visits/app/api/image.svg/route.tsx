import { after, type NextRequest, NextResponse } from 'next/server'

import { Board } from '../../components/Board/Board'
import type { ClockProperties } from '../../components/Clock'
import { Flip } from '../../components/Flip/Flip'
import { Lcd } from '../../components/Lcd/Lcd'
import { Mosaic } from '../../components/Mosaic/Mosaic'
import { Tiles } from '../../components/Tiles/Tiles'
import { getAnalytics, sendView } from '../../libs/Umami'

// Carried over from SimpleAnalytics before the 2026-05-13 migration to Umami.
// Umami Cloud can't backdate events, so the historical count is added here.
const HISTORICAL_PAGEVIEWS = 400

/**
 * Render and return SVG counter.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
	const { renderToString } = await import('react-dom/server')

	const urlParams = new URLSearchParams(request.url)

	const debug = request.url.includes('debug')

	const themeComponents: Record<string, React.FC<ClockProperties>> = {
		tiles: Tiles,
		mosaic: Mosaic,
		flip: Flip,
		board: Board,
		lcd: Lcd,
	}
	const themeNames = Object.keys(themeComponents)
	const themeName =
		urlParams.get('theme') || themeNames[Math.floor(Math.random() * themeNames.length)]
	const ThemeComponent = themeComponents[themeName] || Tiles

	let pageviews = 1234567890

	if (!debug) {
		after(async () => {
			await sendView(request)
		})

		const analytics = await getAnalytics()
		pageviews = analytics.pageviews + HISTORICAL_PAGEVIEWS
	}

	const html = renderToString(<ThemeComponent pageviews={pageviews} />)

	const response = new NextResponse(html, {
		status: 200,
		headers: {
			'Content-Type': 'image/svg+xml',
			'Cache-Control': 'public, max-age=0, stale-while-revalidate',
		},
	})

	return response
}
