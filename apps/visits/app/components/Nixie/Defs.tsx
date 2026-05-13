const HEX_S = 4
const HEX_SQ = HEX_S * Math.sqrt(3)
export const HEX_TILE_W = HEX_S * 3
export const HEX_TILE_H = HEX_SQ

const hexPoints = (cx: number, cy: number) =>
	[
		[cx - HEX_S, cy],
		[cx - HEX_S / 2, cy - HEX_SQ / 2],
		[cx + HEX_S / 2, cy - HEX_SQ / 2],
		[cx + HEX_S, cy],
		[cx + HEX_S / 2, cy + HEX_SQ / 2],
		[cx - HEX_S / 2, cy + HEX_SQ / 2],
	]
		.map((p) => p.join(','))
		.join(' ')

const HexPattern = ({
	id,
	stroke,
	strokeOpacity,
	strokeWidth,
}: {
	id: string
	stroke: string
	strokeOpacity: string
	strokeWidth: string
}) => (
	<pattern id={id} patternUnits="userSpaceOnUse" width={HEX_TILE_W} height={HEX_TILE_H}>
		<polygon
			points={hexPoints(HEX_S, HEX_TILE_H / 2)}
			fill="none"
			stroke={stroke}
			stroke-opacity={strokeOpacity}
			stroke-width={strokeWidth}
		/>
		<polygon
			points={hexPoints(HEX_S * 2.5, 0)}
			fill="none"
			stroke={stroke}
			stroke-opacity={strokeOpacity}
			stroke-width={strokeWidth}
		/>
		<polygon
			points={hexPoints(HEX_S * 2.5, HEX_TILE_H)}
			fill="none"
			stroke={stroke}
			stroke-opacity={strokeOpacity}
			stroke-width={strokeWidth}
		/>
	</pattern>
)

export const Defs = () => (
	<defs>
		<linearGradient id="nixie-panel" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#1a1a1c" />
			<stop offset="0.5" stop-color="#0e0e10" />
			<stop offset="1" stop-color="#060608" />
		</linearGradient>

		<pattern id="nixie-brushed" patternUnits="userSpaceOnUse" width="3" height="120">
			<line
				x1="0.5"
				y1="0"
				x2="0.5"
				y2="120"
				stroke="#ffffff"
				stroke-opacity="0.025"
				stroke-width="0.5"
			/>
			<line
				x1="2"
				y1="0"
				x2="2"
				y2="120"
				stroke="#000000"
				stroke-opacity="0.25"
				stroke-width="0.6"
			/>
		</pattern>

		<pattern id="nixie-speckle" patternUnits="userSpaceOnUse" width="60" height="60">
			<circle cx="7" cy="11" r="0.4" fill="#ffffff" opacity="0.04" />
			<circle cx="23" cy="34" r="0.4" fill="#ffffff" opacity="0.04" />
			<circle cx="41" cy="19" r="0.4" fill="#ffffff" opacity="0.04" />
			<circle cx="55" cy="49" r="0.4" fill="#ffffff" opacity="0.04" />
			<circle cx="15" cy="54" r="0.4" fill="#ffffff" opacity="0.04" />
			<circle cx="34" cy="6" r="0.4" fill="#ffffff" opacity="0.04" />
		</pattern>

		<linearGradient id="nixie-post" x1="0" y1="0" x2="1" y2="0">
			<stop offset="0" stop-color="#0a0a0b" />
			<stop offset="0.5" stop-color="#3a3a3f" />
			<stop offset="1" stop-color="#0a0a0b" />
		</linearGradient>

		<linearGradient id="nixie-base" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#22221f" />
			<stop offset="0.15" stop-color="#181816" />
			<stop offset="0.55" stop-color="#0d0d0b" />
			<stop offset="1" stop-color="#040403" />
		</linearGradient>

		<linearGradient id="nixie-base-rim" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#3a3a3a" />
			<stop offset="0.5" stop-color="#1d1d1c" />
			<stop offset="1" stop-color="#0a0a09" />
		</linearGradient>

		<linearGradient id="nixie-glass-fill" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#08070a" />
			<stop offset="0.55" stop-color="#0a0708" />
			<stop offset="1" stop-color="#180a06" />
		</linearGradient>

		<linearGradient id="nixie-glass-edge" x1="0" y1="0" x2="1" y2="0">
			<stop offset="0" stop-color="#000" stop-opacity="0.85" />
			<stop offset="0.1" stop-color="#000" stop-opacity="0.35" />
			<stop offset="0.5" stop-color="#000" stop-opacity="0" />
			<stop offset="0.9" stop-color="#000" stop-opacity="0.35" />
			<stop offset="1" stop-color="#000" stop-opacity="0.85" />
		</linearGradient>

		<radialGradient id="nixie-halo" cx="0.5" cy="0.5" r="0.55">
			<stop offset="0" stop-color="#ffb060" stop-opacity="0.55" />
			<stop offset="0.35" stop-color="#ff7820" stop-opacity="0.30" />
			<stop offset="0.7" stop-color="#ff5010" stop-opacity="0.08" />
			<stop offset="1" stop-color="#ff5010" stop-opacity="0" />
		</radialGradient>

		<radialGradient id="nixie-mesh-heat" cx="0.5" cy="0.5" r="0.55">
			<stop offset="0" stop-color="white" stop-opacity="1" />
			<stop offset="0.6" stop-color="white" stop-opacity="0.25" />
			<stop offset="1" stop-color="white" stop-opacity="0" />
		</radialGradient>

		<HexPattern
			id="nixie-hex-dim"
			stroke="#5a1a0c"
			strokeOpacity="0.95"
			strokeWidth="0.55"
		/>
		<HexPattern
			id="nixie-hex-lit"
			stroke="#ff8a30"
			strokeOpacity="0.85"
			strokeWidth="0.6"
		/>

		<radialGradient id="nixie-spill" cx="0.5" cy="0.5" r="0.5">
			<stop offset="0" stop-color="#ff8a30" stop-opacity="0.30" />
			<stop offset="0.55" stop-color="#ff5010" stop-opacity="0.10" />
			<stop offset="1" stop-color="#ff5010" stop-opacity="0" />
		</radialGradient>

		<linearGradient id="nixie-wire" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#ffd380" />
			<stop offset="0.5" stop-color="#ff9a30" />
			<stop offset="1" stop-color="#ff6a18" />
		</linearGradient>

		<linearGradient id="nixie-reflect-strong" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#ffffff" stop-opacity="0" />
			<stop offset="0.15" stop-color="#ffffff" stop-opacity="0.55" />
			<stop offset="0.55" stop-color="#ffffff" stop-opacity="0.20" />
			<stop offset="1" stop-color="#ffffff" stop-opacity="0" />
		</linearGradient>
		<linearGradient id="nixie-reflect-soft" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#ffffff" stop-opacity="0" />
			<stop offset="0.4" stop-color="#ffffff" stop-opacity="0.18" />
			<stop offset="1" stop-color="#ffffff" stop-opacity="0" />
		</linearGradient>

		<filter id="nixie-wire-glow" x="-50%" y="-50%" width="200%" height="200%">
			<feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="g1" />
			<feGaussianBlur in="SourceGraphic" stdDeviation="6" result="g2" />
			<feMerge>
				<feMergeNode in="g2" />
				<feMergeNode in="g1" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>
)
