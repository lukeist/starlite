import { useEffect, useState } from "react";
import Stock from "../components/Stock";
import News from "../components/News";
import Nav from "../components/Nav";
// redux
import { useDispatch, useSelector } from "react-redux";
import { stocksAction } from "../actions/stocksAction";
import { quoteData } from "../api";
import { newsAction } from "../actions/newsAction";
import { searchAction } from "../actions/searchAction";
import { symbolLookupData } from "../api";

const Home = () => {
  // FETCH STOCKS
  const dispatch = useDispatch();
  const [isDropdown, setIsDropdown] = useState(true);
  useEffect(() => {
    // dispatch(getQuote());
    dispatch(newsAction());
    dispatch(stocksAction("GME"));
    // dispatch(searchAction("GME"));
  }, [dispatch]);
  // get data back
  const { quote, companyNews } = useSelector((state) => state.stocks);
  const { general, crypto } = useSelector((state) => state.news);

  // exit search dropdown when click outside of it
  const exitSearchHandler = (e) => {
    const element = e.target;
    if (!element.classList.contains("search-dropdown")) {
      // document.body.style.overflow = "auto";
      setIsDropdown(false);
      console.log(isDropdown);
      console.log(element);
    }
  };

  return (
    <div onClick={exitSearchHandler} className="home">
      {/* <button onClick={() => console.log(symbolLookupData("gme"))}>test</button> */}
      {/* <button onClick={() => console.log(quoteData("GME"))}>test</button> */}
      <Nav isDropdown={isDropdown} setIsDropdown={setIsDropdown} />
      {/* <h1>{quote.c}</h1> */}
      <div className="news-container">
        {general.map((news) =>
          news.source === "Bloomberg" ? (
            //   || news.source === "MarketWatch"
            ""
          ) : (
            <News
              datetime={news.datetime}
              headline={news.headline}
              id={news.id}
              image={news.image}
              source={news.source}
              summary={news.summary}
              url={news.url}
              key={news.id}
            />
          )
        )}
      </div>
    </div>
  );
};

export default Home;
