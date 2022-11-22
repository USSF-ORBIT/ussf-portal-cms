export const isProduction = (): boolean => {
  return process.env.NODE_ENV === 'production' && process.env.IS_PROD === 'true'
}
