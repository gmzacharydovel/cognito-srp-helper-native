const hexPattern = /^[0-9a-fA-F]+$/;

/**
 * Converts a hex string to a uint8 array, where each hex character is
 * 4 bits.
 * @param value - The hex string to convert.
 * @returns A uint8 array from the parsed hex string.
 */
const unit8ArrayFromHex = (value: string): Uint8Array => {
  if (value.length % 2 !== 0) {
    value = "0" + value;
  }

  // Orignal conversion code
  //  const elements = [];

  //  for (let i = 0; i < value.length; i += 2) {
  //    const byte = value.slice(i, i + 2);
  //    elements.push(parseInt(byte, 16));
  //  }

  //  let a = new Uint8Array(elements);

  const parts = [];

  // Remove invalid hex pairs before reading as hex.
  // This code is required to be comaptible with the unit tests
  // of the original function in this libray.
  for (let i = 0; i < value.length; i += 2) {
    const byte = value.slice(i, i + 2);

    if (byte.match(hexPattern)) {
      parts.push(byte);
    } else {
      parts.push("00");
    }
  }

  return Uint8Array.fromHex(parts.join(""));
};

export default unit8ArrayFromHex;
