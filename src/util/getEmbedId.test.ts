import { getYouTubeEmbedId } from './getEmbedId'

describe('getYouTubeEmbedId', () => {
  it('returns embed ID from url string', () => {
    // Randomly generated alpha-num id
    const testId = 'EdmbibomN4y'
    const urls = [
      `https://www.youtube.com/watch?v=${testId}`,
      `https://youtu.be/${testId}`,
      `https://youtu.be/${testId}?t=10`,
      `${testId}`,
    ]
    urls.map((url) => {
      expect(getYouTubeEmbedId(url)).toBe(testId)
    })
  })
})
