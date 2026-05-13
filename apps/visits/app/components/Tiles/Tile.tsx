const TILE_W = 88
const TILE_H = 112
const RADIUS = 18
const INK = '#3a4dff'

const FONT_FAMILY =
	"'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Helvetica Neue', Helvetica, Arial, sans-serif"

export const Tile = ({ x, y, char }: { x: number; y: number; char: string }) => {
	const cx = TILE_W / 2
	const cy = TILE_H / 2

	return (
		<g transform={`translate(${x} ${y})`}>
			<rect
				x="0"
				y="0"
				width={TILE_W}
				height={TILE_H}
				rx={RADIUS}
				ry={RADIUS}
				fill="url(#tile-face)"
				stroke="#141e3c"
				stroke-opacity="0.05"
				stroke-width="1"
				filter="url(#tile-shadow)"
			/>
			<g clip-path="url(#tile-clip)">
				<rect
					x="0"
					y="0"
					width={TILE_W}
					height="1.5"
					fill="#ffffff"
					opacity="0.95"
				/>
				<rect
					x="0"
					y={TILE_H - 1.5}
					width={TILE_W}
					height="1.5"
					fill="#141e3c"
					opacity="0.06"
				/>
			</g>
			<rect
				x={(TILE_W - 34) / 2}
				y="10"
				width="34"
				height="4"
				rx="2"
				ry="2"
				fill="#141e3c"
				opacity="0.08"
			/>
			<text
				x={cx}
				y={cy + 1}
				text-anchor="middle"
				dominant-baseline="central"
				font-family={FONT_FAMILY}
				font-weight="800"
				font-size="64"
				letter-spacing="-2.5"
				fill="#ffffff"
				opacity="0.85"
			>
				{char}
			</text>
			<text
				x={cx}
				y={cy - 1}
				text-anchor="middle"
				dominant-baseline="central"
				font-family={FONT_FAMILY}
				font-weight="800"
				font-size="64"
				letter-spacing="-2.5"
				fill={INK}
				opacity="0.1"
			>
				{char}
			</text>
			<text
				x={cx}
				y={cy}
				text-anchor="middle"
				dominant-baseline="central"
				font-family={FONT_FAMILY}
				font-weight="800"
				font-size="64"
				letter-spacing="-2.5"
				fill={INK}
			>
				{char}
			</text>
		</g>
	)
}
