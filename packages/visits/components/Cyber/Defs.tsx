import { h, FunctionComponent } from 'preact'

export const Defs: FunctionComponent = () => {
  return (
    <defs>
      <filter
        id="a"
        color-interpolation-filters="sRGB"
        filterUnits="userSpaceOnUse"
        height="408"
        width="265"
        x="0"
        y="0"
      >
        <feFlood flood-opacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
        />
        <feOffset dy="10" />
        <feGaussianBlur stdDeviation="15" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.160784 0 0 0 0 0.164706 0 0 0 0 0.117647 0 0 0 0.49 0"
        />
        <feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
        <feBlend
          in="SourceGraphic"
          in2="effect1_dropShadow"
          mode="normal"
          result="shape"
        />
      </filter>

      <radialGradient id="gradient-dark" cx="50%" cy="50%" r="75%">
        <stop offset="0" stop-color="#373b3e" />
        <stop offset="1" stop-color="#282c30" />
      </radialGradient>

      <radialGradient id="gradient-color" cx="50%" cy="50%" r="75%">
        <stop offset="0" stop-color="#ffef67" />
        <stop offset="1" stop-color="#f0cf4a" />
      </radialGradient>

      <linearGradient
        id="s"
        gradientUnits="userSpaceOnUse"
        x1="30"
        x2="174"
        y1="20"
        y2="368"
      >
        <stop offset="0" stop-color="#fff" stop-opacity="0" />
        <stop offset=".738536" stop-opacity=".37" />
      </linearGradient>
    </defs>
  )
}
