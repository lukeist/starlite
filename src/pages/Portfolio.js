import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faEraser } from "@fortawesome/free-solid-svg-icons";
import {
  TableOfPositions,
  TableofPositionsHeader,
} from "../components/Portfolio-TableOfPositions";
import { useDispatch } from "react-redux";
import { getSampleAction } from "../store/actions/tradeAction";
import { tradeMessagesSampleAction } from "../store/actions/messagesAction";

const Portfolio = () => {
  const { buyingPower, positions } = useSelector((state) => state.portfolio);
  const dollarSymbol = `$`;
  const dispatch = useDispatch();
  const getSampleActionData = () => {
    dispatch(getSampleAction());
    dispatch(tradeMessagesSampleAction());
  };

  return (
    <div className="home">
      {/* {stockActive ? ( */}
      <div className="home-body">
        <div className="portfolio-body">
          <div className="header-sticky">
            <h1 className="header-title">My Porfolio</h1>
          </div>
          {positions.length > 0 ? (
            <div className="table-row">
              <TableofPositionsHeader />
              {positions.map((position) => (
                <TableOfPositions key={position.symbol} position={position} />
              ))}
            </div>
          ) : (
            <div className="header-subtitle">
              <h4>Your portfolio is empty. Go buy something awesome!</h4>
              <h4>
                Or get sample data:
                <span
                  onClick={getSampleActionData}
                  className="header-subtitle-button"
                >
                  click here
                </span>
              </h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
