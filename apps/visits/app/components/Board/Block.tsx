const TILE_W = 200
const TILE_H = 260
const RADIUS = 20
const SPLIT_GAP = 6
const INSET = 4
const HINGE_W = 14
const HINGE_H = 18
const HINGE_OVERHANG = 4

export const Block = ({
	index,
	x,
	y,
	number,
}: {
	index: number
	x: number
	y: number
	number: number
}) => {
	const char = number > 9 ? 'E' : String(number)
	const splitY = TILE_H / 2
	const topRectH = splitY - SPLIT_GAP / 2
	const botRectY = splitY + SPLIT_GAP / 2
	const botRectH = TILE_H - botRectY
	const uid = `board-tile-${index}`
	const fontSize = TILE_H * 0.85
	const cx = TILE_W / 2
	const cy = TILE_H / 2

	return (
		<g transform={`translate(${x} ${y})`}>
			<defs>
				<clipPath id={`${uid}-shape`}>
					<rect x="0" y="0" width={TILE_W} height={TILE_H} rx={RADIUS} ry={RADIUS} />
				</clipPath>
				<clipPath id={`${uid}-top`}>
					<rect x="0" y="0" width={TILE_W} height={topRectH} />
				</clipPath>
				<clipPath id={`${uid}-bot`}>
					<rect x="0" y={botRectY} width={TILE_W} height={botRectH} />
				</clipPath>
			</defs>

			<rect
				x={-INSET}
				y={-INSET}
				width={TILE_W + INSET * 2}
				height={TILE_H + INSET * 2}
				rx={RADIUS + INSET}
				ry={RADIUS + INSET}
				fill="#050506"
			/>
			<rect
				x={-INSET + 0.5}
				y={-INSET + 0.5}
				width={TILE_W + INSET * 2 - 1}
				height={TILE_H + INSET * 2 - 1}
				rx={RADIUS + INSET}
				ry={RADIUS + INSET}
				fill="none"
				stroke="#000"
				stroke-opacity="0.9"
				stroke-width="1"
			/>

			<g clip-path={`url(#${uid}-shape)`}>
				<rect x="0" y="0" width={TILE_W} height={topRectH} fill="url(#board-topFlap)" />
				<rect
					x="0"
					y={botRectY}
					width={TILE_W}
					height={botRectH}
					fill="url(#board-botFlap)"
				/>
				<rect
					x="0"
					y={splitY - SPLIT_GAP / 2}
					width={TILE_W}
					height={SPLIT_GAP}
					fill="#000"
				/>
				<rect
					x="0"
					y={splitY + SPLIT_GAP / 2}
					width={TILE_W}
					height="10"
					fill="url(#board-splitGlow)"
					opacity="0.35"
				/>

				<text
					x={cx}
					y={cy}
					text-anchor="middle"
					dominant-baseline="central"
					font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
					font-weight="700"
					font-size={fontSize}
					letter-spacing="-0.02em"
					clip-path={`url(#${uid}-top)`}
					fill="url(#board-inkTop)"
				>
					{char}
				</text>
				<text
					x={cx}
					y={cy}
					text-anchor="middle"
					dominant-baseline="central"
					font-family="'Helvetica Neue', Helvetica, Arial, sans-serif"
					font-weight="700"
					font-size={fontSize}
					letter-spacing="-0.02em"
					clip-path={`url(#${uid}-bot)`}
					fill="url(#board-inkBot)"
				>
					{char}
				</text>
			</g>

			<rect
				x="0.5"
				y="0.5"
				width={TILE_W - 1}
				height={TILE_H - 1}
				rx={RADIUS}
				ry={RADIUS}
				fill="url(#board-bezelEdge)"
				stroke="#000"
				stroke-opacity="0.65"
				stroke-width="1"
			/>

			{[-HINGE_OVERHANG, TILE_W - HINGE_W + HINGE_OVERHANG].map((hx, hi) => {
				const hingeY = splitY - HINGE_H / 2
				return (
					<g key={`h${hi}`}>
						<rect
							x={hx - 0.5}
							y={hingeY - 0.5}
							width={HINGE_W + 1}
							height={HINGE_H + 1}
							rx="2"
							ry="2"
							fill="#000"
							opacity="0.85"
						/>
						<rect
							x={hx}
							y={hingeY}
							width={HINGE_W}
							height={HINGE_H}
							rx="1.5"
							ry="1.5"
							fill="url(#board-hinge)"
						/>
						<rect
							x={hx + 0.5}
							y={hingeY + HINGE_H * 0.3}
							width={HINGE_W - 1}
							height="1"
							fill="#eef1f4"
							opacity="0.9"
						/>
						<rect
							x={hx}
							y={splitY - 0.5}
							width={HINGE_W}
							height="1"
							fill="#000"
							opacity="0.65"
						/>
					</g>
				)
			})}
		</g>
	)
}

