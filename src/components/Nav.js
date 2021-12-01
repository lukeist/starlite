import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { searchAction } from "../actions/searchAction";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMoon } from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import NavSearchResult from "./NavSearchResult";

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

  const EscClose = (e) => {
    if (e.keyCode == 27) {
      setIsSearching(false);
    }
  };
  return (
    <nav className="nav">
      <Link className="logo" id="logo" to="/">
        Starlite
      </Link>

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
            onKeyDown={
              (e) =>
                e.key === 27 ? setIsSearching(true) : setIsSearching(false) // Press ESC to hide DropDown
            }
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
                <p>Loading results...</p> // If input = 'dkfasdfasdfasdf' => show 'no match found' /////// deal with this later
              ) : (
                <div className="search-result">
                  {searchResultTop6.map((stock) => (
                    <NavSearchResult
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
          <Link className="nav-portfolio" id="portfolio" to="/portfolio">
            Portfolio
          </Link>
        </li>
        <li>
          <Link className="nav-messages" id="portfolio" to="/messages">
            Messages
          </Link>
        </li>
        <li>
          <Link className="nav-account" id="portfolio" to="/account">
            Account
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Nav;
