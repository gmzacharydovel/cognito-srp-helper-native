/**
 * Create a Unit8Array from a base64 string.
 * @param value The base64 string to convert to a Uint8Array.
 * @returns A Uint8Array parsed from the base64 string.
 */
function uint8ArrayFromBase64(value: string): Uint8Array {
  // NOTE: Migrate this implementation to use Uint8Array.fromBase64 when
  // updating to TypeScript 6.
  const binaryString = atob(value);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }

  return bytes;
}

export default uint8ArrayFromBase64;
