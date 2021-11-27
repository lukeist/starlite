import { useEffect } from "react";
import Stock from "../components/Stock";
import News from "../components/News";
import Nav from "../components/Nav";
// redux
import { useDispatch, useSelector } from "react-redux";
import { newsAction } from "../actions/newsAction";
import MainNews from "../components/MainNews";
import FavList from "../components/FavList";

const Home = () => {
  // FETCH STOCKS
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(newsAction());
  }, [dispatch]);
  // get data back from state
  const { stockActive } = useSelector((state) => state.stocks);
  const { general, crypto } = useSelector((state) => state.news);

  const generalWithoutBloomberg = general.filter(
    (key) => key.source !== "Bloomberg"
  );

  return (
    <div className="home">
      <Nav />
      <div className="home-body">
        <div className="news-body">
          {stockActive ? (
            <Stock />
          ) : (
            <div className="main-news">
              {generalWithoutBloomberg.slice(0, 1).map((mainnews) => (
                <MainNews key={mainnews.id} mainnews={mainnews} />
              ))}
            </div>
          )}
          <div></div>
          <div className="sub-news">
            <h3>Market News</h3>
            <hr />
            {generalWithoutBloomberg.slice(1, 7).map((news) => (
              <News key={news.id} news={news} />
            ))}
          </div>
        </div>
        <div className="fav-body">
          <FavList />
        </div>
      </div>
    </div>
  );
};

export default Home;
