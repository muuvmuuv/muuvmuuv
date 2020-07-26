import { h, FunctionComponent } from 'preact'

import { CounterProps } from '../interface'
import { numberToArray } from '../utils'
import { Block } from './Block'
import { Defs } from './Defs'

const Counter: FunctionComponent<CounterProps> = ({ totalVisits, numVisitors }) => {
  const totalVisitsNumbers = numberToArray(totalVisits)

  const blockOffset = 230

  const baseWidth = 268
  const baseHeight = 348

  const width = (baseWidth - 15) * totalVisitsNumbers.length

  return (
    <svg
      title="Left shows total visits and right shows unique visitors"
      aria-label={`This page has ${totalVisits} total visits and ${numVisitors} unique visitors`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${baseHeight}`}
      height="50"
      fill="none"
      role="img"
    >
      <Defs />
      {totalVisitsNumbers.map((number, index) => (
        <Block key={index} index={index} offset={blockOffset}>
          {number}
        </Block>
      ))}
    </svg>
  )
}

export default Counter
