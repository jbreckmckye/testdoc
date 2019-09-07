// Example test
// Tests the Math object

const expect: any = null;
const assert: any = null;

describe('The Math object', () => {

  it('is not a constructor', () => {
    const shouldFail = () => {
      // @ts-ignore
      new Math();
    };
    expect(shouldFail).toThrow();
  });

  describe('Math.E', ()=> {
    it('is a number', done => {
      expect(typeof Math.E).toBe('number');
      done();
    });

    it('is positive', () => {
      expect(Math.E > 0).toBeTruthy();
    });
  });

  describe('Math.Max', () => {
    describe('with correct args', () => {
      it('returns the greater', ()=> {
        const x = Math.max(1, 2);
        assert.strictDeepEqual(x, 2);
        expect(x).toBe(2);
      });
    });
  });
});

it('is an orphaned test', () => {
  (assert.ok as any)(true);
});

