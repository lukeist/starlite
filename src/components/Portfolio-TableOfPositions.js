import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faWindowClose,
  faSortUp,
  faSortDown,
} from "@fortawesome/free-solid-svg-icons";
import numberWithCommas from "./_getCommasAsThousandsSeparators ";
import { useSelector } from "react-redux";
import { quoteData } from "../api";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import decimalConverter from "./_getDecimal";

export const TableofPositionsHeader = () => {
  return (
    <div className="portfolio-table-header">
      <div className="table-header">
        <ul className="table-column">
          <li className="table-left">
            <p className="portfolio-table-title">Symbol</p>
            <p className="portfolio-table-subtitle">Company Name</p>
          </li>
          <li className="table-right">
            <p className="portfolio-table-title">Quantity</p>
            <p className="portfolio-table-subtitle"></p>
          </li>
          <li className="table-right">
            <p className="portfolio-table-title">Share Price</p>
          </li>
          <li className="table-right">
            <p className="portfolio-table-title">Price Change</p>
            <p className="portfolio-table-subtitle">(%)</p>
          </li>
          <li className="table-right">
            <p className="portfolio-table-title">Market Value</p>
          </li>
          <li className="table-right">
            <p className="portfolio-table-title">Day Change</p>
            <p className="portfolio-table-subtitle">(%)</p>
          </li>
          <li className="table-right">
            <p className="portfolio-table-title">Cost Basis</p>
          </li>
          <li className="table-right">
            <p className="portfolio-table-title">Gain/Loss</p>
            <p className="portfolio-table-subtitle">(%)</p>
          </li>
        </ul>
      </div>
      <hr />
    </div>
  );
};

//////////////////////////////////////////////////////////////////////////////////////////////

