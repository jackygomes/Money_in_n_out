const cashIn = require('../src/cashIn');

test('calculate cash in', () => {
  const cashInObj = { "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "EUR" } }
	expect(
    cashIn(cashInObj)
	).toBe(0.06);
})
