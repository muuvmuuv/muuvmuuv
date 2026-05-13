export const DIGIT_W = 80
export const DIGIT_H = 160
export const SEG_T = 12
export const SEG_GAP = 2
export const DIGIT_SPACING = 18
export const DIGIT_SCALE = 1.825
export const SLANT = -8
export const INNER_PAD_X = 60

export const BEZEL_H = 480
export const BEZEL_R = 90
export const BEZEL_INSET = 28
export const SCREEN_R = 60
export const BEZEL_MIN_W = 1100

const W = DIGIT_W
const H = DIGIT_H
const t = SEG_T
const gp = SEG_GAP

const hpts = (yTop: number) =>
	`${gp},${yTop + t / 2} ${gp + t / 2},${yTop} ${W - gp - t / 2},${yTop} ${W - gp},${yTop + t / 2} ${W - gp - t / 2},${yTop + t} ${gp + t / 2},${yTop + t}`

const vpts = (xLeft: number, yStart: number, yEnd: number) =>
	`${xLeft + t / 2},${yStart + gp} ${xLeft + t},${yStart + gp + t / 2} ${xLeft + t},${yEnd - gp - t / 2} ${xLeft + t / 2},${yEnd - gp} ${xLeft},${yEnd - gp - t / 2} ${xLeft},${yStart + gp + t / 2}`

export const SEGMENTS = {
	a: hpts(0),
	g: hpts(H / 2 - t / 2),
	d: hpts(H - t),
	f: vpts(0, 0, H / 2),
	b: vpts(W - t, 0, H / 2),
	e: vpts(0, H / 2, H),
	c: vpts(W - t, H / 2, H),
} as const

export type SegmentKey = keyof typeof SEGMENTS

export const DIGIT_MAP: Record<string, string> = {
	'0': 'abcdef',
	'1': 'bc',
	'2': 'abdeg',
	'3': 'abcdg',
	'4': 'bcfg',
	'5': 'acdfg',
	'6': 'acdefg',
	'7': 'abc',
	'8': 'abcdefg',
	'9': 'abcdfg',
	E: 'adefg',
}

export const SEG_KEYS: SegmentKey[] = ['a', 'b', 'c', 'd', 'e', 'f', 'g']
