import { numberToArray } from '../../utils'
import type { ClockProperties } from '../Clock'
import { Defs } from './Defs'
import { Tile } from './Tile'

const TILE_W = 88
const TILE_H = 112
const GAP = 14
const PAD = 24

const BLINK_DUR_MIN_S = 4
const BLINK_DUR_MAX_S = 8

/**
 * Paper-tile counter: rounded white tiles with layered drop shadows, a
 * registration bar near the top, and pressed-ink digits in indigo. Replaces
 * the old Classic theme. Ported from the Claude Design reference HTML.
 */
export const Tiles = ({ pageviews }: ClockProperties) => {
	const digits = numberToArray(pageviews)
	const n = digits.length

	const innerW = n * TILE_W + (n - 1) * GAP
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
			{digits.map((d, i) => {
				const dur =
					BLINK_DUR_MIN_S + Math.random() * (BLINK_DUR_MAX_S - BLINK_DUR_MIN_S)
				return (
					<Tile
						key={`t${i}`}
						x={PAD + i * (TILE_W + GAP)}
						y={PAD}
						char={d > 9 ? 'E' : String(d)}
						blink={{
							dur: `${dur.toFixed(2)}s`,
							begin: `${(Math.random() * 1.5).toFixed(2)}s`,
						}}
					/>
				)
			})}
		</svg>
	)
}