export const TableOfPositions = ({ position }) => {
  //////////////// GET TOTAL COST OF ALL CURRENT SHARE'S ORDERS, INCLUDE SALE ORDERS
  const { tradeMessages } = useSelector((state) => state.messages);
  const companyName = position.companyName;
  const allOrdersFromCurrentPosition = tradeMessages.filter(
    (order) => order.symbol === position.symbol
  );
  let costBasisNumber = 0;
  for (let i = 0; i < allOrdersFromCurrentPosition.length; i++) {
    costBasisNumber =
      Math.round(
        (allOrdersFromCurrentPosition[i].tradeCostTotal +
          costBasisNumber +
          Number.EPSILON) *
          100
      ) / 100;
  }
  const costBasis = numberWithCommas(costBasisNumber);

  //////////////// GET COMPANY's DATA, CURRENT QUOTE
  const symbol = position.symbol;
  const [quote, setQuote] = useState("");

  const fetchQuote = async (symbol) => {
    return await axios.get(quoteData(symbol)).then((res) => setQuote(res.data)); // axios gets data instead of Promise
  };
  const location = useLocation(); // PUT SToCKs TO STATE WHEN GO TO /portfolio

  useEffect(() => {
    if (location.pathname.includes("portfolio")) {
      fetchQuote(symbol);
    }
  }, [location]);

  //////////////// CALCULATE MARKET VALUE, DAY CHANGE, COST PER SHARE, GAIN/LOSS PER SHARE, GAIN/LOSS TOTAL
  const indexAfterMinusSign = 1;
  const quantity = position.quantity;

  let sharePrice;
  let priceChangePercent;
  let priceChange;
  let priceChangeNegative; // remove -
  let marketValueNumber;
  let marketValue;
  let dayChangeNumber;
  let dayChange;
  let dayChangeNegative; // remove -
  let dayChangePercentage;
  let gainLostAllTimeNumber;
  let gainlostAllTime;
  let gainlostAllTimeNegative; // remove -
  let gainLostAllTimePercentage;
  if (quote !== "") {
    sharePrice = numberWithCommas(quote.c);
    priceChangePercent = decimalConverter(quote.dp, 100);
    priceChange = quote.d;
    priceChangeNegative = quote.d.toString().substring(indexAfterMinusSign);
    marketValueNumber = decimalConverter(sharePrice * quantity, 100);
    marketValue = numberWithCommas(marketValueNumber);

    dayChangeNumber = decimalConverter(priceChange * quantity, 100);
    dayChange = numberWithCommas(dayChangeNumber);
    dayChangeNegative = dayChange.substring(indexAfterMinusSign);
    dayChangePercentage = decimalConverter(
      (dayChangeNumber * 100) / costBasisNumber,
      100
    );
    gainLostAllTimeNumber = decimalConverter(
      marketValueNumber - costBasisNumber,
      100
    );
    gainlostAllTime = numberWithCommas(gainLostAllTimeNumber);
    gainlostAllTimeNegative = gainlostAllTime.substring(indexAfterMinusSign);
    gainLostAllTimePercentage = decimalConverter(
      (gainLostAllTimeNumber * 100) / costBasisNumber,
      100
    );
  }

  return (
    <div className="portfolio-table-item">
      {quote !== "" && (
        <div className="table-item">
          <ul className="table-column">
            <li
              onClick={() => console.log(gainlostAllTime)}
              className="table-left"
            >
              <p className="portfolio-table-title">{symbol}</p>
              <p className="portfolio-table-subtitle">{companyName}</p>
            </li>
            <li className="table-right">{quantity}</li>
            <li className="table-right">${sharePrice}</li>
            <li
              className={
                priceChangePercent < 0
                  ? "table-right stonk-down"
                  : "table-right stonk-up"
              }
            >
              <p className="portfolio-table-title">
                {priceChangePercent < 0
                  ? `-$` + priceChangeNegative
                  : `+$` + priceChange}
              </p>
              <p className="portfolio-table-subtitle">
                {priceChangePercent < 0
                  ? priceChangePercent
                  : `+` + priceChangePercent}
                %
              </p>
            </li>
            <li className="table-right">${marketValue}</li>
            <li className="table-right">
              <p className="portfolio-table-title">
                {dayChangeNumber < 0
                  ? `-$` + dayChangeNegative
                  : (dayChangeNumber = 0 ? `$` + dayChange : `+$` + dayChange)}
              </p>
              <p className="portfolio-table-subtitle">
                {priceChangePercent < 0
                  ? dayChangePercentage
                  : `+` + dayChangePercentage}
                %
              </p>
            </li>
            <li className="table-right">${costBasis}</li>
            <li className="table-right">
              <p className="portfolio-table-title">
                {gainLostAllTimeNumber < 0
                  ? `-$` + gainlostAllTimeNegative
                  : (gainLostAllTimeNumber = 0
                      ? `$` + gainlostAllTime
                      : `+$` + gainlostAllTime)}
              </p>
              <p className="portfolio-table-subtitle">
                {gainLostAllTimeNumber < 0
                  ? gainLostAllTimePercentage
                  : `+` + gainLostAllTimePercentage}
                %
              </p>
            </li>
          </ul>
          <hr />
        </div>
      )}
    </div>
  );
};

//////////////////////////////////////////////////////////////////////////////////////////////

export const TableofPositionsFooter = () => {
  return (
    <div className="portfolio-table-header">
      <div className="table-header">
        <ul className="table-column">
          <li className="table-left">
            <p className="portfolio-table-title">Symbol</p>
            <p className="portfolio-table-subtitle">Company Name</p>
          </li>
          <li className="table-right">Quantity</li>
          <li className="table-right">Share Price</li>
          <li className="table-right">
            <p className="portfolio-table-title">Price Change</p>
            <p className="portfolio-table-subtitle">(%)</p>
          </li>
          <li className="table-right">Market Value</li>
          <li className="table-right">
            <p className="portfolio-table-title">Day Change</p>
            <p className="portfolio-table-subtitle">(%)</p>
          </li>
          <li className="table-right">Cost Basis</li>
          <li className="table-right">
            <p className="portfolio-table-title">Gain/Loss Total</p>
            <p className="portfolio-table-subtitle">(%)</p>
          </li>
        </ul>
      </div>
      <hr />
    </div>
  );
};
