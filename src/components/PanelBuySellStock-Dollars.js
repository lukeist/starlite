import { useEffect } from "react";
import { useState } from "react";
import CurrencyInput from "./CurrencyInput";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";

const PanelBuySellStockDollars = ({
  stockCurrentPrice,
  tradeQuantity,
  setTradeQuantity,
  totalCost,
  setTotalCost,
  isBuying,
  stockPriceChange,
  quantityOfCurrentStock,
}) => {
  //   const regex = /^-?\d*[.,]?\d{0,2}$/; //////////// HTML text input allow only numeric input https://jsfiddle.net/emkey08/zgvtjc51 https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input

  // SOLUTIONS: $ IN FRONT OF NUMBER
  //https://www.reddit.com/r/reactjs/comments/rqva1t/anyone_know_how_to_put_the_in_the_input_field/
  //https://codesandbox.io/s/cocky-poitras-jvbow?file=/src/App.js
  //   const [cost, setCost] = useState("");
  // const [targetValueNumberOfDollars,]
  const handleInput = (e) => {
    const getNumberOfDollars = e.target.value;
    const getNumberOfDollarsParseFloat = parseFloat(
      getNumberOfDollars.replace("$", "").split(",").join("")
    );
    const getEstimatetradeQuantity =
      Math.round((getNumberOfDollarsParseFloat / stockCurrentPrice) * 100000) /
      100000;
    // console.log(getNumberOfDollarsParseFloat);

    setTradeQuantity(getEstimatetradeQuantity);
    setTotalCost(getNumberOfDollarsParseFloat);
    // console.log(getNumberOfDollars);
    // }
    // ////////////////// REGEX to allow only numbers in textbox in reactjs: https://stackoverflow.com/questions/43067719/how-to-allow-only-numbers-in-textbox-in-reactjs
    // const regexInput = regex.test(getNumberOfDollars);
    // if (getNumberOfDollars === "" || regexInput) {
    //   if (getNumberOfDollars.charAt(0) === "$") {
    //     setCost(getNumberOfDollars.substring(1));
    //     return;
    //   }
    //   setCost(getNumberOfDollars);
    // }
  };
  //     if (numberOfDollarBackToNumber > 0) {
  //       setTradeQuantity(getEstimatetradeQuantity);
  //     } else {
  //       setTradeQuantity(0);
  //     }
  //   }
  // // };
  const sellAllInDollars =
    Math.round(
      (stockCurrentPrice * quantityOfCurrentStock + Number.EPSILON) * 100
    ) / 100;

  const [isSellAll, setIsSellAll] = useState(false);
  const handleSellAll = () => {
    setIsSellAll(true);
    const sellAllQuantity = Math.round(
      ((sellAllInDollars / stockCurrentPrice + Number.EPSILON) * 100) / 100
    );
    setTradeQuantity(sellAllQuantity);

    console.log(sellAllInDollars);
  };

  const handleOnClickCurrencyInput = () => {
    if (isSellAll) {
      setTotalCost(sellAllInDollars);
      setIsSellAll(false);
    }
  };

  return (
    <div>
      <div className="trade-info">
        <label className="trade-label" htmlFor="amount">
          Amount
        </label>
        <CurrencyInput
          className="input-name trade-input"
          type="text"
          //   onInput={handleInput}
          placeholder="$0.00"
          onChange={handleInput}
          onClick={handleOnClickCurrencyInput}
          value={
            isSellAll
              ? sellAllInDollars
              : isNaN(totalCost)
              ? ""
              : totalCost === 0
              ? ""
              : totalCost
          }
        />
      </div>
      <hr className="trade-hr-line" />
      <div className="trade-info">
        <span className="estimate">Est. Quantity</span>
        <span className="estimate-result">
          {isNaN(tradeQuantity) ? 0 : tradeQuantity}
        </span>
      </div>
      {!isBuying && (
        <div className="trade-info">
          <span className="estimate"></span>
          <div className="sell-all">
            <span
              onClick={handleSellAll}
              className={stockPriceChange < 0 ? "stonk-down" : "stonk-up"}
            >
              Sell All
            </span>{" "}
            <FontAwesomeIcon className="more-icon" icon={faExclamationCircle} />
          </div>
        </div>
      )}
    </div>
    // <div>
    //   <div className="trade-info">

    //     <input
    //               className="input-name trade-input"

    //       //   type="text"
    //       //   required
    //       //   onChange={estimatetradeQuantity}
    //       //   id="amount-dollar"
    //       //   name="amount-dollar"
    //       placeholder="$0.00"
    //       //   value={inputDollars}
    //       onKeyDown={keyPressHanlder}
    //       value={
    //         value !== ""
    //           ? //   currentcyFormat.format(value).indexOf(".00") > 0
    //             //     ? currentcyFormat.format(value).replace(/\D00(?=\D*$)/, "")
    //             // :
    //             currentcyFormat.format(value)
    //           : ""
    //       }
    //     />
    //   </div>

    // </div>
  );
};

export default PanelBuySellStockDollars;
