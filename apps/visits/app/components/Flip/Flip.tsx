import { numberToArray } from '../../utils'
import type { ClockProperties } from '../Clock'
import { Block } from './Block'
import { Defs } from './Defs'

/**
 * Nice looking flip clock as canvas.
 *
 * @see https://pqina.nl/flip/
 */
export const Flip = ({ height = 50, pageviews }: ClockProperties) => {
	const pageviewsNumbers = numberToArray(pageviews)

	const blockOffset = 50

	const baseWidth = 540
	const baseHeight = 680

	const width = (baseWidth + blockOffset) * pageviewsNumbers.length - blockOffset

	return (
		<svg
			aria-label={`This page has ${pageviews} total visits`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox={`0 0 ${width} ${baseHeight}`}
			height={height}
			fill="none"
			role="img"
		>
			<Defs />
			<g>
				{pageviewsNumbers.map((number, i) => (
					<Block
						key={`k${blockOffset}`}
						index={i}
						offset={baseWidth + blockOffset}
						number={number}
					/>
				))}
			</g>
		</svg>
	)
}
