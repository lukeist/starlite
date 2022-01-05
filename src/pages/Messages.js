import { useSelector } from "react-redux";

const Messages = () => {
  const { tradeMessages } = useSelector((state) => state.messages);
  const isBuying = tradeMessages.buy;
  const symbol = tradeMessages.symbol;
  const quantity = tradeMessages.quantity;
  const price = tradeMessages.price;
  const messageId = tradeMessages.id;
  return (
    <div className="home">
      {tradeMessages.map((tradeMessage) => (
        <div key={messageId} className="home-body">
          <div className="block-message">aaaaa</div>
          <h4>
            adsssssafsdfasdfsaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa
            {/* You've just bought {tradeMessages.quantity}{" "}
            {quantity > 1 ? "shares" : "share"} of {symbol}. */}
          </h4>
          <div>{tradeMessage.symbol}</div>
        </div>
      ))}
    </div>
  );
};

export default Messages;
