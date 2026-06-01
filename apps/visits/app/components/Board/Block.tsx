const TILE_W = 200
const TILE_H = 260
const RADIUS = 20
const SPLIT_GAP = 6
const INSET = 4
const HINGE_W = 14
const HINGE_H = 18
const HINGE_OVERHANG = 4

const SPLIT_Y = TILE_H / 2
const TOP_H = SPLIT_Y - SPLIT_GAP / 2
const BOT_Y = SPLIT_Y + SPLIT_GAP / 2
const BOT_H = TILE_H - BOT_Y
const FONT_SIZE = TILE_H * 0.85
const CX = TILE_W / 2
const CY = TILE_H / 2

const FONT = "'Helvetica Neue', Helvetica, Arial, sans-serif"

// Split-flap cascade. On load every tile clatters through a run of digits and
// freezes on its final value — the classic Solari departure board. Leftmost
// tiles use fewer flaps and settle first, the units wheel spins longest, so the
// row resolves left-to-right. Each flip is two phases: the top half folds down
// onto the hinge (scaleY 1->0, easing in, sliding into shadow), then the bottom
// half unfolds from the hinge (scaleY 0->1, easing out, coming back to light).
//
// Only one resting half is ever visible per side — each settled digit is hidden
// again the moment the next flap covers it — so digits never pile up. An opaque
// flap card (its own background, not just the glyph) covers what it folds over.
const START_S = 0.1 // brief hold on the first card before the roll begins
const STEP_S = 0.12 // duration of one full flip (top fold + bottom unfold)
const HALF_S = STEP_S / 2
const STAGGER_S = 0.04 // per-tile start offset, left to right
const STEPS_BASE = 7
const STEPS_EXTRA = 1
const STEPS_CAP = 11

// Ambient idle: once the cascade settles, the board keeps "ticking over" — one
// tile re-seats its flap every AMB_PERIOD seconds, in a shuffled order, forever.
// A re-seat lands on the SAME digit (it never changes the count); you read it
// from the fold motion and the shadow sweep, exactly like an idle airport board.
const AMB_PERIOD = 2 // seconds between flips across the whole board
const AMB_STEP = 0.3 // duration of one ambient re-seat flip
const AMB_HALF = AMB_STEP / 2
const AMB_LEADIN = 0.7 // calm pause after the cascade before idling starts

// Easings: the fold accelerates as the flap drops, the unfold decelerates as it
// lands — mimicking gravity then the card settling against its stop.
const FOLD_EASE = '0.45 0 1 0.55'
const UNFOLD_EASE = '0 0.45 0.55 1'

const sec = (n: number) => `${n.toFixed(3)}s`
const frac = (n: number) => n.toFixed(4)

// Run of `steps + 1` digits ending on `digit`, rolling upward like a wheel.
const rollSequence = (digit: number, steps: number) =>
	Array.from({ length: steps + 1 }, (_, j) => (digit - steps + j + 100) % 10)

const halfTextProps = {
	x: CX,
	y: CY,
	'text-anchor': 'middle',
	'dominant-baseline': 'central',
	'font-family': FONT,
	'font-weight': '700',
	'font-size': FONT_SIZE,
	'letter-spacing': '-0.02em',
} as const

