import type { NextApiRequest, NextApiResponse } from 'next'

const __BUILD_ID__ = process.env.BUILD_ID
const __NODE_ENV__ = process.env.NODE_ENV
const __VERSION__ = process.env.VERSION

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    version: __VERSION__,
    buildId: __BUILD_ID__,
    nodeEnv: __NODE_ENV__,
    portalUrl: process.env.PORTAL_URL,
  })
}
