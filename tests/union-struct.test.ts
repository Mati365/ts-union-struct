import UnionStruct, {bits} from '../src/union-struct';

class Register extends UnionStruct {
  @bits(0) lsb: number;
  @bits(15) msb: number;

  @bits(0, 7) low: number;
  @bits(8, 15) high: number;
}

describe('struct test', () => {
  const reg = new Register;

  it('handles multiple bits fields', () => {
    reg.number = 0x00_00;
    reg.low = 0x1;
    reg.high = 0xFF;

    expect(reg.low).toEqual(0x1);
    expect(reg.high).toEqual(0xFF);
  });

  it('handle single bits fields', () => {
    reg.number = 0xFF_00;

    reg.lsb = 2;
    expect(reg.lsb).toEqual(0x0);

    reg.lsb = 1;
    expect(reg.lsb).toEqual(0x1);

    reg.msb = 1;
    expect(reg.msb).toEqual(0x1);
  });
});
