import { ONE } from "@/constants";
import absBigInt from "@/utils/bigint/abs";
import bigIntFromHex from "@/utils/bigint/from-hex";

/**
 * Returns an unambiguous, even-length hex string of the two's complement
 * encoding of an integer.
 *
 * It is compatible with the hex encoding of Java's BigInteger's toByteArray(),
 * which returns a byte array containing the two's-complement representation of
 * a BigInteger. The array contains the minimum number of bytes required to
 * represent the BigInteger, including at least one sign bit.
 *
 * Examples showing how ambiguity is avoided by left padding with:
 * 	"00" (for positive values where the most-significant-bit is set)
 *  "FF" (for negative values where the most-significant-bit is set)
 *
 * bigIntToPaddedHex(bigInteger.fromInt(-236))  === "FF14"
 * bigIntToPaddedHex(bigInteger.fromInt(20))    === "14"
 *
 * bigIntToPaddedHex(bigInteger.fromInt(-200))  === "FF38"
 * bigIntToPaddedHex(bigInteger.fromInt(56))    === "38"
 *
 * bigIntToPaddedHex(bigInteger.fromInt(-20))   === "EC"
 * bigIntToPaddedHex(bigInteger.fromInt(236))   === "00EC"
 *
 * bigIntToPaddedHex(bigInteger.fromInt(-56))   === "C8"
 * bigIntToPaddedHex(bigInteger.fromInt(200))   === "00C8"
 *
 * @param value Number to encode.
 * @returns Even-length hex string of the two's complement encoding.
 */
export const hexFromBigInt = (value: bigint, normalize: boolean): string => {
  if (typeof value !== "bigint") {
    throw new Error("Not a BigInteger");
  }

  if (!normalize) {
    return value.toString(16);
  }

  const isNegative = value < 0n;

  // Get a hex string for abs(value)
  let hexStr = absBigInt(value).toString(16);

  // Pad hex to even length if needed
  hexStr = hexStr.length % 2 !== 0 ? `0${hexStr}` : hexStr;

  // Prepend "00" if the most significant bit is set
  const HEX_MSB_REGEX = /^[89a-f]/i;
  hexStr = HEX_MSB_REGEX.test(hexStr) ? `00${hexStr}` : hexStr;

  if (isNegative) {
    // Flip the bits of the representation
    const invertedNibbles = hexStr
      .split("")
      .map((x: string) => {
        const invertedNibble = ~parseInt(x, 16) & 0xf;
        return "0123456789ABCDEF".charAt(invertedNibble);
      })
      .join("");

    // After flipping the bits, add one to get the 2's complement representation
    const flippedBitsBI = bigIntFromHex(invertedNibbles) + ONE;

    hexStr = flippedBitsBI.toString(16);

    /*
      For hex strings starting with 'FF8', 'FF' can be dropped, e.g.
      0xFFFF80=0xFF80=0x80=-128

      Any sequence of '1' bits on the left can always be substituted with a
      single '1' bit without changing the represented value.

      This only happens in the case when the input is 80...00
    */
    if (hexStr.toUpperCase().startsWith("FF8")) {
      hexStr = hexStr.substring(2);
    }
  }

  return hexStr;
};

export default hexFromBigInt;
