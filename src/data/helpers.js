/**
 * @method to format an image for img tag
 * @param image
 */
export function formatImageUrl(image) {
  return new URL(`../assets/${image}`, import.meta.url).href
}
