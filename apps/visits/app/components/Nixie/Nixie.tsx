import { numberToArray } from '../../utils'
import type { ClockProperties } from '../Clock'
import { Defs } from './Defs'
import { Tube, TUBE_H, TUBE_W } from './Tube'

const TUBE_GAP = 16
const PANEL_PAD_X = 32
const PANEL_PAD_Y = 32

/**
 * Nixie tube counter: cylindrical glass tubes with curved domes, honeycomb
 * anode mesh, and warm wire-formed digits glowing in amber. Ported from the
 * Claude Design reference HTML.
 */
export const Nixie = ({ pageviews }: ClockProperties) => {
	const digits = numberToArray(pageviews)
	const chars = digits.map((d) => (d > 9 ? 'E' : String(d)))
	const n = chars.length

	const contentW = n * TUBE_W + (n - 1) * TUBE_GAP
	const panelW = contentW + PANEL_PAD_X * 2
	const panelH = TUBE_H + PANEL_PAD_Y * 2

	return (
		<svg
			aria-label={`This page has ${pageviews} total visits`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox={`0 0 ${panelW} ${panelH}`}
			fill="none"
			role="img"
		>
			<Defs />

			<rect
				x="0"
				y="0"
				width={panelW}
				height={panelH}
				rx="14"
				ry="14"
				fill="url(#nixie-panel)"
			/>
			<rect
				x="0"
				y="0"
				width={panelW}
				height={panelH}
				rx="14"
				ry="14"
				fill="url(#nixie-brushed)"
			/>
			<rect
				x="0"
				y="0"
				width={panelW}
				height={panelH}
				rx="14"
				ry="14"
				fill="url(#nixie-speckle)"
			/>
			<rect
				x="2"
				y="1.5"
				width={panelW - 4}
				height="1"
				rx="0.5"
				ry="0.5"
				fill="#ffffff"
				opacity="0.14"
			/>
			<rect
				x="2"
				y={panelH - 2.5}
				width={panelW - 4}
				height="1"
				fill="#000"
				opacity="0.6"
			/>
			<rect
				x="1.5"
				y="1.5"
				width={panelW - 3}
				height={panelH - 3}
				rx="13"
				ry="13"
				fill="none"
				stroke="#000"
				stroke-opacity="1"
				stroke-width="3"
			/>
			<rect
				x="10"
				y="10"
				width={panelW - 20}
				height={panelH - 20}
				rx="8"
				ry="8"
				fill="none"
				stroke="#c25a0f"
				stroke-opacity="0.12"
				stroke-width="6"
			/>
			<rect
				x="10"
				y="10"
				width={panelW - 20}
				height={panelH - 20}
				rx="8"
				ry="8"
				fill="none"
				stroke="#c0631c"
				stroke-opacity="0.35"
				stroke-width="2.5"
			/>
			<rect
				x="10"
				y="10"
				width={panelW - 20}
				height={panelH - 20}
				rx="8"
				ry="8"
				fill="none"
				stroke="#ffb060"
				stroke-opacity="0.9"
				stroke-width="0.8"
			/>

			{chars.map((c, i) => (
				<Tube
					key={`t${i}`}
					index={i}
					x={PANEL_PAD_X + i * (TUBE_W + TUBE_GAP)}
					y={PANEL_PAD_Y}
					char={c}
				/>
			))}
		</svg>
	)
}
