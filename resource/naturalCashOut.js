const moment = require("moment");
moment.updateLocale("en", {
  week: {
    dow: 1, // First day of week is Monday
  },
});
const transactions = [];

const roundedNumber = require('./roundedNumber');
const naturalCashOutCalculation = require('./naturalCashOutCalculation');

const naturalCashOut = (transaction) => {

  let amount = transaction.operation.amount;
  let deductAmount = 1000;
  let deduct = true;
  let weekNumber = moment(transaction.date, "YYYY-MM-DD").week();
  let year = moment(transaction.date, "YYYY-MM-DD").year();

  if (transactions[transaction.user_id]) {
    if ( weekNumber == transactions[transaction.user_id].date.weekNumber && year == transactions[transaction.user_id].date.year ) {
      if(transactions[transaction.user_id].amount > 1000){
        deductAmount = 0;
        deduct = false;
      }else {
        amount = transactions[transaction.user_id].amount + transaction.operation.amount;
      }

      let calculatedData = naturalCashOutCalculation(amount, deductAmount, deduct);

      let roundedFee = roundedNumber(calculatedData.fee);
      return roundedFee;

      transactions[transaction.user_id] = {
        id: transaction.user_id,
        date: {
          weekNumber: weekNumber,
          year: year,
        },
        amount: amount,
      };
    } else {

      let calculatedData = naturalCashOutCalculation(amount, deductAmount, deduct);

      let roundedFee = roundedNumber(calculatedData.fee);
      return roundedFee;
      
      transactions[transaction.user_id] = {
        id: transaction.user_id,
        date: {
          weekNumber: weekNumber,
          year: year,
        },
        amount: transaction.operation.amount,
      };
    }
  }else {
    let calculatedData = naturalCashOutCalculation(amount, deductAmount, deduct);
    
    let roundedFee = roundedNumber(calculatedData.fee);
    return roundedFee;
    
    transactions[transaction.user_id] = {
      id: transaction.user_id,
      date: {
        weekNumber: weekNumber,
        year: year,
      },
      amount: amount,
    };
  }
};

module.exports = naturalCashOut;