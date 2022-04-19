
const naturalCashOutCalculation = require('../src/naturalCashOutCalculation');

test('calculate natural cash out calculated data', () => {
  const calculatedData = {
      fee: 0.3,
      excededAmount: 100
    }
	expect(
    naturalCashOutCalculation(1100, 1000, true)
	).toMatchObject(calculatedData);
})