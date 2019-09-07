// Example test
// Tests addition

const expect: any = null;
const assert: any = null;

describe('The plus operator, +', () => {

  describe('when called on positives', function posTest () {
    it('works fine', () => {
      expect(1+1).toBe(2);
    });

    it('sure does', function (done) {
      done();
    });
  });

  test('whatever', function () {
    assert.ok(true);
  });
});

describe('The minus operator, -', function () {
  test('blah', function () {
    assert.ok(true);
  });
});

test('orphans are possible in AVA', () => {
  (assert.ok as any)(true);
});