export const Block = ({
	index,
	count,
	ambientSlot,
	x,
	y,
	number,
}: {
	index: number
	count: number
	ambientSlot: number
	x: number
	y: number
	number: number
}) => {
	const uid = `board-tile-${index}`
	const isDigit = number >= 0 && number <= 9
	const char = isDigit ? String(number) : 'E'

	const steps = Math.min(STEPS_CAP, STEPS_BASE + index * STEPS_EXTRA)
	const start = START_S + index * STAGGER_S
	const seq = isDigit ? rollSequence(number, steps) : []
	// Wall-clock (from document load) for the k-th flip's start and its landing.
	const stepStart = (k: number) => start + (k - 1) * STEP_S
	const topReveal = (j: number) => (j === 0 ? 0 : stepStart(j))
	const botLand = (j: number) => (j === 0 ? 0 : stepStart(j) + STEP_S)

	// Ambient idle timing. The slowest tile (highest index) settles last, so wait
	// for it, then hand each tile a slot in a `count * AMB_PERIOD` cycle. One
	// re-seat fires every AMB_PERIOD seconds, cycling through the shuffled tiles.
	const ambCycle = count * AMB_PERIOD
	const lastSettle =
		START_S +
		(count - 1) * STAGGER_S +
		Math.min(STEPS_CAP, STEPS_BASE + (count - 1) * STEPS_EXTRA) * STEP_S
	const ambBegin = lastSettle + AMB_LEADIN + ambientSlot * AMB_PERIOD
	const ambFold = AMB_HALF / ambCycle // fraction of the cycle: fold done
	const ambLand = AMB_STEP / ambCycle // fraction of the cycle: flip done

	return (
		<g transform={`translate(${x} ${y})`}>
			<defs>
				<clipPath id={`${uid}-shape`}>
					<rect x="0" y="0" width={TILE_W} height={TILE_H} rx={RADIUS} ry={RADIUS} />
				</clipPath>
				<clipPath id={`${uid}-top`}>
					<rect x="0" y="0" width={TILE_W} height={TOP_H} />
				</clipPath>
				<clipPath id={`${uid}-bot`}>
					<rect x="0" y={BOT_Y} width={TILE_W} height={BOT_H} />
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
				{/* Opaque flap surfaces — every digit glyph is drawn on top of these,
				    so nothing bleeds through to the layer below. */}
				<rect x="0" y="0" width={TILE_W} height={TOP_H} fill="url(#board-topFlap)" />
				<rect x="0" y={BOT_Y} width={TILE_W} height={BOT_H} fill="url(#board-botFlap)" />

				{isDigit && (
					<>
						{/* Resting tops: revealed as the flap folds away, hidden again the
						    moment the next flap covers them. Final one freezes on. */}
						{seq.map((d, j) => (
							<text
								key={`st${j}`}
								{...halfTextProps}
								clip-path={`url(#${uid}-top)`}
								fill="url(#board-inkTop)"
								opacity="0"
							>
								<set
									attributeName="opacity"
									to="1"
									begin={sec(topReveal(j))}
									fill="freeze"
								/>
								{j < steps && (
									<set
										attributeName="opacity"
										to="0"
										begin={sec(topReveal(j + 1))}
										fill="freeze"
									/>
								)}
								{d}
							</text>
						))}

						{/* Resting bottoms: take over once the flap has landed. */}
						{seq.map((d, j) => (
							<text
								key={`sb${j}`}
								{...halfTextProps}
								clip-path={`url(#${uid}-bot)`}
								fill="url(#board-inkBot)"
								opacity="0"
							>
								<set
									attributeName="opacity"
									to="1"
									begin={sec(botLand(j))}
									fill="freeze"
								/>
								{j < steps && (
									<set
										attributeName="opacity"
										to="0"
										begin={sec(botLand(j + 1))}
										fill="freeze"
									/>
								)}
								{d}
							</text>
						))}

						{/* Flapping cards: each step the old top folds down, then the new
						    bottom unfolds. Both are opaque and pivot about the hinge. */}
						{seq.slice(1).map((newChar, i) => {
							const k = i + 1
							const oldChar = seq[k - 1]
							const t0 = stepStart(k)
							const tMid = t0 + HALF_S
							const tEnd = t0 + STEP_S

							return (
								<g key={`flap${k}`}>
									<g clip-path={`url(#${uid}-top)`} opacity="0">
										<set attributeName="opacity" to="1" begin={sec(t0)} fill="freeze" />
										<set attributeName="opacity" to="0" begin={sec(tMid)} fill="freeze" />
										<g transform={`translate(0 ${SPLIT_Y})`}>
											<g transform="scale(1 1)">
												<animateTransform
													attributeName="transform"
													type="scale"
													from="1 1"
													to="1 0"
													begin={sec(t0)}
													dur={sec(HALF_S)}
													fill="freeze"
													calcMode="spline"
													keySplines={FOLD_EASE}
												/>
												<g transform={`translate(0 ${-SPLIT_Y})`}>
													<rect
														x="0"
														y="0"
														width={TILE_W}
														height={TOP_H}
														fill="url(#board-topFlap)"
													/>
													<text
														{...halfTextProps}
														clip-path={`url(#${uid}-top)`}
														fill="url(#board-inkTop)"
													>
														{oldChar}
													</text>
													<rect
														x="0"
														y="0"
														width={TILE_W}
														height={TOP_H}
														fill="#000"
														opacity="0"
													>
														<animate
															attributeName="opacity"
															from="0"
															to="0.5"
															begin={sec(t0)}
															dur={sec(HALF_S)}
															fill="freeze"
															calcMode="spline"
															keySplines={FOLD_EASE}
														/>
													</rect>
												</g>
											</g>
										</g>
									</g>

									<g clip-path={`url(#${uid}-bot)`} opacity="0">
										<set attributeName="opacity" to="1" begin={sec(tMid)} fill="freeze" />
										<set attributeName="opacity" to="0" begin={sec(tEnd)} fill="freeze" />
										<g transform={`translate(0 ${SPLIT_Y})`}>
											<g transform="scale(1 0)">
												<animateTransform
													attributeName="transform"
													type="scale"
													from="1 0"
													to="1 1"
													begin={sec(tMid)}
													dur={sec(HALF_S)}
													fill="freeze"
													calcMode="spline"
													keySplines={UNFOLD_EASE}
												/>
												<g transform={`translate(0 ${-SPLIT_Y})`}>
													<rect
														x="0"
														y={BOT_Y}
														width={TILE_W}
														height={BOT_H}
														fill="url(#board-botFlap)"
													/>
													<text
														{...halfTextProps}
														clip-path={`url(#${uid}-bot)`}
														fill="url(#board-inkBot)"
													>
														{newChar}
													</text>
													<rect
														x="0"
														y={BOT_Y}
														width={TILE_W}
														height={BOT_H}
														fill="#000"
														opacity="0.5"
													>
														<animate
															attributeName="opacity"
															from="0.5"
															to="0"
															begin={sec(tMid)}
															dur={sec(HALF_S)}
															fill="freeze"
															calcMode="spline"
															keySplines={UNFOLD_EASE}
														/>
													</rect>
												</g>
											</g>
										</g>
									</g>
								</g>
							)
						})}

						{/* Ambient idle re-seat: same digit folds away and returns,
						    once per cycle, forever — covers then reveals the frozen
						    resting card, so the count is never altered. */}
						<g clip-path={`url(#${uid}-top)`} opacity="0">
							<animate
								attributeName="opacity"
								values="1;0;0"
								keyTimes={`0;${frac(ambFold)};1`}
								dur={sec(ambCycle)}
								begin={sec(ambBegin)}
								repeatCount="indefinite"
								calcMode="discrete"
							/>
							<g transform={`translate(0 ${SPLIT_Y})`}>
								<g transform="scale(1 1)">
									<animateTransform
										attributeName="transform"
										type="scale"
										values="1 1;1 0;1 0"
										keyTimes={`0;${frac(ambFold)};1`}
										dur={sec(ambCycle)}
										begin={sec(ambBegin)}
										repeatCount="indefinite"
										calcMode="spline"
										keySplines={`${FOLD_EASE};0 0 1 1`}
									/>
									<g transform={`translate(0 ${-SPLIT_Y})`}>
										<rect
											x="0"
											y="0"
											width={TILE_W}
											height={TOP_H}
											fill="url(#board-topFlap)"
										/>
										<text
											{...halfTextProps}
											clip-path={`url(#${uid}-top)`}
											fill="url(#board-inkTop)"
										>
											{char}
										</text>
										<rect
											x="0"
											y="0"
											width={TILE_W}
											height={TOP_H}
											fill="#000"
											opacity="0"
										>
											<animate
												attributeName="opacity"
												values="0;0.5;0.5"
												keyTimes={`0;${frac(ambFold)};1`}
												dur={sec(ambCycle)}
												begin={sec(ambBegin)}
												repeatCount="indefinite"
												calcMode="spline"
												keySplines={`${FOLD_EASE};0 0 1 1`}
											/>
										</rect>
									</g>
								</g>
							</g>
						</g>

						<g clip-path={`url(#${uid}-bot)`} opacity="0">
							<animate
								attributeName="opacity"
								values="0;1;0;0"
								keyTimes={`0;${frac(ambFold)};${frac(ambLand)};1`}
								dur={sec(ambCycle)}
								begin={sec(ambBegin)}
								repeatCount="indefinite"
								calcMode="discrete"
							/>
							<g transform={`translate(0 ${SPLIT_Y})`}>
								<g transform="scale(1 0)">
									<animateTransform
										attributeName="transform"
										type="scale"
										values="1 0;1 0;1 1;1 1"
										keyTimes={`0;${frac(ambFold)};${frac(ambLand)};1`}
										dur={sec(ambCycle)}
										begin={sec(ambBegin)}
										repeatCount="indefinite"
										calcMode="spline"
										keySplines={`0 0 1 1;${UNFOLD_EASE};0 0 1 1`}
									/>
									<g transform={`translate(0 ${-SPLIT_Y})`}>
										<rect
											x="0"
											y={BOT_Y}
											width={TILE_W}
											height={BOT_H}
											fill="url(#board-botFlap)"
										/>
										<text
											{...halfTextProps}
											clip-path={`url(#${uid}-bot)`}
											fill="url(#board-inkBot)"
										>
											{char}
										</text>
										<rect
											x="0"
											y={BOT_Y}
											width={TILE_W}
											height={BOT_H}
											fill="#000"
											opacity="0.5"
										>
											<animate
												attributeName="opacity"
												values="0.5;0.5;0;0"
												keyTimes={`0;${frac(ambFold)};${frac(ambLand)};1`}
												dur={sec(ambCycle)}
												begin={sec(ambBegin)}
												repeatCount="indefinite"
												calcMode="spline"
												keySplines={`0 0 1 1;${UNFOLD_EASE};0 0 1 1`}
											/>
										</rect>
									</g>
								</g>
							</g>
						</g>
					</>
				)}

				<rect
					x="0"
					y={SPLIT_Y - SPLIT_GAP / 2}
					width={TILE_W}
					height={SPLIT_GAP}
					fill="#000"
				/>
				<rect
					x="0"
					y={SPLIT_Y + SPLIT_GAP / 2}
					width={TILE_W}
					height="10"
					fill="url(#board-splitGlow)"
					opacity="0.35"
				/>

				{/* Static fallback: shows the real count where SMIL is unsupported.
				    When the timeline runs it hides itself on the first frame so the
				    cascade plays; the resting layers above carry the final value. */}
				<text {...halfTextProps} clip-path={`url(#${uid}-top)`} fill="url(#board-inkTop)">
					{isDigit && <set attributeName="opacity" to="0" begin="0s" fill="freeze" />}
					{char}
				</text>
				<text {...halfTextProps} clip-path={`url(#${uid}-bot)`} fill="url(#board-inkBot)">
					{isDigit && <set attributeName="opacity" to="0" begin="0s" fill="freeze" />}
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
				const hingeY = SPLIT_Y - HINGE_H / 2
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
							y={SPLIT_Y - 0.5}
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
