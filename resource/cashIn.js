const roundedNumber = require('./roundedNumber');

const cashIn = (transaction) => {
  let fee = (transaction.operation.amount / 100) * 0.03;
  if (fee > 5) fee = 5;
  let roundedFee = roundedNumber(fee);
  return roundedFee;
};

module.exports = cashIn;