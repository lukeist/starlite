import axios from "axios";
import {
  quoteData,
  companyNewsData3Days,
  companyNewsData7Days,
  companyNewsDataToday,
  basicFinancialsData,
  companyProfile,
} from "../api";

import { addTickerToListAction } from "../store/actions/listAction";
import { stocksAction } from "../store/actions/stocksAction";
import { useDispatch, useSelector } from "react-redux";
import companyMarketCap from "./_getCompanyMarketCap";

/////////////////////////////////////////////////////// For Automate
const getStocksForMyFirstList = async (list, dispatch) => {
  //   console.log(list);
  const arrayOfStocks = [
    "GME",
    "TSLA",
    "MSFT",
    "AAPL",
    "NIO",
    "GM",
    "BA",
    "SQ",
    "COIN",
    "HOOD",
    "FORD",
    "FB",
    "SPCE",
    "ABNB",
    "OXY",
    "CCL",
    "DIDI",
    "BABA",
    "RBLX",
    "NET",
    "AMD",
    "SHOP",
    "ROKU",
    "DIS",
    "SNAP",
    "DAL",
    "GOOG",
  ];

  for (let i = 0; i < arrayOfStocks.length; i++) {
    //fetch axios
    const getCompany = await axios.get(companyProfile(arrayOfStocks[i]));
    const getQuote = await axios.get(quoteData(arrayOfStocks[i]));

    const companyName = getCompany.data.name;
    const stockCurrentPrice = getQuote.data.c;
    const stockPercentChange = Math.round(getQuote.data.dp * 100) / 100;
    const marketCap = companyMarketCap(getCompany.data);
    const stock = {
      companyName,
      symbol: getCompany.data.ticker,
      stockCurrentPrice,
      stockPercentChange,
      marketCap,
    };
    list.tickers.push(stock);
    dispatch(addTickerToListAction(stock, "my1stlist"));
  }
};

export default getStocksForMyFirstList;
