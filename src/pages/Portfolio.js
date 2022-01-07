import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faEraser } from "@fortawesome/free-solid-svg-icons";
import {
  TableOfPositions,
  TableofPositionsHeader,
} from "../components/Portfolio-TableOfPositions";

const Portfolio = () => {
  const { buyingPower, positions } = useSelector((state) => state.portfolio);
  const dollarSymbol = `$`;

  return (
    <div className="home">
      {/* {stockActive ? ( */}
      <div className="home-body">
        <div className="list-body">
          <div className="header-sticky">
            <h1 className="input-name">My Porfolio</h1>
          </div>
          {positions.length > 0 ? (
            <div className="table-row">
              <TableofPositionsHeader />
              {positions.map((stock) => (
                <TableOfPositions />
              ))}
            </div>
          ) : (
            <div>
              <h4> Your portfolio is empty. Go buy something awesome!</h4>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
