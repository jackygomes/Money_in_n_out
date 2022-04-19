const juridicalCashOut = require('../src/juridicalCashOut');

test('calculate judicial cash out', () => {
  const cashOutObj = { "date": "2016-01-06", "user_id": 2, "user_type": "juridical", "type": "cash_out", "operation": { "amount": 300.00, "currency": "EUR" } }
	expect(
    juridicalCashOut(cashOutObj)
	).toBe(0.90);
})
