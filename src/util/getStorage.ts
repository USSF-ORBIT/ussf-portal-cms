export const isLocalStorage = (): boolean => {
  return process.env.S3_BUCKET_NAME === 'test_bucket'
}
