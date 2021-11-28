import FavStock from "./FavStock";

const FavList = () => {
  return (
    <div className="fav-list">
      <h4>Watching</h4>
      <hr />
      <div className="fav-items">
        <FavStock />
        <FavStock />
        <FavStock />
        <FavStock />
        <FavStock />
      </div>
    </div>
  );
};

export default FavList;
