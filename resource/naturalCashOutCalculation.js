const naturalCashOutCalculation = (amount, deductAmount, deduct) => {
  let excededAmount = 0;
  if(deduct){
    let fee = 0;
    if (amount > 1000) {
      excededAmount = amount - deductAmount;
      fee = (excededAmount / 100) * 0.3;
    } else {
      fee = 0.00;
    }
    let calculatedData = {
      fee: fee,
      excededAmount: excededAmount
    }
    return calculatedData;
  }else {
    excededAmount = amount;
    let fee = (excededAmount / 100) * 0.3;
    let calculatedData = {
      fee: fee,
      excededAmount: excededAmount
    }
    return calculatedData;
  }
};

module.exports = naturalCashOutCalculation;