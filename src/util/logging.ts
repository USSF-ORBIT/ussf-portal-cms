import { logging } from '@k6-contrib/list-plugins'

export const withLogging = logging((args) => console.log(args))
