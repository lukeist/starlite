import { useDispatch } from "react-redux";
import { stocksAction } from "../actions/stocksAction";

const ResultList = ({ stock, searchInputUpperCase, setIsSearching }) => {
  /////////////////////////////////////////////////// change the color of search result's string followed input (like search on Robinhood):
  ////////////////////// cut the string into an array with 3 items: [head string, searchInput, tail string]
  const changeResultChar = (terms) => {
    if (typeof terms === "undefined") {
      return searchInputUpperCase;
    } else {
      // copy string from searchResult[x].resultSymbol/description because api data is immute
      const stringCopy = (" " + terms).slice(1);
      // remove searchInput from string:
      const stringWithSearchInputRemoved = stringCopy.replace(
        searchInputUpperCase,
        "$"
      );
      // create tail and head strings
      const headString = stringWithSearchInputRemoved.slice(
        0,
        stringWithSearchInputRemoved.indexOf("$")
      );
      const tailString = stringWithSearchInputRemoved.slice(
        stringWithSearchInputRemoved.indexOf("$") + 1
      );
      if (terms.indexOf(searchInputUpperCase) > -1) {
        return [headString, searchInputUpperCase, tailString];
      } else {
        return stringCopy;
      }
    }
  };
  /////////////////////////////////////////////////// go to stock when click
  const dispatch = useDispatch();
  const getStockDetailHandler = () => {
    dispatch(stocksAction(stock.symbol));
    setIsSearching(false);
    console.log(stock.symbol);
  };
  return (
    <div
      // onMouseDown preventDefault makes onBlur comes after onClick: https://stackoverflow.com/questions/17769005/onclick-and-onblur-ordering-issue
      onMouseDown={(e) => e.preventDefault()}
      onClick={getStockDetailHandler}
    >
      <ul className="search-list">
        <li className="symbol-result">
          {stock.symbol.indexOf(searchInputUpperCase) > -1 ? (
            <span>
              <span>{changeResultChar(stock.symbol)[0].toLowerCase()}</span>
              <span className="highlight-input">
                {changeResultChar(stock.symbol)[1].toLowerCase()}
              </span>
              <span>{changeResultChar(stock.symbol)[2].toLowerCase()}</span>
            </span>
          ) : (
            stock.symbol
          )}
        </li>
        <li className="description-result">
          {stock.description.indexOf(searchInputUpperCase) > -1 ? (
            <span>
              <span>
                {changeResultChar(stock.description)[0].toLowerCase()}
              </span>
              <span className="highlight-input">
                {changeResultChar(stock.description)[1].toLowerCase()}
              </span>
              <span>
                {changeResultChar(stock.description)[2].toLowerCase()}
              </span>
            </span>
          ) : (
            stock.description.toLowerCase()
          )}
        </li>
      </ul>
    </div>
  );
};

export default ResultList;
