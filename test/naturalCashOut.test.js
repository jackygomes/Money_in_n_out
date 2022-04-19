const naturalCashOut = require('../src/naturalCashOut');

test('calculate natural cash out', () => {
  const naturalCashOutObj = { "date": "2016-01-06", "user_id": 1, "user_type": "natural", "type": "cash_out", "operation": { "amount": 30000, "currency": "EUR" } }
	expect(
    naturalCashOut(naturalCashOutObj)
	).toBe(87.00);
})
