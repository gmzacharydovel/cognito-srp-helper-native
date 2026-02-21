/**
 * Convert a Uint8Array to base64.
 * @param value The Uint8Array to convert.
 * @returns The base64 string representation of the Uint8Array.
 */
const base64FromUint8Array = (value: Uint8Array): string => {
  return value.toBase64();
  //const buffer: string[] = [];
  //buffer.length = value.length;

  //for (let i = 0; i < value.length; i++) {
  //  buffer.push(String.fromCharCode(value[i]));
  //}
  //return btoa(buffer.join(""));
};

export default base64FromUint8Array;
