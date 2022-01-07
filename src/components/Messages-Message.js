const Message = ({ tradeMessage }) => {
  const dollarSymbol = `$`;

  return (
    <div>
      <p>
        {tradeMessage.buy ? "You bought" : "You sold"} {tradeMessage.quantity}{" "}
        {tradeMessage.quantity > 1 ? "shares" : "share"}
        {" of "}
        <span>{tradeMessage.symbol}</span>
        {" for "} {dollarSymbol + tradeMessage.cost}.
      </p>
    </div>
  );
};

export default Message;
