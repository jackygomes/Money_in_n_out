var moment = require("moment");
moment.updateLocale("en", {
  week: {
    dow: 1, // First day of week is Monday
  },
});

// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}
// Read the file and print its contents.
const fs = require("fs");
const filename = process.argv[2];
const transactions = [];

fs.readFile(filename, "utf8", (err, data) => {
  if (err) throw err;

  const inputData = JSON.parse(data);

  inputData.forEach((item) => {
    // Cash in block
    if (item.type == "cash_in") {
      cashIn(item);
    }
    // Cash in block ends

    // Cash out block
    if (item.type == "cash_out") {
      // Cash out block legal
      if (item.user_type == "juridical") {
        juridicalCashOut(item);
      }
      if (item.user_type == "natural") {
        naturalCashOut(item);
      }
      // Cash out block legal ends
    }
    // Cash out block ends
  });
});

const cashIn = (transaction) => {
  let fee = (transaction.operation.amount / 100) * 0.03;
  if (fee > 5) fee = 5;
  roundedNumber(fee);
};

const juridicalCashOut = (transaction) => {
  let fee = (transaction.operation.amount / 100) * 0.3;
  if (fee < 0.5) fee = 0.5;
  roundedNumber(fee);
};

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
      roundedNumber(calculatedData.fee);

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
      roundedNumber(calculatedData.fee);
      
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
    roundedNumber(calculatedData.fee);
    
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

const naturalCashOutCalculation = (amount, deductAmount, deduct) => {
  let excededAmount = 0;
  if(deduct){
    if (amount > 1000) {
      excededAmount = amount - deductAmount;
      let fee = (excededAmount / 100) * 0.3;
      let calculatedData = {
        fee: fee,
        excededAmount: excededAmount
      }
      return calculatedData;
      // roundedNumber(fee);
    } else {
      let fee = 0.00;
      let calculatedData = {
        fee: fee,
        excededAmount: excededAmount
      }
      return calculatedData;
      // roundedNumber(fee);
    }
  }else {
    excededAmount = amount;
    let fee = (excededAmount / 100) * 0.3;
    let calculatedData = {
      fee: fee,
      excededAmount: excededAmount
    }
    return calculatedData;
  }
}

const roundedNumber = (num) => {
  let rounded = num.toFixed(2);

  const fee =
    parseFloat(rounded) < num
      ? parseFloat(rounded) + 0.01
      : parseFloat(rounded);

  process.stdout.write(fee.toFixed(2) + "\n");
};
