export interface ClockProperties {
	pageviews: number
	/**
	 * Theme options taken straight from the URL search params. Each theme
	 * defines which keys it understands and ignores the rest.
	 */
	options?: Record<string, string>
}
