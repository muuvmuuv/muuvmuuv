import { type FunctionComponent, h } from 'preact'

import { numberToArray } from '../../helper/utils'
import type { ClockProperties } from '../Clock'
import { Block } from './Block'
import { Defs } from './Defs'

export const Cyber: FunctionComponent<ClockProperties> = ({ pageviews }) => {
	const pageviewsNumbers = numberToArray(pageviews)

	const blockOffset = 230

	const baseWidth = 265
	const baseHeight = 408

	const width = (baseWidth - 30) * pageviewsNumbers.length

	return (
		<svg
			title="Total page visits"
			aria-label={`This page has ${pageviewsNumbers} total visits`}
			xmlns="http://www.w3.org/2000/svg"
			viewBox={`0 0 ${width} ${baseHeight}`}
			height="40"
			fill="none"
			role="img"
		>
			<Defs />
			{pageviewsNumbers.map((number, i) => (
				<Block
					key={`k${blockOffset}`}
					arrayIndex={i}
					blockNumber={number}
					offset={blockOffset}
				/>
			))}
		</svg>
	)
}
