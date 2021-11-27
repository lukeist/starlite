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
  const [searchResultTop6, setSearchResultTop6] = useState([]);
  const searchInputUpperCase = searchInput.toUpperCase();

  const dispatch = useDispatch();
  const searchResult = useSelector((state) => state.search.result);

  /////////////////////////////////////////////////// when there is searchResult => useEffect to create arrays
  useEffect(() => {
    if (typeof searchResult === "undefined" || searchResult.length === 0) {
      // when "afdasfdsfasfdasdfasdf" in input or when there's nothing in input:

      setSearchResultTop6([]);
    } else {
      // when there are matches from input to data:
      setSearchResultTop6(searchResult.slice(0, 6));
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
      {/* <button onClick={() => console.log(searchResult.slice(0, 6))}>
        aaaaa
      </button> */}
      <div className="search-field">
        <div className="search-bar">
          <FontAwesomeIcon className="search-icon" icon={faMoon} />
          <input
            className={isSearching ? "search-input inactive" : "search-input"}
            placeholder="Search"
            onChange={getInput}
            type="text"
            onBlur={() => setIsSearching(false)}
            // if string.length in input > -1 when click on input => show dropdown
            onClick={(e) =>
              // console.log(e.target.value.length)
              e.target.value.length < 1
                ? setIsSearching(false)
                : setIsSearching(true)
            }
          />
          {isSearching ? (
            <div className="search-dropdown">
              <h4>Stocks</h4>
              {typeof searchResult === "undefined" ||
              searchResult.length === 0 ? (
                <p>Loading results...</p>
              ) : (
                <div className="search-result">
                  {searchResultTop6.map((stock) => (
                    <ResultList
                      stock={stock}
                      key={stock.symbol}
                      searchInputUpperCase={searchInputUpperCase}
                      setIsSearching={setIsSearching}
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
          <a onClick={(e) => console.log(e.target)} href="#">
            Portfolio
          </a>
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
