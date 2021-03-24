import { VercelRequest, VercelResponse } from "@vercel/node"
import render from "preact-render-to-string"
import http from "got"

import { SAJsonResponse, SAField } from "./SimpleAnalytics"

import { Flip } from "../components/Flip"
import { Classic } from "../components/Classic"
import { Cyber } from "../components/Cyber"

const themes = {
  classic: Classic,
  flip: Flip,
  cyber: Cyber,
}

/**
 * Send view to SimpleAnalytics.
 *
 * @see https://docs.simpleanalytics.com/server-side-tracking
 */
function sendView(request: VercelRequest) {
  return http.post("https://queue.simpleanalyticscdn.com/post", {
    json: {
      url: "https://visits.github.marvin.digital/",
      ua: request.headers["user-agent"],
      referrer: request.headers["referer"] || "direct",
    },
  })
}

/**
 * Get current analytics stats from SimpleAnalytics.
 *
 * @see https://docs.simpleanalytics.com/api/stats#query-parameters
 */
async function getAnalytics(): Promise<SAJsonResponse> {
  const fields = [SAField.PAGEVIEWS]
  const baseUri = "https://simpleanalytics.com/visits.github.marvin.digital.json"
  const response = await http.get<SAJsonResponse>(
    baseUri + "?version=5&info=false&fields=" + fields.join(","),
    {
      responseType: "json",
    }
  )
  return response.body
}

/**
 * Render and return SVG counter.
 */
export default async (request: VercelRequest, response: VercelResponse) => {
  const debug = "debug" in request.query

  let theme = "flip"
  if ("theme" in request.query) {
    theme = String(request.query.theme)
  }

  response.setHeader("Content-Type", "image/svg+xml")
  response.setHeader("Cache-Control", "public, max-age=0, stale-while-revalidate")

  let pageviews = 1234567890

  if (!debug) {
    await sendView(request)

    const analytics = await getAnalytics()
    pageviews = analytics.pageviews
  }

  const html = render(themes[theme]({ pageviews }))

  return response.status(200).send(html)
}
