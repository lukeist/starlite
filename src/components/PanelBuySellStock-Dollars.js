import { useState } from "react";

const PanelBuySellStockDollars = ({ stockCurrentPrice }) => {
  const currentcyFormat = new Intl.NumberFormat("ja-JP", {
    style: "currency",
    currency: "USD",
  });

  const [value, setValue] = useState("");

  const keyPressHanlder = (event) => {
    const { key } = event;
    setValue((e) =>
      key !== "Backspace"
        ? !Number.isNaN(parseInt(key)) || key === "," || key === "."
          ? e + key
          : e
        : e.substring(0, e.length - 1)
    );
  };

  //   const regex = /^-?\d*[.]?\d{0,2}$/; //////////// HTML text input allow only numeric input https://jsfiddle.net/emkey08/zgvtjc51 https://stackoverflow.com/questions/469357/html-text-input-allow-only-numeric-input
  //   const [estimateQuantity, setEstimateQuantity] = useState(0);
  //   const [inputDollars, setInputDollars] = useState("");

  //   const estimateQuantityHandler = (e) => {
  //     const getNumberOfDollars = e.target.value;
  //     let numberOfDollarsToString = getNumberOfDollars.toString();
  //     const indexOfDollarSign = numberOfDollarsToString.indexOf("$");
  //     console.log(indexOfDollarSign);
  //     console.log(numberOfDollarsToString);

  //     if (indexOfDollarSign > 0) {
  //       numberOfDollarsToString = numberOfDollarsToString.replace("$", "");
  //       console.log(numberOfDollarsToString);
  //     }
  //     const numberOfDollarBackToNumber = parseFloat(numberOfDollarsToString);
  //     ////////////////// REGEX to allow only numbers in textbox in reactjs: https://stackoverflow.com/questions/43067719/how-to-allow-only-numbers-in-textbox-in-reactjs
  //     const regexInput = regex.test(numberOfDollarBackToNumber);
  //     if (numberOfDollarBackToNumber === "" || regexInput) {
  //       setInputDollars("$" + numberOfDollarBackToNumber);
  //       const getEstimateQuantity =
  //         Math.round((numberOfDollarBackToNumber / stockCurrentPrice) * 100000) /
  //         100000;
  //       if (numberOfDollarBackToNumber > 0) {
  //         setEstimateQuantity(getEstimateQuantity);
  //       } else {
  //         setEstimateQuantity(0);
  //       }
  //     }
  //   };

  return (
    <div>
      <div className="trade-info">
        <label className="trade-label" htmlFor="amount">
          Amount
        </label>

        <input
          //   type="text"
          //   required
          //   onChange={estimateQuantityHandler}
          className="input-name trade-input"
          //   id="amount-dollar"
          //   name="amount-dollar"
          placeholder="$0.00"
          //   value={inputDollars}
          onKeyDown={keyPressHanlder}
          value={value !== "" ? currentcyFormat.format(value) : ""}
        />
      </div>
      <hr className="trade-hr-line" />
      <div className="trade-info">
        <span className="estimate">Est. Quantity</span>
        <span className="estimate-result">{"estimateQuantity"}</span>
      </div>
    </div>
  );
};

export default PanelBuySellStockDollars;
