import { numberToArray } from '../../utils'
import type { ClockProperties } from '../Clock'
import { Defs } from './Defs'
import { Digit } from './Digit'
import {
	BEZEL_H,
	BEZEL_INSET,
	BEZEL_MIN_W,
	BEZEL_R,
	DIGIT_H,
	DIGIT_SCALE,
	DIGIT_SPACING,
	DIGIT_W,
	INNER_PAD_X,
	SCREEN_R,
	SLANT,
} from './segments'

/**
 * Chrome-bezeled LCD display with 7-segment digits. Ghost segments are visible
 * dim, active segments glow cyan. Bezel auto-grows to fit the digit count;
 * digit scale is fixed. Ported from the Claude Design reference HTML.
 */
export const Lcd = ({ pageviews }: ClockProperties) => {
	const digits = numberToArray(pageviews)
	const n = digits.length

	const contentW = n * DIGIT_W + (n - 1) * DIGIT_SPACING
	const scaledContentW = contentW * DIGIT_SCALE
	const scaledDigitH = DIGIT_H * DIGIT_SCALE
	const slantPad = Math.tan((Math.abs(SLANT) * Math.PI) / 180) * scaledDigitH

	const requiredScreenW = scaledContentW + slantPad + INNER_PAD_X * 2
	const requiredBezelW = requiredScreenW + BEZEL_INSET * 2
	const bezelW = Math.max(BEZEL_MIN_W, requiredBezelW)

	const sx = BEZEL_INSET
	const sy = BEZEL_INSET
	const sw = bezelW - BEZEL_INSET * 2
	const sh = BEZEL_H - BEZEL_INSET * 2

	const visualW = scaledContentW + slantPad
	const startX = sx + (sw - visualW) / 2 + slantPad
	const startY = sy + (sh - scaledDigitH) / 2

	const rimInset = BEZEL_INSET - 6

	return (
		<svg
			aria-label={`This page has ${pageviews} total visits`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox={`0 0 ${bezelW} ${BEZEL_H}`}
			fill="none"
			role="img"
		>
			<Defs />

			<rect
				x="0"
				y="0"
				width={bezelW}
				height={BEZEL_H}
				rx={BEZEL_R}
				ry={BEZEL_R}
				fill="url(#lcd-chrome)"
			/>
			<rect
				x="0.5"
				y="0.5"
				width={bezelW - 1}
				height={BEZEL_H - 1}
				rx={BEZEL_R}
				ry={BEZEL_R}
				fill="none"
				stroke="#ffffff"
				stroke-opacity="0.55"
				stroke-width="1"
			/>
			<rect
				x="0"
				y="0"
				width={bezelW}
				height={BEZEL_H}
				rx={BEZEL_R}
				ry={BEZEL_R}
				fill="none"
				stroke="#000"
				stroke-opacity="0.55"
				stroke-width="1.5"
			/>

			<rect
				x={rimInset}
				y={rimInset}
				width={bezelW - rimInset * 2}
				height={BEZEL_H - rimInset * 2}
				rx={SCREEN_R + 6}
				ry={SCREEN_R + 6}
				fill="url(#lcd-chrome-inner-rim)"
			/>

			<rect
				x={sx}
				y={sy}
				width={sw}
				height={sh}
				rx={SCREEN_R}
				ry={SCREEN_R}
				fill="url(#lcd-screen)"
			/>
			<rect
				x={sx}
				y={sy}
				width={sw}
				height={sh * 0.45}
				rx={SCREEN_R}
				ry={SCREEN_R}
				fill="url(#lcd-sheen)"
			/>
			<rect
				x={sx + 0.5}
				y={sy + 0.5}
				width={sw - 1}
				height={sh - 1}
				rx={SCREEN_R}
				ry={SCREEN_R}
				fill="none"
				stroke="#000"
				stroke-opacity="0.6"
				stroke-width="1"
			/>

			<g
				transform={`translate(${startX} ${startY}) scale(${DIGIT_SCALE}) skewX(${SLANT})`}
			>
				{digits.map((d, i) => (
					<Digit
						key={`d${i}`}
						char={d > 9 ? 'E' : String(d)}
						x={i * (DIGIT_W + DIGIT_SPACING)}
					/>
				))}
			</g>
		</svg>
	)
}
