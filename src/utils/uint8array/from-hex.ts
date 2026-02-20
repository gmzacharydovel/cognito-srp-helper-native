/**
 * Converts a hex string to a uint8 array, where each hex character is
 * 4 bits.
 * @param value - The hex string to convert.
 * @returns A uint8 array from the parsed hex string.
 */
const unit8ArrayFromHex = (value: string): Uint8Array => {
  // NOTE: Migrate this implementation to use Uint8Array.fromHex when
  // updating to TypeScript 6.
  const elements = [];

  for (let i = 0; i < value.length; i += 2) {
    const byte = value.slice(i, i + 2);
    elements.push(parseInt(byte, 16));
  }

  return new Uint8Array(elements);
};

export default unit8ArrayFromHex;
