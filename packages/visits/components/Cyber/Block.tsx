import { h, FunctionComponent } from "preact"

import * as coords from "./coords.json"

// 0 = dark; 1 = color
const numbers = {
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
  index: number
  offset?: number
}> = ({ children, index, offset = 0 }) => {
  const matrix = numbers[children.toString()]

  return (
    <g transform={`translate(${offset * index} 0)`}>
      <g filter="url(#a)">
        <path d="m30 20h205v348h-205z" fill="#fff" fill-opacity=".01" />
      </g>

      {matrix.map((t: boolean, i: number) => {
        const { x, y } = coords[i + 1]
        const theme = t ? "gradient-color" : "gradient-dark"
        return <rect fill={`url(#${theme})`} height="68" width="67" x={x} y={y} rx="2" />
      })}

      <path d="m30 20h205v348h-205z" fill="url(#s)" />
    </g>
  )
}
