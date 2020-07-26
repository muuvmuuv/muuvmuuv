import { NowRequest, NowResponse } from '@vercel/node'
import render from 'preact-render-to-string'
import http from 'got'

import ClassicTheme from '../components/Classic'
import CyberTheme from '../components/Cyber'

const themes = {
  classic: ClassicTheme,
  cyber: CyberTheme,
}

// https://docs.simpleanalytics.com/server-side-tracking

function sendImageView(request: NowRequest) {
  return http.post('https://queue.simpleanalyticscdn.com/post', {
    json: {
      url: 'https://visits.github.marvin.digital/',
      ua: request.headers['user-agent'],
      // unique: true,
    },
  })
}

interface ApiResponseData {
  pageviews: number
}

async function getAnalytics(): Promise<ApiResponseData> {
  const response = await http.get<ApiResponseData>(
    'https://simpleanalytics.com/visits.github.marvin.digital.json',
    {
      responseType: 'json',
    }
  )
  return response.body
}

export default async (request: NowRequest, response: NowResponse) => {
  const debug = 'debug' in request.query

  response.setHeader('Content-Type', 'image/svg+xml')
  response.setHeader('Cache-Control', 'public, max-age=0, stale-while-revalidate')

  let theme = (request.query.theme as string) || 'classic'

  if (!Object.keys(themes).includes(theme)) {
    theme = 'classic'
  }

  let pageviews = 0

  if (debug) {
    pageviews = 1234567890
  } else {
    await sendImageView(request)

    const analytics = await getAnalytics()
    pageviews = analytics.pageviews
  }

  const html = render(themes[theme]({ pageviews }))

  return response.status(200).send(html)
}
