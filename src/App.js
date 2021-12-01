import Nav from "./components/Nav";
import Home from "./pages/Home";
import Stock from "./pages/Stock";
import Messages from "./pages/Messages";
import Portfolio from "./pages/Portfolio";
import Account from "./pages/Account";
import "./styles/app.scss";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      {/* <button onClick={() => console.log(quoteData)}>clik</button> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/messages" element={<Messages />} />
        <Route path="/portfolio" element={<Portfolio />} />
        <Route path="/account" element={<Account />} />
        <Route path="/stocks/:symbol" element={<Stock />} />
      </Routes>
    </div>
  );
}

export default App;
