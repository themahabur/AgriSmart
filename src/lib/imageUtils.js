export function isValidImageUrl(url) {
  return /\.(jpeg|jpg|gif|png|webp|svg)$/.test(url);
}