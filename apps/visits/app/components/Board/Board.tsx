import { numberToArray } from '../../utils'
import type { ClockProperties } from '../Clock'
import { Block } from './Block'
import { Defs } from './Defs'

const TILE_W = 200
const TILE_H = 260
const GAP = 16
const PAD = 26
const RADIUS = 20

/**
 * Flipboard: outer dark housing containing per-digit tiles. Each tile has its
 * own embossed groove, top/bottom flap gradients, metal hinges and a split-
 * shaded digit drawn on top. Ported from the Claude Design reference HTML.
 */
export const Board = ({ pageviews }: ClockProperties) => {
	const digits = numberToArray(pageviews)
	const count = digits.length

	const innerW = count * TILE_W + (count - 1) * GAP
	const totalW = innerW + PAD * 2
	const totalH = TILE_H + PAD * 2

	return (
		<svg
			aria-label={`This page has ${pageviews} total visits`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox={`0 0 ${totalW} ${totalH}`}
			fill="none"
			role="img"
		>
			<Defs />
			<rect
				x="0.5"
				y="0.5"
				width={totalW - 1}
				height={totalH - 1}
				rx={RADIUS + 10}
				ry={RADIUS + 10}
				fill="url(#board-bg)"
				stroke="#000"
				stroke-opacity="0.8"
				stroke-width="1"
			/>
			<rect
				x="1.5"
				y="1.5"
				width={totalW - 3}
				height={totalH - 3}
				rx={RADIUS + 9}
				ry={RADIUS + 9}
				fill="none"
				stroke="#ffffff"
				stroke-opacity="0.045"
				stroke-width="1"
			/>
			{digits.map((d, i) => (
				<Block key={`b${i}`} index={i} x={PAD + i * (TILE_W + GAP)} y={PAD} number={d} />
			))}
		</svg>
	)
}
