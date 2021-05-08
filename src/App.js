import React, { useLayoutEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import 'jquery/dist/jquery.min.js';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';

import Main from './pages/Main';
import { fetchGlobalsThunk } from './redux/reducers/globals';
import { fetchCoinsThunk } from './redux/reducers/coins';
import { fetchExchangeRatesThunk } from './redux/reducers/exchangeRates';
import Detail from './pages/Detail';

function App() {
  const [globalsFetched, setGlobalsFetched] = useState(false);
  const [coinsFetched, setCoinsFetched] = useState(false);
  const [exchangeRatesFetched, setExchangeRatesFetched] = useState(false);
  const dispatch = useDispatch();

  useLayoutEffect(() => {
    if (!globalsFetched) {
      dispatch(fetchGlobalsThunk());
      setGlobalsFetched(true);
    }

    if (!coinsFetched) {
      dispatch(fetchCoinsThunk());
      setCoinsFetched(true);
    }

    if (!exchangeRatesFetched) {
      dispatch(fetchExchangeRatesThunk());
      setExchangeRatesFetched(true);
    }
  }, [globalsFetched, coinsFetched, exchangeRatesFetched, dispatch]);

  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <Main />
        </Route>
        <Route path="/coins/:coin_id">
          <Detail />
        </Route>
        <Route path="/*">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
