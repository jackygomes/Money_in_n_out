const app = require('./app');
const appInput = require('./input.json');

test('calculate cash in and out', () => {
  const cashInObj = { "date": "2016-01-05", "user_id": 1, "user_type": "natural", "type": "cash_in", "operation": { "amount": 200.00, "currency": "EUR" } }
	expect(
    app(cashInObj) // inside function, expected data, that is to be entered
	).toBe(0.06);  // inside toBe, expected result, that should arrive

	// expect(
  //   	juridicalCashOut() // inside function, expected data, that is to be entered
	// ).toBe();  // inside toBe, expected result, that should arrive

	// expect(
  //   	naturalCashOut() // inside function, expected data, that is to be entered
	// ).toBe();  // inside toBe, expected result, that should arrive
})
