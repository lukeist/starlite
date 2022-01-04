export const getEstimateCost = (getShares, stockPrice) => {
  const cost =
    Math.round(
      (getShares * stockPrice + Number.EPSILON) * 100 //to be more specific and to ensure things like 1.005 round correctly, use Number.EPSILON : https://stackoverflow.com/questions/11832914/how-to-round-to-at-most-2-decimal-places-if-necessary
    ) / 100;
  return {
    estimateCost: cost,
    estimateCostToString: cost.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","), // Display large numbers with commas https://stackoverflow.com/questions/27761543/how-do-i-display-large-numbers-with-commas-html
  };
};

export const getEstimateQuantity = (getDollars, stockPrice) => {
  const getNumberOfDollarsParseFloat = parseFloat(
    getDollars.replace("$", "").split(",").join("")
  );
  const getEstimatetradeQuantityToFiveNumberAfterPoint =
    Math.round((getNumberOfDollarsParseFloat / stockPrice) * 100000) / 100000;
  return {
    estimateQuantity: getEstimatetradeQuantityToFiveNumberAfterPoint,
    estimateCost: getNumberOfDollarsParseFloat,
  };
};
