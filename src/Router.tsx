import { BrowserRouter, Switch, Route } from "react-router-dom";
import Coin from "./routes/Coin";
import Coins from "./routes/Coins";

interface IRouterProps {}

function Router() {
  return (
    <BrowserRouter>
      <Switch>
        <Route path="/Crypto-Tracker/:coinId">
          <Coin />
        </Route>
        <Route path="/Crypto-Tracker">
          <Coins />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}
export default Router;
