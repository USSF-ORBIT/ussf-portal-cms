import type { NextApiRequest, NextApiResponse } from 'next'

const __BUILD_ID__ = process.env.IMAGE_TAG
const __NODE_ENV__ = process.env.NODE_ENV
const __VERSION__ = process.env.npm_package_version

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  res.status(200).json({
    version: __VERSION__,
    buildId: __BUILD_ID__,
    nodeEnv: __NODE_ENV__,
    portalUrl: process.env.PORTAL_URL,
  })
}
