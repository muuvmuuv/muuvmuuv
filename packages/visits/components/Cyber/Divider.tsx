import { h, FunctionComponent } from 'preact'

import { BlockProps } from '../interface'

export const Divider: FunctionComponent<BlockProps> = ({ index, offset = 0 }) => {
  return (
    <g transform={`translate(${offset * index} 0)`}>
      <rect fill={`url(#gradient-dark)`} height="68" width="67" x="99" y="90" rx="2" />
      <rect fill={`url(#gradient-dark)`} height="68" width="67" x="99" y="230" rx="2" />
    </g>
  )
}
