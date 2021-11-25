const News = ({ datetime, id, headline, image, source, summary }) => {
  // convert unix timestamp to time
  function timeConverter(UNIX_timestamp) {
    let a = new Date(UNIX_timestamp * 1000);
    let months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    let year = a.getFullYear();
    let month = months[a.getMonth()];
    let date = a.getDate();
    let hour = a.getHours();
    let min = a.getMinutes();
    let sec = a.getSeconds();
    let time =
      month + " " + date + ", " + year + " | " + hour + ":" + min + ":" + sec;
    return time;
  }
  //   console.log(timeConverter(0));

  return (
    <div className="news-item">
      <div className="news-header">
        <h3>{headline}</h3>
        <p className="news-subheader">
          {source} | {timeConverter(datetime)}
        </p>
      </div>
      <img src={image} alt={headline} />
      <p className="news-summary">{summary}</p>
    </div>
  );
};

export default News;
