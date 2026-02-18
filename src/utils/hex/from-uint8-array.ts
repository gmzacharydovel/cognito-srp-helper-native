/**
 * Converts a Uint8Array to a hexadecimal string where each byte represents
 * two hexidecimal digits.
 * @param value - The Uint8Array to convert.
 * @returns The hexadecimal string representation of the Uint8Array.
 */
const hexFromUint8Array = (value: Uint8Array): string => {
  const buffer: string[] = [];

  buffer.length = value.length;

  for (let i = 0; i < value.length; i++) {
    buffer.push(value[i].toString(16).padStart(2, "0"));
  }

  return buffer.join("");
};

export default hexFromUint8Array;
