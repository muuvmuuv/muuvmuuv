import fetch from 'node-fetch'

import { type NextRequest, NextResponse, after } from 'next/server'
import { Classic } from '../../components/Classic/Classic'
import type { ClockProperties } from '../../components/Clock'
import { Cyber } from '../../components/Cyber/Cyber'
import { Flip } from '../../components/Flip/Flip'
import { SAField, type SAJsonResponse } from '../../libs/SimpleAnalytics'

/**
 * Send view to SimpleAnalytics.
 *
 * @see https://docs.simpleanalytics.com/server-side-tracking
 */
async function sendView(request: NextRequest) {
	return await fetch('https://queue.simpleanalyticscdn.com/post', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({
			url: 'https://visits.github.marvin.digital/',
			ua: request.headers.get('user-agent'),
			referrer:
				request.headers.get('referer') || request.headers.get('referrer') || 'direct',
			tz: process.env.TZ || '',
		}),
	})
}

/**
 * Get current analytics stats from SimpleAnalytics.
 *
 * @see https://docs.simpleanalytics.com/api/stats#query-parameters
 */
async function getAnalytics(): Promise<SAJsonResponse> {
	const fields = [SAField.PAGEVIEWS]
	const baseUri = 'https://simpleanalytics.com/visits.github.marvin.digital.json'
	const response = await fetch(
		`${baseUri}?version=5&info=false&fields=${fields.join(',')}`,
	)
	return (await response.json()) as SAJsonResponse
}

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
