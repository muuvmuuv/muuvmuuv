import { numberToArray } from '../../utils'
import type { ClockProperties } from '../Clock'
import { Block } from './Block'
import { Defs } from './Defs'

export const Classic = ({ pageviews }: ClockProperties) => {
	const pageviewsNumbers = numberToArray(pageviews)

	const blockOffset = 230

	const baseWidth = 268
	const baseHeight = 348

	const width = (baseWidth - 15) * pageviewsNumbers.length

	return (
		<svg
			aria-label={`This page has ${pageviews} total visits`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox={`0 0 ${width} ${baseHeight}`}
			height="50"
			fill="none"
			role="img"
		>
			<Defs />

			{pageviewsNumbers.map((number, i) => (
				<Block key={`k${blockOffset}`} index={i} offset={blockOffset}>
					{number}
				</Block>
			))}
		</svg>
	)
}
