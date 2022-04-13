// Make sure we got a filename on the command line.
if (process.argv.length < 3) {
  console.log("Usage: node " + process.argv[1] + " FILENAME");
  process.exit(1);
}
// Read the file and print its contents.
var fs = require("fs"),
  filename = process.argv[2];
fs.readFile(filename, "utf8", function (err, data) {
  if (err) throw err;

  var inputData = JSON.parse(data);

  const transactions = [];

  inputData.forEach(function (item) {
    // Cash in block
    if (item.type == "cash_in") {
      let fee = (item.operation.amount / 100) * 0.03;
      if (fee > 5) fee = 5;
      console.log(fee);
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
    }
    // Cash out block ends
  });
});
