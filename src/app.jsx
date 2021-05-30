import { BrowserRouter, Route, Switch } from "react-router-dom";
import styles from "./app.module.css";
import Login from "./components/login/login";
import Maker from "./components/maker/maker";

function App({ authService }) {
  // api key 가 유효하지 않다라는 오류가 발생해서 App에서 확인해보니... undefined였음 --> 원인은 .env가 최상위에 있지 않고 service폴더 하위에 있었음...
  console.debug("key :: ", process.env.REACT_APP_FIREBASE_API_KEY);
  return (
    <div className={styles.app}>
      {/* <BrowserRouter>
        <Switch>
          <Route exact path="/">
            <Login authService={authService} />
          </Route>
          <Route path="/maker">
            <Maker />
          </Route>
        </Switch>
      </BrowserRouter> */}
      <Login authService={authService} />
    </div>
  );
}

export default App;
