import { DIGIT_MAP, SEGMENTS, SEG_KEYS, type SegmentKey } from './segments'

export const Digit = ({ char, x }: { char: string; x: number }) => {
	const lit = DIGIT_MAP[char] || ''
	return (
		<g transform={`translate(${x} 0)`}>
			{SEG_KEYS.map((key) => (
				<polygon key={`g-${key}`} points={SEGMENTS[key]} fill="#1a2a55" opacity="0.85" />
			))}
			{lit && (
				<g filter="url(#lcd-glow)">
					{(lit.split('') as SegmentKey[]).map((key) => (
						<polygon key={`l-${key}`} points={SEGMENTS[key]} fill="#5fc8ff" />
					))}
				</g>
			)}
		</g>
	)
}
