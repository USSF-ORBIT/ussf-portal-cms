export const isProduction = (): boolean => {
  return (
    process.env.NODE_ENV === 'production' &&
    process.env.USE_S3_STORAGE === 'true'
  )
}
