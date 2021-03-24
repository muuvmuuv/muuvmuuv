import { h, FunctionComponent } from "preact"

import { Zero } from "./numbers/0"
import { One } from "./numbers/1"
import { Two } from "./numbers/2"
import { Three } from "./numbers/3"
import { Four } from "./numbers/4"
import { Five } from "./numbers/5"
import { Six } from "./numbers/6"
import { Seven } from "./numbers/7"
import { Eight } from "./numbers/8"
import { Nine } from "./numbers/9"

const blocks = [
  <Zero />,
  <One />,
  <Two />,
  <Three />,
  <Four />,
  <Five />,
  <Six />,
  <Seven />,
  <Eight />,
  <Nine />,
]

export const Block: FunctionComponent<{
  index: number
  offset: number
  number: number
}> = ({ index, offset, number }) => (
  <g transform={`translate(${offset * index} 0)`}>
    <path
      fill="#333232"
      d="M0 60C0 26.8629 26.8629 0 60 0H480C513.137 0 540 26.8629 540 60V620C540 653.137 513.137 680 480 680H60C26.8629 680 0 653.137 0 620V60Z"
    />
    {number > 9 ? (
      <text fill="#FFFFFF" xmlSpace="preserve" font-family="monospace" font-size="580">
        <tspan x="90.1172" y="556">
          E
        </tspan>
      </text>
    ) : (
      blocks[number]
    )}
    <path
      d="M0 620C0 653.137 26.8629 680 60 680H480C513.137 680 540 653.137 540 620V340H0V620Z"
      fill="url(#dh9302gh99us93x0j)"
    />
  </g>
)
