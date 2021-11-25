import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { resultSymbolLookupData } from "../api";
import { searchAction } from "../actions/searchAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import ResultList from "./ResultList";

const Nav = () => {
  const [isSearching, setIsSearching] = useState(false);
  const [searchInput, setSearchInput] = useState("");
  const [indexInput, setIndexInput] = useState("");
  // const [resultSymbol, setResultSymbol] = useState([]);
  // const [resultDescription, setResultDescription] = useState([]);
  const [searchResultTop6, setSearchResultTop6] = useState([]);
  const searchInputUpperCase = searchInput.toUpperCase();

  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.search.result);

  /////////////////////////////////////////////////// when there is searchResult => useEffect to create arrays
  useEffect(() => {
    if (typeof searchResult === "undefined" || searchResult.length === 0) {
      // when "afdasfdsfasfdasdfasdf" in input or when there's nothing in input:
      // setResultSymbol([]);
      // setResultDescription([]);
      setSearchResultTop6([]);
    } else {
      // when there are matches from input to data:
      setSearchResultTop6([
        searchResult[0],
        searchResult[1],
        searchResult[2],
        searchResult[3],
        searchResult[4],
        searchResult[5],
      ]);

      //for method 1 - not working with highlights

      // setResultSymbol([
      //   searchResult[0].symbol,
      //   searchResult[1].symbol,
      //   searchResult[2].symbol,
      //   searchResult[3].symbol,
      //   searchResult[4].symbol,
      //   searchResult[5].symbol,
      // ]);
      // setResultDescription([
      //   searchResult[0].description,
      //   searchResult[1].description,
      //   searchResult[2].description,
      //   searchResult[3].description,
      //   searchResult[4].description,
      //   searchResult[5].description,
      // ]);
    }
  }, [searchResult]);

  const getInput = (e) => {
    // console.log(resultSymbolLookupData(e.target.value));
    setSearchInput(e.target.value);
    dispatch(searchAction(e.target.value));
    if (e.target.value !== "") {
      setIsSearching(true);
    } else {
      setIsSearching(false);
    }
  };

  return (
    <nav className="nav">
      <h2 className="logo">starlite</h2>
      <button onClick={() => console.log(searchResultTop6)}>aaaaa</button>{" "}
      <div className="search-field">
        <div className="search-bar">
          <FontAwesomeIcon className="search-icon" icon={faMoon} />
          <input
            className={isSearching ? "search-input inactive" : "search-input"}
            placeholder="Search"
            onChange={getInput}
            type="text"
          />
          {isSearching ? (
            <div className="search-dropdown">
              <h4>Stocks</h4>
              {typeof searchResult === "undefined" ||
              searchResult.length === 0 ? (
                <p>Loading results...</p>
              ) : (
                <div className="search-result">
                  {/* Method 1 - doesn't work with highlights when hover over stocks*/}
                  {/* <ul className="symbol-result">
                    {resultSymbol.map((item) =>
                      item.indexOf(searchInputUpperCase) > -1 ? (
                        <ResultList
                          item={item}
                          key={item.symbol}
                          searchInput={searchInput}
                        />
                      ) : (
                        <li>{item.toLowerCase()}</li>
                      )
                    )}
                  </ul>
                  <ul className="description-result">
                    {resultDescription.map((item) =>
                      item.indexOf(searchInputUpperCase) > -1 ? (
                        <ResultList
                          item={item}
                          key={item.description}
                          searchInput={searchInput}
                        />
                      ) : (
                        <li>{item.toLowerCase()}</li>
                      )
                    )}
                  </ul> */}

                  {/* Method 2 */}
                  {searchResultTop6.map((item) => (
                    <ResultList
                      item={item}
                      key={item.symbol}
                      searchInputUpperCase={searchInputUpperCase}
                    />
                  ))}
                </div>
              )}
            </div>
          ) : (
            ""
          )}
        </div>
      </div>
      <ul className="menu-items">
        <li>
          <a href="#">Portfolio</a>
        </li>
        <li>
          <a href="#">Messages</a>
        </li>
        <li>
          <a href="#">Account</a>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
