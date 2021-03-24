import { h, FunctionComponent } from "preact"

export const Block: FunctionComponent<{
  index: number
  offset?: number
}> = ({ children, index, offset = 0 }) => {
  return (
    <g transform={`translate(${offset * index} 0)`}>
      <g filter="url(#shadow)">
        <rect x="34" y="14" width="200" height="280" rx="27" fill="#F8F8F8" />
      </g>
      <path
        d="M34 41C34 26.0883 46.0883 14 61 14H207C221.912 14 234 26.0883 234 41V155H34V41Z"
        fill="url(#gradient)"
      />
      <line x1="34" y1="154.5" x2="234" y2="154.5" stroke="#DDDDDD" />
      <text
        fill="#263AEE"
        xmlSpace="preserve"
        font-family="Inter"
        font-size="200"
        letter-spacing="0em"
        text-anchor="middle"
        dominant-baseline="middle"
        alignment-baseline="central"
        x={130}
        y={150}
      >
        {children}
      </text>
    </g>
  )
}
