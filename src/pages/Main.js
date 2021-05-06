import React, { useLayoutEffect } from 'react';
import PageWrapper from '../hoc/PageWrapper';
import FilterButtons from '../components/main/FilterButtons';
import Table from '../components/main/Table';

import './Main.scss';

export default function Main() {
  useLayoutEffect(() => {
    document.title =
      'CoinGecko Clone: Cryptocurrency Prices and Market Capitalization';
  }, []);

  return (
    <PageWrapper>
      <div id="main">
        <div className="text-center pt-5 pb-3 title">
          Cryptocurrency Prices by Market Cap
        </div>
        <div className="w-100 px-5">
          <FilterButtons />
          <Table />
        </div>
      </div>
    </PageWrapper>
  );
}
