const CompanyMarketCap = (company) => {
  const marketCapLength = Math.round(company.marketCapitalization).toString()
    .length;
  const marketCapMillion = Math.round(company.marketCapitalization) + "M";
  const marketCapBillion =
    +(Math.round((company.marketCapitalization * 100) / 1000) + "e-2") + "B";
  const marketCapTrillion =
    Math.round(company.marketCapitalization)
      .toString()
      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")
      .slice(0, -4) + "B";

  //   marketCapLength > 3
  //     ? marketCapLength > 6
  //       ? marketCapTrillion
  //       : marketCapBillion
  //     : marketCapMillion;

  if (marketCapLength > 3) {
    return marketCapBillion;
  } else if (marketCapLength > 6) {
    return marketCapTrillion;
  } else {
    return marketCapMillion;
  }
};

export default CompanyMarketCap;
