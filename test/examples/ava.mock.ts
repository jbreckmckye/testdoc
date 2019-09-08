const assert: any = null;

test('Math.sign() handles positives', () => {
  assert.ok(Math.sign(6) === 1);
});

test('Math.sign() handles negatives', function () {
  assert.ok(Math.sign(-6) === -1);
});

test('Math.sign() handles zero', () => {
  assert.ok(Math.sign(0) === 0);
});
