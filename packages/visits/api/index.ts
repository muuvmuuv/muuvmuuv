import { NowRequest, NowResponse } from '@vercel/node'
import render from 'preact-render-to-string'
import { createHash } from 'crypto'

import { getDatabase } from '../db'
import ClassicTheme from '../components/Classic'
import CyberTheme from '../components/Cyber'

const db = getDatabase()

const ref = db.ref('visitors')

interface Visitor {
  visits: number
  last_visit: Date
}

const themes = {
  classic: ClassicTheme,
  cyber: CyberTheme,
}

async function updateVisitor(req: NowRequest) {
  // const ip = req.headers['x-real-ip']
  const userAgent = req.headers['user-agent']
  const hashString = `${userAgent}`

  let user = 'undefined'

  if (userAgent) {
    user = createHash('sha1').update(hashString).digest('hex')
  }

  const visitsSnapshot = await ref.child(`${user}/visits`).once('value')
  const visits = visitsSnapshot.val()

  await ref.update({
    [`${user}`]: <Visitor>{
      visits: visits ? Number(visits) + 1 : 1,
      last_visit: new Date(),
    },
  })
}

export default async (req: NowRequest, res: NowResponse) => {
  const debug = 'debug' in req.query

  res.setHeader('Content-Type', 'image/svg+xml')
  res.setHeader('Cache-Control', 'public, max-age=0, stale-while-revalidate')

  let theme = (req.query.theme as string) || 'classic'

  if (!Object.keys(themes).includes(theme)) {
    theme = 'classic'
  }

  let totalVisits = 0
  let numVisitors = 0

  if (debug) {
    totalVisits = 12345
    numVisitors = 67890
  } else {
    await updateVisitor(req)

    const snapshot = await ref.once('value')
    const visitors = snapshot.val() as Visitor[]
    numVisitors = snapshot.numChildren()

    totalVisits = 0
    Object.values(visitors).forEach((visitor) => {
      totalVisits += visitor.visits
    })
  }

  const html = render(themes[theme]({ totalVisits, numVisitors }))

  return res.status(200).send(html)
}
