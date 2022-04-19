const cashIn = require('./resource/cashIn');
const roundedNumber = require('./resource/roundedNumber');
const juridicalCashOut = require('./resource/juridicalCashOut');
const naturalCashOut = require('./resource/naturalCashOut');

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

  inputData.forEach((item) => {
    // Cash in block
    if (item.type == "cash_in") {
      let fee = cashIn(item);
      output(fee);
    }
    // Cash in block ends

    // Cash out block
    if (item.type == "cash_out") {
      // Cash out block legal
      if (item.user_type == "juridical") {
        let fee = juridicalCashOut(item);
        output(fee);
      }
      if (item.user_type == "natural") {
        let fee = naturalCashOut(item);
        output(fee);
      }
      // Cash out block legal ends
    }
    // Cash out block ends
  });
});

const output = (fee) => {
  process.stdout.write(fee.toFixed(2) + "\n");
}

