const roundedNumber = require('./roundedNumber');

const juridicalCashOut = (transaction) => {
  let fee = (transaction.operation.amount / 100) * 0.3;
  if (fee < 0.5) fee = 0.5;
  let roundedFee = roundedNumber(fee);
  return roundedFee;
};

module.exports = juridicalCashOut;