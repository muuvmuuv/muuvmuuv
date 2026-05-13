export const Defs = () => (
	<defs>
		<linearGradient id="lcd-chrome" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#cfd2d6" />
			<stop offset="0.18" stop-color="#f4f6f8" />
			<stop offset="0.34" stop-color="#a9adb3" />
			<stop offset="0.5" stop-color="#5a5d62" />
			<stop offset="0.66" stop-color="#2a2c30" />
			<stop offset="0.82" stop-color="#5b5e63" />
			<stop offset="0.95" stop-color="#9da1a6" />
			<stop offset="1" stop-color="#6a6d72" />
		</linearGradient>
		<linearGradient id="lcd-chrome-inner-rim" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#0a0a0c" />
			<stop offset="0.5" stop-color="#1c1d20" />
			<stop offset="1" stop-color="#0a0a0c" />
		</linearGradient>
		<radialGradient id="lcd-screen" cx="0.5" cy="0.5" r="0.7">
			<stop offset="0" stop-color="#0a0f1e" />
			<stop offset="0.65" stop-color="#05080f" />
			<stop offset="1" stop-color="#020308" />
		</radialGradient>
		<linearGradient id="lcd-sheen" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#1d2e55" stop-opacity="0.35" />
			<stop offset="0.4" stop-color="#1d2e55" stop-opacity="0" />
			<stop offset="1" stop-color="#000" stop-opacity="0" />
		</linearGradient>
		<filter id="lcd-glow" x="-50%" y="-50%" width="200%" height="200%">
			<feGaussianBlur in="SourceGraphic" stdDeviation="2.5" result="b1" />
			<feGaussianBlur in="SourceGraphic" stdDeviation="6" result="b2" />
			<feMerge>
				<feMergeNode in="b2" />
				<feMergeNode in="b1" />
				<feMergeNode in="SourceGraphic" />
			</feMerge>
		</filter>
	</defs>
)
