import React, { useLayoutEffect, useState } from 'react';
import { useParams } from 'react-router';
import { Link } from 'react-router-dom';
import PageWrapper from '../hoc/PageWrapper';
import colors from '../helpers/colors';

import './Detail.scss';
import { useDispatch, useSelector } from 'react-redux';
import { selectCoins, toggleFavorite } from '../redux/reducers/coins';
import CustomChart from '../components/detail/CustomChart';
import FilterDuration from '../components/detail/FilterDuration';
import { selectExchangeRates } from '../redux/reducers/exchangeRates';

export default function Detail() {
  let { coin_id: coinId } = useParams();
  const coins = useSelector(selectCoins);
  const coin = coins.find((coin) => coin.id === coinId.replace('-', ''));

  const exchangeRates = useSelector(selectExchangeRates);
  const priceRate = exchangeRates[coin.index.toLowerCase()] || null;

  const [days, setDays] = useState(1); // 1 / 7 / 14 / 30 / 90 / 180 / 365

  const dispatch = useDispatch();

  useLayoutEffect(() => {
    document.title =
      'Bitcoin price, BTC price index, chart, and info | CoinGecko clone';
  }, []);

  return (
    <PageWrapper>
      <div id="detail">
        <div className="w-100 px-5">
          <div className="py-3">
            <Link to="/">
              <span style={{ color: colors.green }}>Coins</span>{' '}
            </Link>
            <span style={{ color: colors.green }}>{'>'}</span> {coinId}
          </div>

          <div className="d-flex justify-content-between mb-3">
            <span className="highlight">
              <img src={coin.logo} className="mr-2" />
              {coin.name} ({coin.index})
            </span>
            <span>
              <span className="highlight mr-2">{coin.price}</span>
              <span
                style={{
                  color: coin.percentage24h >= 0 ? colors.green : colors.red,
                }}
              >
                {coin.percentage24h}%
              </span>
            </span>
          </div>

          <div className="d-flex justify-content-between mb-5">
            <button
              className="btn border"
              onClick={() => dispatch(toggleFavorite(coin.id))}
            >
              <i
                className={`favorite ${
                  coin.isFavorite ? 'fas text-warning' : 'far'
                } fa-star`}
              ></i>
            </button>

            <span style={{ color: colors.grey }}>
              {priceRate ? 1 / priceRate : 'unknown'} BTC
            </span>
          </div>

          <FilterDuration days={days} setDays={setDays} />

          <CustomChart coinId={coin.id} days={days} />
        </div>
      </div>
    </PageWrapper>
  );
}
