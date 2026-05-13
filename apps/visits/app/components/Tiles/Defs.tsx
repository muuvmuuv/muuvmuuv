export const Defs = () => (
	<defs>
		<linearGradient id="tile-face" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#ffffff" />
			<stop offset="1" stop-color="#f3f5fa" />
		</linearGradient>
		<clipPath id="tile-clip">
			<rect x="0" y="0" width="88" height="112" rx="18" ry="18" />
		</clipPath>
		<filter id="tile-shadow" x="-10%" y="-10%" width="120%" height="125%">
			<feGaussianBlur in="SourceAlpha" stdDeviation="2.5" result="b1" />
			<feOffset in="b1" dx="0" dy="2" result="o1" />
			<feFlood flood-color="#141e3c" flood-opacity="0.12" result="f1" />
			<feComposite in="f1" in2="o1" operator="in" result="s1" />
			<feGaussianBlur in="SourceAlpha" stdDeviation="6" result="b2" />
			<feOffset in="b2" dx="0" dy="5" result="o2" />
			<feFlood flood-color="#6788eb" flood-opacity="0.08" result="f2" />
			<feComposite in="f2" in2="o2" operator="in" result="s2" />
			<feMerge>
				<feMergeNode in="s2" />
				<feMergeNode in="s1" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>
)
