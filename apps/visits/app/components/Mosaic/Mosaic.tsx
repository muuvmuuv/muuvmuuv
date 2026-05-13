import { numberToArray } from '../../utils'
import type { ClockProperties } from '../Clock'
import { Defs } from './Defs'
import {
	BEZEL,
	CELL,
	CHAR_GAP_COLS,
	GAP,
	GLYPHS,
	GLYPH_COLS,
	GLYPH_ROWS,
	PAD_COLS,
	PAD_ROWS,
	STRIDE,
} from './glyphs'

const FLIP_COUNT = 12
const FLIP_DUR_MIN_S = 0.9
const FLIP_DUR_MAX_S = 3.4

/**
 * Mosaic: 5x7 dot-matrix LED panel. Every cell is rendered — lit cells form
 * the digits in amber, off cells stay visible as the matrix backdrop. Ported
 * from the Claude Design reference HTML; replaces the old Cyber theme.
 */
export const Mosaic = ({ pageviews }: ClockProperties) => {
	const digits = numberToArray(pageviews)
	const chars = digits.map((d) => (d > 9 || Number.isNaN(d) ? 'E' : String(d)))

	const nRows = PAD_ROWS * 2 + GLYPH_ROWS
	const charsW = chars.length * GLYPH_COLS + (chars.length - 1) * CHAR_GAP_COLS
	const nCols = PAD_COLS * 2 + charsW

	const grid: number[][] = Array.from({ length: nRows }, () =>
		Array.from({ length: nCols }, () => 0),
	)
	for (const [i, c] of chars.entries()) {
		const colOffset = PAD_COLS + i * (GLYPH_COLS + CHAR_GAP_COLS)
		const g = GLYPHS[c] || GLYPHS.E
		for (let r = 0; r < GLYPH_ROWS; r++) {
			for (let cc = 0; cc < GLYPH_COLS; cc++) {
				if (g[r][cc]) grid[PAD_ROWS + r][colOffset + cc] = 1
			}
		}
	}

	const panelW = nCols * STRIDE + GAP
	const panelH = nRows * STRIDE + GAP
	const totalW = panelW + BEZEL * 2
	const totalH = panelH + BEZEL * 2

	const cells: { key: string; x: number; y: number; on: boolean }[] = []
	for (let r = 0; r < nRows; r++) {
		for (let c = 0; c < nCols; c++) {
			cells.push({
				key: `r${r}c${c}`,
				x: BEZEL + GAP + c * STRIDE,
				y: BEZEL + GAP + r * STRIDE,
				on: grid[r][c] === 1,
			})
		}
	}

	const litIndices = cells.flatMap((cell, i) => (cell.on ? [i] : []))
	const flipping = new Map<number, { dur: string; begin: string }>()
	const picked = new Set<number>()
	while (picked.size < Math.min(FLIP_COUNT, litIndices.length)) {
		picked.add(litIndices[Math.floor(Math.random() * litIndices.length)])
	}
	for (const idx of picked) {
		const dur = FLIP_DUR_MIN_S + Math.random() * (FLIP_DUR_MAX_S - FLIP_DUR_MIN_S)
		flipping.set(idx, {
			dur: `${dur.toFixed(2)}s`,
			begin: `${(Math.random() * dur).toFixed(2)}s`,
		})
	}

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
				x="0"
				y="0"
				width={totalW}
				height={totalH}
				rx="6"
				ry="6"
				fill="url(#mosaic-bezel)"
			/>
			<rect
				x="0.5"
				y="0.5"
				width={totalW - 1}
				height={totalH - 1}
				rx="6"
				ry="6"
				fill="none"
				stroke="#ffffff"
				stroke-opacity="0.07"
				stroke-width="1"
			/>
			<rect
				x={BEZEL}
				y={BEZEL}
				width={panelW}
				height={panelH}
				rx="2"
				ry="2"
				fill="url(#mosaic-panel)"
			/>
			{cells.map(({ key, x, y, on }, i) => {
				const flip = flipping.get(i)
				if (flip) {
					return (
						<g key={key}>
							<rect
								x={x}
								y={y}
								width={CELL}
								height={CELL}
								rx="1.2"
								ry="1.2"
								fill="url(#mosaic-cell-off)"
							/>
							<rect
								x={x + 1}
								y={y + 0.6}
								width={CELL - 2}
								height="1"
								fill="#34373c"
								opacity="0.55"
							/>
							<g>
								<rect
									x={x}
									y={y}
									width={CELL}
									height={CELL}
									rx="1.2"
									ry="1.2"
									fill="url(#mosaic-cell-on)"
								/>
								<rect
									x={x + 1}
									y={y + 0.6}
									width={CELL - 2}
									height="1"
									fill="#fff3a8"
									opacity="0.7"
								/>
								<animate
									attributeName="opacity"
									values="1;0;1"
									keyTimes="0;0.92;0.97"
									dur={flip.dur}
									begin={flip.begin}
									repeatCount="indefinite"
									calcMode="discrete"
								/>
							</g>
						</g>
					)
				}
				return (
					<g key={key}>
						<rect
							x={x}
							y={y}
							width={CELL}
							height={CELL}
							rx="1.2"
							ry="1.2"
							fill={on ? 'url(#mosaic-cell-on)' : 'url(#mosaic-cell-off)'}
						/>
						<rect
							x={x + 1}
							y={y + 0.6}
							width={CELL - 2}
							height="1"
							fill={on ? '#fff3a8' : '#34373c'}
							opacity={on ? '0.7' : '0.55'}
						/>
					</g>
				)
			})}
		</svg>
	)
}
