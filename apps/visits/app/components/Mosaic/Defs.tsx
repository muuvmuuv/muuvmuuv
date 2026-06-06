import { darken, lighten } from '../../utils'

export interface MosaicPalette {
	/** Lit cell gradient, top to bottom. */
	onTop: string
	onMid: string
	onBottom: string
	/** Specular strip across the top edge of a lit cell. */
	highlight: string
}

/** Default amber, matching the Claude Design reference. */
export const AMBER: MosaicPalette = {
	onTop: '#ffe566',
	onMid: '#f5c724',
	onBottom: '#c79a14',
	highlight: '#fff3a8',
}

/** Rebuild the lit-cell ramp around a custom base color. */
export const paletteFrom = (base: string): MosaicPalette => ({
	onTop: lighten(base, 0.35),
	onMid: base,
	onBottom: darken(base, 0.2),
	highlight: lighten(base, 0.62),
})

export const Defs = ({ palette }: { palette: MosaicPalette }) => (
	<defs>
		<linearGradient id="mosaic-panel" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#1a1b1d" />
			<stop offset="0.5" stop-color="#0e0f11" />
			<stop offset="1" stop-color="#070708" />
		</linearGradient>
		<linearGradient id="mosaic-bezel" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#2a2c30" />
			<stop offset="1" stop-color="#101113" />
		</linearGradient>
		<linearGradient id="mosaic-cell-off" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color="#222428" />
			<stop offset="1" stop-color="#15171a" />
		</linearGradient>
		<linearGradient id="mosaic-cell-on" x1="0" y1="0" x2="0" y2="1">
			<stop offset="0" stop-color={palette.onTop} />
			<stop offset="0.5" stop-color={palette.onMid} />
			<stop offset="1" stop-color={palette.onBottom} />
		</linearGradient>
	</defs>
)
