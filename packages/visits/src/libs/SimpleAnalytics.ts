export enum SAField {
	PAGEVIEWS = 'pageviews',
	VISITORS = 'visitors',
	HISTOGRAM = 'histogram',
	PAGES = 'pages',
	COUNTRIES = 'countries',
	REFERRERS = 'referrers',
	UTM_SOURCES = 'utm_sources',
	UTM_MEDIUMS = 'utm_mediums',
	UTM_CAMPAIGNS = 'utm_campaigns',
	UTM_CONTENTS = 'utm_contents',
	UTM_TERMS = 'utm_terms',
	BROWSER_NAMES = 'browser_names',
	OS_NAMES = 'os_names',
	DEVICE_TYPES = 'device_types',
	SECONDS_ON_PAGE = 'seconds_on_page',
}

export interface SAJsonResponse {
	ok: boolean
	docs: string
	info: boolean
	hostname: string
	url: string
	path: string
	start: string
	end: string
	version: number
	timezone: string
	pageviews: number
	generated_in_ms: number
}
