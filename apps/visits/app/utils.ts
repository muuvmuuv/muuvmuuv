export const numberToArray = (number: string | number) => [...`${number}`].map(Number)

/**
 * Normalize a hex color coming from a URL param. Accepts "f5c724", "#f5c724"
 * and the 3-digit shorthand. Anything else returns undefined, so unvalidated
 * input never ends up inside the SVG markup.
 */
export const parseHexColor = (value: string | undefined): string | undefined => {
	if (!value) return undefined
	const hex = value.replace(/^#/, '').toLowerCase()
	if (!/^(?:[0-9a-f]{3}|[0-9a-f]{6})$/.test(hex)) return undefined
	return `#${hex.length === 3 ? [...hex].map((c) => c + c).join('') : hex}`
}

const mixHex = (hex: string, target: number, amount: number): string => {
	const channels = [1, 3, 5].map((i) => Number.parseInt(hex.slice(i, i + 2), 16))
	const mixed = channels.map((c) =>
		Math.round(c + (target - c) * amount)
			.toString(16)
			.padStart(2, '0'),
	)
	return `#${mixed.join('')}`
}

/** Mix a 6-digit hex color towards white. Amount is 0..1. */
export const lighten = (hex: string, amount: number): string => mixHex(hex, 255, amount)

/** Mix a 6-digit hex color towards black. Amount is 0..1. */
export const darken = (hex: string, amount: number): string => mixHex(hex, 0, amount)
