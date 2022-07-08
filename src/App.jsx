import { Route, Routes } from "react-router-dom";

import Login from "./pages/Login";
import Home from "./pages/Home";
import Portfolio from "./pages/Portfolio";
import Transactions from "./pages/Transactions";
import AddTransaction from "./pages/AddTransaction";
import Searching from "./pages/Searching";
import Calculator from "./pages/Calculator";
import Wallets from "./pages/Wallets";
import AddWallet from "./pages/AddWallet";
import Fiat from "./pages/Fiat";
import AddFiat from "./pages/AddFiat";
import Favourites from "./pages/Favourites";
import PageNotFound from "./pages/PageNotFound";

function App() {
  return (
    <div className="container dark:bg-gray-900 dark:text-white min-h-screen pt-5 min-w-full">
      <Routes>
        <Route path="/" element={<Home />} exact></Route>
        <Route path="/addTransaction" element={<AddTransaction />}></Route>
        <Route path="/addWallet" element={<AddWallet />}></Route>
        <Route path="/search" element={<Searching />}></Route>
        <Route path="/calculator" element={<Calculator />}></Route>
        <Route path="/home" element={<Home />}></Route>
        <Route path="/portfolio" element={<Portfolio />}></Route>
        <Route path="/transactions" element={<Transactions />}></Route>
        <Route path="/wallets" element={<Wallets />}></Route>
        <Route path="/fiats" element={<Fiat />}></Route>
        <Route path="/addFiat" element={<AddFiat />}></Route>
        <Route path="/favourites" element={<Favourites />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="*" element={<PageNotFound />}></Route>
      </Routes>
    </div>
  );
}

export default App;
