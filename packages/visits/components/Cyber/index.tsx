import { h, FunctionComponent } from 'preact'

import { CounterProps } from '../interface'
import { numberToArray } from '../utils'
import { Block } from './Block'
import { Divider } from './Divider'
import { Defs } from './Defs'

const Counter: FunctionComponent<CounterProps> = ({ totalVisits, numVisitors }) => {
  const totalVisitsNumbers = numberToArray(totalVisits)
  const numVisitorsNumbers = numberToArray(numVisitors)

  const blockOffset = 230

  const baseWidth = 265
  const baseHeight = 408

  const items = totalVisitsNumbers.length + numVisitorsNumbers.length + 1
  const width = (baseWidth - 30) * items

  let index = -1

  return (
    <svg
      title="Left shows total visits and right shows unique visitors"
      aria-label={`This page has ${totalVisits} total visits and ${numVisitors} unique visitors`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox={`0 0 ${width} ${baseHeight}`}
      height="40"
      fill="none"
      role="img"
    >
      <Defs />
      {totalVisitsNumbers.map((number) => {
        ++index
        return (
          <Block key={index} index={index} offset={blockOffset}>
            {number}
          </Block>
        )
      })}
      {++index}
      <Divider key={index} index={index} offset={blockOffset} />
      {numVisitorsNumbers.map((number) => {
        ++index
        return (
          <Block key={index} index={index} offset={blockOffset}>
            {number}
          </Block>
        )
      })}
    </svg>
  )
}

export default Counter
