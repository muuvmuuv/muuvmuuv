export const Defs = () => (
	<defs>
		<filter
			id="shadow"
			color-interpolation-filters="sRGB"
			filterUnits="userSpaceOnUse"
			height="310"
			width="230"
			x="19"
			y="9"
		>
			<feFlood flood-opacity="0" result="BackgroundImageFix" />
			<feColorMatrix
				in="SourceAlpha"
				type="matrix"
				values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
			/>
			<feMorphology
				in="SourceAlpha"
				operator="erode"
				radius="5"
				result="effect1_dropShadow"
			/>
			<feOffset dy="10" />
			<feGaussianBlur stdDeviation="10" />
			<feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.2 0" />
			<feBlend in2="BackgroundImageFix" mode="normal" result="effect1_dropShadow" />
			<feBlend in="SourceGraphic" in2="effect1_dropShadow" mode="normal" result="shape" />
		</filter>

		<linearGradient
			id="gradient"
			gradientUnits="userSpaceOnUse"
			x1="134"
			x2="134"
			y1="14"
			y2="155"
		>
			<stop offset="0" stop-color="#f2f2f2" />
			<stop offset="1" stop-color="#c4c4c4" stop-opacity="0" />
		</linearGradient>
	</defs>
)
