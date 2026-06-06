import { after, type NextRequest, NextResponse } from 'next/server'

import { Board } from '../../components/Board/Board'
import type { ClockProperties } from '../../components/Clock'
import { Flip } from '../../components/Flip/Flip'
import { Lcd } from '../../components/Lcd/Lcd'
import { Mosaic } from '../../components/Mosaic/Mosaic'
import { Nixie } from '../../components/Nixie/Nixie'
import { Tiles } from '../../components/Tiles/Tiles'
import { getAnalytics, sendView } from '../../libs/GoatCounter'

// Carried over from SimpleAnalytics. Neither Umami nor GoatCounter can
// backdate events, so the historical count is added on top of the live total.
const HISTORICAL_PAGEVIEWS = 463

/**
 * Render and return SVG counter.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
	const { renderToString } = await import('react-dom/server')

	const urlParams = request.nextUrl.searchParams

	const debug = urlParams.has('debug')

	const themeComponents: Record<string, React.FC<ClockProperties>> = {
		tiles: Tiles,
		mosaic: Mosaic,
		flip: Flip,
		board: Board,
		lcd: Lcd,
		nixie: Nixie,
	}
	// Flip and Nixie are temporarily excluded from the random pool, but stay
	// available when requested explicitly via ?theme=.
	const randomThemes = Object.keys(themeComponents).filter(
		(name) => name !== 'flip' && name !== 'nixie',
	)
	const themeName =
		urlParams.get('theme') ||
		randomThemes[Math.floor(Math.random() * randomThemes.length)]
	const ThemeComponent = themeComponents[themeName] || Tiles

	// Every search param doubles as a theme option — each theme picks the
	// keys it understands (e.g. ?theme=mosaic&color=ff3860).
	const options = Object.fromEntries(urlParams)

	let pageviews = 1234567890

	if (!debug) {
		after(async () => {
			await sendView(request)
		})

		const analytics = await getAnalytics()
		pageviews = analytics.pageviews + HISTORICAL_PAGEVIEWS
	}

	const html = renderToString(
		<ThemeComponent pageviews={pageviews} options={options} />,
	)

	const response = new NextResponse(html, {
		status: 200,
		headers: {
			'Content-Type': 'image/svg+xml',
			'Cache-Control': 'public, max-age=0, stale-while-revalidate',
		},
	})

	return response
}
