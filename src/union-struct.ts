/**
 * Simple structure that holds bitfiels
 *
 * @export
 * @class UnionStruct
 */
export default class UnionStruct {
  constructor(
    public number: number = 0x0,
  ) {}

  toString(radix?: number): string {
    return this.number.toString(radix);
  }

  /**
   * Marks class property as bit field
   *
   * @static
   * @param {number} lowBitNth Least significant bit of field
   * @param {number} [highBitNth=lowBitNth] Most significant bit of field
   * @returns
   * @memberof UnionStruct
   */
  static bits(lowBitNth: number, highBitNth: number = lowBitNth) {
    const mask = (1 << (highBitNth - lowBitNth + 1)) - 1;
    const shiftedNegatedMask = ~(mask << lowBitNth);

    return function decorator(target: UnionStruct, propertyKey: string) {
      Object.defineProperty(
        target,
        propertyKey,
        {
          set(value: number) {
            this.number = (this.number & shiftedNegatedMask) | ((value & mask) << lowBitNth);
          },

          get() {
            return (this.number >> lowBitNth) & mask;
          },
        },
      );
    };
  }
}

export const {bits} = UnionStruct;
