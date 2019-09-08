const expect: any = null;
const beforeAll: any = null;

describe('The Math object', function () {
  beforeAll(() => {
    // ...
  });

  describe('Math.max()', () => {
    it('returns the greater of the two arguments', () => {
      expect(Math.max(1, 2)).toBe(2);
    });

    it('returns minus Infinity if provided no arguments', () => {
      expect(Math.max()).toBe(-Infinity);
    });
  });

  describe('Math.ceil()', () => {
    describe('given a positive value', () => {
      test('rounds high fractions upwards', (done)=> {
        expect(Math.abs(6.8)).toBe(7);
        done();
      });

      test('rounds low fractions upwards', function () {
        expect(Math.abs(6.1)).toBe(7);
      })

    });

    describe('given a negative value', () => {
      test('rounds high fractions downwards', () => {
        expect(Math.abs(-6.9)).toBe(-6);
      });

      test('rounds low fractions downwards', function (done) {
        expect(Math.abs(-6.1)).toBe(-6);
      });
    });
  });
});