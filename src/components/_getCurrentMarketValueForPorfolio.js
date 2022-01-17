import axios from "axios";
import { quoteData, companyProfile } from "../api";
import { addTickerToListAction } from "../store/actions/listAction";
import companyMarketCap from "./_getCompanyMarketCap";

/////////////////////////////////////////////////////// For Automate
const getStocksForMyFirstList = async (list, dispatch, positions) => {
  //   console.log(list);

  for (let i = 0; i < positions.length; i++) {
    //fetch axios
    // const getCompany = await axios.get(companyProfile(arrayOfStocks[i]));
    const getQuote = await axios.get(quoteData(positions[i].symbol));

    const dollarSign = "$";
    const dollarSignPositive = "+$";
    const dollarSignNegative = "-$";
    const indexAfterMinusSign = 1;

    // const current = positions[i].current;
    const quantity = positions[i].quantity;
    const quote = getQuote.data;

    const costBasisNumber = action.payload.costBasisNumber;
    const sharePriceNumber = quote.c;

    const priceChangePercentage = decimalConverter(quote.dp, 100);
    const priceChangeNumber = quote.d;
    // .substring(
    //   indexAfterMinusSign
    // ); // remove -
    const marketValueNumber = decimalConverter(
      sharePriceNumber * quantity,
      100
    );
    const dayChangeNumber = decimalConverter(priceChangeNumber * quantity, 100);
    const dayChangePercentage = decimalConverter(
      (dayChangeNumber * 100) / costBasisNumber,
      100
    );
    const gainLostAllTimeNumber = decimalConverter(
      marketValueNumber - costBasisNumber,
      100
    );

    const gainLostAllTimePercentage = decimalConverter(
      (gainLostAllTimeNumber * 100) / costBasisNumber,
      100
    );
    // if (state.length > 0) {

    //   // ToString

    const sharePrice = dollarSign + numberWithCommas(sharePriceNumber);
    const priceChange =
      dollarSignPositive + numberWithCommas(priceChangeNumber);
    const priceChangeNegative =
      dollarSignNegative +
      numberWithCommas(priceChangeNumber).substring(indexAfterMinusSign); // remove -;
    const marketValue = dollarSign + numberWithCommas(marketValueNumber);
    const dayChange = dollarSignPositive + numberWithCommas(dayChangeNumber);
    const dayChangeNegative =
      dollarSignNegative +
      numberWithCommas(dayChangeNumber).substring(indexAfterMinusSign); // remove -;;
    // .substring(indexAfterMinusSign); // remove -
    const gainLostAllTime =
      dollarSignPositive + numberWithCommas(gainLostAllTimeNumber);
    const gainLostAllTimeNegative =
      dollarSignNegative +
      numberWithCommas(gainLostAllTimeNumber).substring(indexAfterMinusSign); // remove -
    // }

    const current = {
      sharePriceNumber,
      sharePrice,
      priceChangeNumber,
      priceChange,
      priceChangePercentage,
      priceChangeNegative,
      dayChangeNumber,
      dayChange,
      dayChangePercentage,
      dayChangeNegative,
      costBasis,
      costBasisNumber,
      gainLostAllTimeNumber,
      gainLostAllTime,
      gainLostAllTimePercentage,
      gainLostAllTimeNegative,
      marketValueNumber,
      marketValue,
    };
    dispatch(addTickerToListAction(stock, "my1stlist"));
  }
};

export default getStocksForMyFirstList;
