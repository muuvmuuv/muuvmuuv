import { h, FunctionComponent } from "preact"

import { ClockProperties } from "../Clock"
import { numberToArray } from "../../helper/utils"
import { Block } from "./Block"
import { Defs } from "./Defs"

export const Classic: FunctionComponent<ClockProperties> = ({ pageviews }) => {
  const pageviewsNumbers = numberToArray(pageviews)

  const blockOffset = 230

  const baseWidth = 268
  const baseHeight = 348

  const width = (baseWidth - 15) * pageviewsNumbers.length

  return (
    <svg
      title="Total page visits"
      aria-label={`This page has ${pageviews} total visits`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${baseHeight}`}
      height="50"
      fill="none"
      role="img"
    >
      <Defs />
      {pageviewsNumbers.map((number, index) => (
        <Block key={index} index={index} offset={blockOffset}>
          {number}
        </Block>
      ))}
    </svg>
  )
}
