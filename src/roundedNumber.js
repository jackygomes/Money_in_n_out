const roundedNumber = (num) => {
  let rounded = num.toFixed(2);

  const fee =
    parseFloat(rounded) < num
      ? parseFloat(rounded) + 0.01
      : parseFloat(rounded);

      return fee;
};

module.exports = roundedNumber;