const TUBE_W = 130
const TUBE_H = 280
const DOME_H = 26
const BASE_H = 52
const GLASS_X = 10
const POST_W = 6
const POST_TOP_Y = 34
const POST_BOT_OVERHANG = 6

const FONT_FAMILY = "'Nixie One', 'Times New Roman', Times, serif"
const FONT_STYLE = { fontVariantNumeric: 'lining-nums tabular-nums' } as const

const glassPath = (x: number, y: number, w: number, h: number) => {
	const r = w * 0.45
	const rb = w * 0.18
	return [
		`M ${x},${y + r}`,
		`Q ${x},${y} ${x + r},${y}`,
		`L ${x + w - r},${y}`,
		`Q ${x + w},${y} ${x + w},${y + r}`,
		`L ${x + w},${y + h - rb}`,
		`Q ${x + w},${y + h} ${x + w - rb},${y + h}`,
		`L ${x + rb},${y + h}`,
		`Q ${x},${y + h} ${x},${y + h - rb}`,
		'Z',
	].join(' ')
}

export const Tube = ({
	x,
	y,
	char,
	index,
}: {
	x: number
	y: number
	char: string
	index: number
}) => {
	const W = TUBE_W
	const H = TUBE_H

	const postBaseY = H - BASE_H + POST_BOT_OVERHANG
	const postH = postBaseY - POST_TOP_Y
	const postPositions = [GLASS_X - POST_W + 2, W - GLASS_X - 2]

	const glassY = 8
	const glassH = H - BASE_H - glassY + 4
	const glassW = W - GLASS_X * 2
	const path = glassPath(GLASS_X, glassY, glassW, glassH)
	const clipId = `nixie-clip-${index}`
	const maskId = `nixie-mask-${index}`

	const center = { x: W / 2, y: glassY + glassH * 0.54 }
	const haloRx = glassW * 0.62
	const haloRy = glassH * 0.52

	const bx = 2
	const bw = W - 4
	const by = H - BASE_H
	const bh = BASE_H

	const fontSize = glassH * 0.86

	return (
		<g transform={`translate(${x} ${y})`}>
			<ellipse
				cx={W / 2}
				cy={H * 0.55}
				rx={W * 0.85}
				ry={H * 0.45}
				fill="url(#nixie-spill)"
			/>

			{postPositions.map((px, i) => (
				<g key={`post${i}`}>
					<rect
						x={px - 1}
						y={POST_TOP_Y - 1}
						width={POST_W + 2}
						height={postH + 2}
						rx={(POST_W + 2) / 2}
						ry={(POST_W + 2) / 2}
						fill="#000"
						opacity="0.55"
					/>
					<rect
						x={px}
						y={POST_TOP_Y}
						width={POST_W}
						height={postH}
						rx={POST_W / 2}
						ry={POST_W / 2}
						fill="url(#nixie-post)"
					/>
					<rect
						x={px + 1}
						y={POST_TOP_Y + 1.5}
						width={POST_W - 2}
						height="1"
						rx="0.5"
						ry="0.5"
						fill="#9a9aa0"
						opacity="0.5"
					/>
				</g>
			))}

			<clipPath id={clipId}>
				<path d={path} />
			</clipPath>
			<mask id={maskId}>
				<rect x={GLASS_X} y={glassY} width={glassW} height={glassH} fill="black" />
				<ellipse
					cx={center.x}
					cy={center.y}
					rx={haloRx * 1.05}
					ry={haloRy * 1.05}
					fill="url(#nixie-mesh-heat)"
				/>
			</mask>

			<path d={path} fill="url(#nixie-glass-fill)" />

			<g clip-path={`url(#${clipId})`}>
				<rect
					x={GLASS_X}
					y={glassY}
					width={glassW}
					height={glassH}
					fill="url(#nixie-hex-dim)"
				/>

				<ellipse
					cx={center.x}
					cy={center.y}
					rx={haloRx}
					ry={haloRy}
					fill="url(#nixie-halo)"
				/>
				<rect
					x={GLASS_X}
					y={glassY}
					width={glassW}
					height={glassH}
					fill="url(#nixie-hex-lit)"
					mask={`url(#${maskId})`}
				/>

				<text
					x={center.x}
					y={center.y}
					text-anchor="middle"
					dominant-baseline="central"
					font-family={FONT_FAMILY}
					font-size={fontSize}
					style={FONT_STYLE}
					fill="url(#nixie-wire)"
					filter="url(#nixie-wire-glow)"
				>
					{char}
				</text>
				<text
					x={center.x}
					y={center.y - 0.6}
					text-anchor="middle"
					dominant-baseline="central"
					font-family={FONT_FAMILY}
					font-size={fontSize}
					style={FONT_STYLE}
					fill="#fff4d0"
					opacity="0.7"
				>
					{char}
				</text>

				<rect
					x={GLASS_X}
					y={glassY}
					width={glassW}
					height={glassH}
					fill="url(#nixie-glass-edge)"
				/>

				<rect
					x={GLASS_X + glassW * 0.13}
					y={glassY + 12}
					width={glassW * 0.05}
					height={glassH - 30}
					rx="2"
					ry="2"
					fill="url(#nixie-reflect-strong)"
				/>
				<rect
					x={GLASS_X + glassW * 0.26}
					y={glassY + 26}
					width={glassW * 0.02}
					height={glassH - 60}
					rx="1"
					ry="1"
					fill="url(#nixie-reflect-soft)"
					opacity="0.6"
				/>
				<rect
					x={GLASS_X + glassW * 0.81}
					y={glassY + 30}
					width={glassW * 0.025}
					height={glassH * 0.45}
					rx="1"
					ry="1"
					fill="url(#nixie-reflect-soft)"
					opacity="0.55"
				/>
				<ellipse
					cx={GLASS_X + glassW * 0.5}
					cy={glassY + DOME_H * 0.4}
					rx={glassW * 0.32}
					ry="3"
					fill="#ffffff"
					opacity="0.18"
				/>
				<path
					d={path}
					fill="none"
					stroke="#ffffff"
					stroke-opacity="0.22"
					stroke-width="3"
				/>
			</g>

			<path
				d={path}
				fill="none"
				stroke="#2a2a2e"
				stroke-width="0.8"
				stroke-opacity="0.85"
			/>

			<rect
				x={bx - 1}
				y={by + 4}
				width={bw + 2}
				height={bh}
				rx="6"
				ry="6"
				fill="#000"
				opacity="0.55"
			/>
			<rect x={bx} y={by} width={bw} height={bh} rx="6" ry="6" fill="url(#nixie-base)" />
			<rect
				x={bx + 2}
				y={by + 2}
				width={bw - 4}
				height="5"
				rx="3"
				ry="3"
				fill="url(#nixie-base-rim)"
			/>
			<rect
				x={bx + 3}
				y={by + 2.5}
				width={bw - 6}
				height="1"
				fill="#5a5a5a"
				opacity="0.7"
			/>
			<rect x={bx + 2} y={by + 8} width={bw - 4} height="1" fill="#000" opacity="0.8" />
			{[16, 26].map((dy) => (
				<g key={`groove${dy}`}>
					<rect
						x={bx + 4}
						y={by + dy}
						width={bw - 8}
						height="1"
						fill="#000"
						opacity="0.55"
					/>
					<rect
						x={bx + 4}
						y={by + dy + 1}
						width={bw - 8}
						height="0.8"
						fill="#3a3a3a"
						opacity="0.35"
					/>
				</g>
			))}
			<rect
				x={bx + 2}
				y={by + bh - 2}
				width={bw - 4}
				height="1.5"
				fill="#000"
				opacity="0.85"
			/>
			<rect
				x="10"
				y={by + 9}
				width={W - 20}
				height="4"
				rx="2"
				ry="2"
				fill="#ff6a18"
				opacity="0.22"
			/>
		</g>
	)
}

export { TUBE_W, TUBE_H }
