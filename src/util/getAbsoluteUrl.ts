import type { IncomingMessage } from 'http'

export const getAbsoluteUrl = (
  req?: IncomingMessage,
  setLocalhost?: string
) => {
  let protocol = 'https:'
  let host = req
    ? req.headers['x-forwarded-host'] || req.headers['host']
    : window?.location.host

  if (!host) host = ''

  if (host?.indexOf('localhost') > -1) {
    if (setLocalhost) host = setLocalhost
    protocol = 'http:'
  }

  return {
    protocol,
    host,
    origin: protocol + '//' + host,
  }
}
