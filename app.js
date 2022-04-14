// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}
// Read the file and print its contents.
const fs = require("fs");
const filename = process.argv[2];

fs.readFile(filename, "utf8", (err, data) => {
  if (err) throw err;

  const inputData = JSON.parse(data);

  const transactions = [];

  inputData.forEach((item) => {
    // Cash in block
    if (item.type == "cash_in") {
      cashIn(item);
    }
    // Cash in block ends

    // Cash out block
    if (item.type == "cash_out") {
      let amount = item.operation.amount;
      if (transactions[item.user_id]) {
        amount = transactions[item.user_id].amount + item.operation.amount;
      }

      transactions[item.user_id] = {
        id: item.user_id,
        date: item.date,
        amount: amount,
      };

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
  console.log(transactions);
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
  // roundedNumber(transaction.operation.amount);
};

const roundedNumber = (num) => {
  let rounded = num.toFixed(2);

  const fee =
    parseFloat(rounded) < num
      ? parseFloat(rounded) + 0.01
      : parseFloat(rounded);

  process.stdout.write(fee.toFixed(2) + "\n");
};
