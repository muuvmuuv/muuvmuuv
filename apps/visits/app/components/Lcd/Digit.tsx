import { DIGIT_MAP, SEGMENTS, SEG_KEYS, type SegmentKey } from './segments'

// A quick, desynced flicker per segment — like a real LCD panel snapping as
// its voltage stutters. Off segments stutter a touch brighter, on segments a
// touch darker, each on its own random cadence.
const flicker = () => {
	const dur = 2.5 + Math.random() * 3.5
	return {
		dur: `${dur.toFixed(2)}s`,
		begin: `${(Math.random() * dur).toFixed(2)}s`,
	}
}

export const Digit = ({ char, x }: { char: string; x: number }) => {
	const lit = DIGIT_MAP[char] || ''
	return (
		<g transform={`translate(${x} 0)`}>
			{SEG_KEYS.map((key) => {
				const f = flicker()
				return (
					<polygon key={`g-${key}`} points={SEGMENTS[key]} fill="#1a2a55" opacity="0.85">
						<animate
							attributeName="opacity"
							values="0.85;0.85;1;0.85;1;0.9;0.85"
							keyTimes="0;0.6;0.62;0.64;0.66;0.69;1"
							dur={f.dur}
							begin={f.begin}
							repeatCount="indefinite"
							calcMode="discrete"
						/>
					</polygon>
				)
			})}
			{lit && (
				<g filter="url(#lcd-glow)">
					{(lit.split('') as SegmentKey[]).map((key) => {
						const f = flicker()
						return (
							<polygon key={`l-${key}`} points={SEGMENTS[key]} fill="#5fc8ff">
								<animate
									attributeName="opacity"
									values="1;1;0.55;1;0.6;0.85;1"
									keyTimes="0;0.6;0.62;0.64;0.66;0.69;1"
									dur={f.dur}
									begin={f.begin}
									repeatCount="indefinite"
									calcMode="discrete"
								/>
							</polygon>
						)
					})}
				</g>
			)}
		</g>
	)
}
