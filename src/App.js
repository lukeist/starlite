import Nav from "./components/Nav";
import Home from "./pages/Home";
import Stock from "./pages/Stock";
import "./styles/app.scss";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <Nav />
      {/* <button onClick={() => console.log(quoteData)}>clik</button> */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/stocks/:symbol" element={<Stock />} />
      </Routes>
    </div>
  );
}

export default App;
