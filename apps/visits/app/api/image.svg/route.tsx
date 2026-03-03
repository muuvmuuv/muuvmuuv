import { getAnalytics, sendView } from 'app/libs/SimpleAnalytics'
import { after, type NextRequest, NextResponse } from 'next/server'
import { Classic } from '../../components/Classic/Classic'
import type { ClockProperties } from '../../components/Clock'
import { Cyber } from '../../components/Cyber/Cyber'
import { Flip } from '../../components/Flip/Flip'

/**
 * Render and return SVG counter.
 */
export async function GET(request: NextRequest): Promise<NextResponse> {
	const { renderToString } = await import('react-dom/server')

	const urlParams = new URLSearchParams(request.url)

	const debug = request.url.includes('debug')

	const themeName = urlParams.get('theme') || 'classic'
	const themeComponents: Record<string, React.FC<ClockProperties>> = {
		classic: Classic,
		cyber: Cyber,
		flip: Flip,
	}
	const ThemeComponent = themeComponents[themeName]

	let pageviews = 1234567890

	if (!debug) {
		after(async () => {
			await sendView(request)
		})

		const analytics = await getAnalytics()
		pageviews = analytics.pageviews
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
