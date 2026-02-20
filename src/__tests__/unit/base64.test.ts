import { base64FromUint8Array, generateRandomBase64 } from "@/utils/base64";

describe("bigint", () => {
  describe("base64FromUint8Array", () => {
    it("makes no change to a positive number", async () => {
      expect(base64FromUint8Array(new Uint8Array(["0".charCodeAt(0)]))).toEqual(btoa("0"));
    });
  });

  describe("generateRandomBase64", () => {
    beforeEach(() => {
      jest.spyOn(globalThis.crypto, "getRandomValues").mockImplementation((array: ArrayBufferView | null) => {
        if (array) {
          return new TextEncoder().encode(array.buffer.byteLength.toString());
        }
        return null;
      });
    });

    it("returns the size of the requested array", async () => {
      expect(generateRandomBase64(3)).toBe(btoa("3"));
    });
  });
});
