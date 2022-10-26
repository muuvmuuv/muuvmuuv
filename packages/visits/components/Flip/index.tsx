import { h, FunctionComponent } from "preact"

import { ClockProperties } from "../Clock"
import { numberToArray } from "../../helper/utils"
import { Block } from "./Block"
import { Defs } from "./Defs"

/**
 * Nice looking flip clock as canvas.
 *
 * @see https://pqina.nl/flip/
 */
export const Flip: FunctionComponent<ClockProperties> = ({ height = 50, pageviews }) => {
  const pageviewsNumbers = numberToArray(pageviews)

  const blockOffset = 50

  const baseWidth = 540
  const baseHeight = 680

  const width = (baseWidth + blockOffset) * pageviewsNumbers.length - blockOffset

  return (
    <svg
      title="Total page visits"
      aria-label={`This page has ${pageviews} total visits`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${baseHeight}`}
      height={height}
      fill="none"
      role="img"
    >
      <Defs />
      <g>
        {pageviewsNumbers.map((number, index) => (
          <Block
            key={index}
            index={index}
            offset={baseWidth + blockOffset}
            number={number}
          />
        ))}
      </g>
    </svg>
  )
}
