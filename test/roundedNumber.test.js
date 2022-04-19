const roundedNumber = require('../src/roundedNumber');

test('Number rounded', () => {
  const calculatedData = 0.023
	expect(
    roundedNumber(0.023)
	).toBe(0.03);
})
