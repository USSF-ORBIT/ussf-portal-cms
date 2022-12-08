export const isProduction = (): boolean => {
  return process.env.USE_S3_STORAGE === 'true'
}
