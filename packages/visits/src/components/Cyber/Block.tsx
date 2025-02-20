import type { FunctionComponent } from 'preact'

type Coords = Record<
	string,
	{
		x: number
		y: number
	}
>

const coords: Coords = {
	'15': {
		x: 168,
		y: 300,
	},
	'14': {
		x: 99,
		y: 300,
	},
	'13': {
		x: 30,
		y: 300,
	},
	'12': {
		x: 168,
		y: 230,
	},
	'11': {
		x: 99,
		y: 230,
	},
	'10': {
		x: 30,
		y: 230,
	},
	'9': {
		x: 168,
		y: 160,
	},
	'8': {
		x: 99,
		y: 160,
	},
	'7': {
		x: 30,
		y: 160,
	},
	'6': {
		x: 168,
		y: 90,
	},
	'5': {
		x: 99,
		y: 90,
	},
	'4': {
		x: 30,
		y: 90,
	},
	'3': {
		x: 168,
		y: 20,
	},
	'2': {
		x: 99,
		y: 20,
	},
	'1': {
		x: 30,
		y: 20,
	},
}

// 0 = dark; 1 = color
const numbers: Record<number, number[]> = {
	0: [0, 0, 0, 0, 1, 0, 0, 1, 0, 0, 1, 0, 0, 0, 0],
	1: [1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1],
	2: [0, 0, 0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0, 0, 0],
	3: [0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 1, 0, 0, 0, 0],
	4: [0, 1, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0],
	5: [0, 0, 0, 0, 1, 1, 0, 0, 0, 1, 1, 0, 0, 0, 0],
	6: [0, 0, 0, 0, 1, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0],
	7: [0, 0, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 0],
	8: [0, 0, 0, 0, 1, 0, 0, 0, 0, 0, 1, 0, 0, 0, 0],
	9: [0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 1, 0, 1, 1, 0],
}

export const Block: FunctionComponent<{
	arrayIndex: number
	blockNumber: number
	offset?: number
}> = ({ blockNumber, arrayIndex, offset = 0 }) => {
	const matrix = numbers[blockNumber]

	return (
		<g transform={`translate(${offset * arrayIndex} 0)`}>
			<g filter="url(#a)">
				<path d="m30 20h205v348h-205z" fill="#fff" fill-opacity=".01" />
			</g>

			{matrix.map((t, i) => {
				const { x, y } = coords[i + 1]
				const theme = t ? 'gradient-color' : 'gradient-dark'
				return (
					<rect
						key={`r${i}${1}`}
						fill={`url(#${theme})`}
						height="68"
						width="67"
						x={x}
						y={y}
						rx="2"
					/>
				)
			})}

			<path d="m30 20h205v348h-205z" fill="url(#s)" />
		</g>
	)
}
