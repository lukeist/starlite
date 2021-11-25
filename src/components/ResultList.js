const ResultList = ({ item, searchInputUpperCase }) => {
  const changeResultChar = (terms) => {
    /////////////////////////////////////////////////// change the color of search result's string followed input (like search on Robinhood):
    ////////////////////// cut the string into an array with 3 items: [head string, searchInput, tail string]
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
  return (
    <ul className="search-list">
      <li className="symbol-result">
        {item.symbol.indexOf(searchInputUpperCase) > -1 ? (
          <span>
            <span>{changeResultChar(item.symbol)[0].toLowerCase()}</span>
            <span className="highlight-input">
              {changeResultChar(item.symbol)[1].toLowerCase()}
            </span>
            <span>{changeResultChar(item.symbol)[2].toLowerCase()}</span>
          </span>
        ) : (
          item.symbol
        )}
      </li>
      <li className="description-result">
        {item.description.indexOf(searchInputUpperCase) > -1 ? (
          <span>
            <span>{changeResultChar(item.description)[0].toLowerCase()}</span>
            <span className="highlight-input">
              {changeResultChar(item.description)[1].toLowerCase()}
            </span>
            <span>{changeResultChar(item.description)[2].toLowerCase()}</span>
          </span>
        ) : (
          item.description.toLowerCase()
        )}
      </li>
    </ul>
  );
};

export default ResultList;
