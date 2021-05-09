import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  selectCoins,
  toggleFavorite,
  sortCoinBy,
  selectActiveSort,
} from '../../redux/reducers/coins';
import { selectActiveFilter } from '../../redux/reducers/filters';
import { formatDollar } from '../../helpers/currency';
import colors from '../../helpers/colors';

import './Table.scss';

export default function Table() {
  let coins = useSelector(selectCoins);
  const activeFilter = useSelector(selectActiveFilter);
  if (activeFilter === 'favorited')
    coins = [...coins].filter((coin) => coin.isFavorite);

  const activeSort = useSelector(selectActiveSort);

  const dispatch = useDispatch();

  return (
    <div id="table" className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <td></td>
            <td
              className="sortable-column"
              onClick={() => dispatch(sortCoinBy('number'))}
            >
              <div className="d-flex justify-content-between align-items-end">
                <span className="header">#</span>
                <i
                  className={`arrow fas fa-caret-down ${
                    activeSort.order === 'desc' && activeSort.key === 'number'
                      ? 'fa-caret-up'
                      : ''
                  } ${activeSort.key === 'number' ? 'text-dark' : ''}`}
                />
              </div>
            </td>
            <td
              className="sortable-column"
              onClick={() => dispatch(sortCoinBy('name'))}
            >
              <div className="d-flex justify-content-between align-items-end">
                <span className="header">Coin</span>
                <i
                  className={`arrow fas fa-caret-down ${
                    activeSort.order === 'desc' && activeSort.key === 'name'
                      ? 'fa-caret-up'
                      : ''
                  } ${activeSort.key === 'name' ? 'text-dark' : ''}`}
                />
              </div>
            </td>
            <td
              className="sortable-column"
              onClick={() => dispatch(sortCoinBy('price'))}
            >
              <div className="d-flex justify-content-end align-items-end">
                <span className="header mr-1">Price</span>
                <i
                  className={`arrow fas fa-caret-down ${
                    activeSort.order === 'desc' && activeSort.key === 'price'
                      ? 'fa-caret-up'
                      : ''
                  } ${activeSort.key === 'price' ? 'text-dark' : ''}`}
                />
              </div>
            </td>
            <td
              className="sortable-column"
              onClick={() => dispatch(sortCoinBy('percentage1h'))}
            >
              <div className="d-flex justify-content-end align-items-end">
                <span className="header mr-1">1h</span>
                <i
                  className={`arrow fas fa-caret-down ${
                    activeSort.order === 'desc' &&
                    activeSort.key === 'percentage1h'
                      ? 'fa-caret-up'
                      : ''
                  } ${activeSort.key === 'percentage1h' ? 'text-dark' : ''}`}
                />
              </div>
            </td>
            <td
              className="sortable-column"
              onClick={() => dispatch(sortCoinBy('percentage24h'))}
            >
              <div className="d-flex justify-content-end align-items-end">
                <span className="header mr-1">24h</span>
                <i
                  className={`arrow fas fa-caret-down ${
                    activeSort.order === 'desc' &&
                    activeSort.key === 'percentage24h'
                      ? 'fa-caret-up'
                      : ''
                  } ${activeSort.key === 'percentage24h' ? 'text-dark' : ''}`}
                />
              </div>
            </td>
            <td
              className="sortable-column"
              onClick={() => dispatch(sortCoinBy('percentage7d'))}
            >
              <div className="d-flex justify-content-end align-items-end">
                <span className="header mr-1">7d</span>
                <i
                  className={`arrow fas fa-caret-down ${
                    activeSort.order === 'desc' &&
                    activeSort.key === 'percentage7d'
                      ? 'fa-caret-up'
                      : ''
                  } ${activeSort.key === 'percentage7d' ? 'text-dark' : ''}`}
                />
              </div>
            </td>
            <td
              className="sortable-column"
              onClick={() => dispatch(sortCoinBy('volume'))}
            >
              <div className="d-flex justify-content-end align-items-end">
                <span className="header mr-1">24h Volume</span>
                <i
                  className={`arrow fas fa-caret-down ${
                    activeSort.order === 'desc' && activeSort.key === 'volume'
                      ? 'fa-caret-up'
                      : ''
                  } ${activeSort.key === 'volume' ? 'text-dark' : ''}`}
                />
              </div>
            </td>
            <td
              className="sortable-column"
              onClick={() => dispatch(sortCoinBy('marketCap'))}
            >
              <div className="d-flex justify-content-end align-items-end">
                <span className="header mr-1">Mkt Cap</span>
                <i
                  className={`arrow fas fa-caret-down ${
                    activeSort.order === 'desc' &&
                    activeSort.key === 'marketCap'
                      ? 'fa-caret-up'
                      : ''
                  } ${activeSort.key === 'marketCap' ? 'text-dark' : ''}`}
                />
              </div>
            </td>
            <td className="header text-center">Last 7 Days</td>
          </tr>
        </thead>
        <tbody>
          {[...coins].length === 0 ? (
            <tr key="default">
              <td className="text-center" colSpan="10">
                No Data
              </td>
            </tr>
          ) : (
            [...coins].map((coin, i) => (
              <tr key={coin.id}>
                <td className="text-center">
                  <i
                    className={`favorite ${
                      coin.isFavorite ? 'fas text-warning' : 'far'
                    } fa-star`}
                    onClick={() => dispatch(toggleFavorite(coin.id))}
                  ></i>
                </td>
                <td className="text-center">{coin.number}</td>
                <td>
                  <img src={coin.logo} width="18px" alt="" />{' '}
                  <Link to={`/coins/${coin.id}`}>
                    <b>{coin.name}</b>
                  </Link>
                </td>
                <td className="text-right">{formatDollar(coin.price)}</td>
                <td
                  className="text-right"
                  style={{
                    color: coin.percentage1h >= 0 ? colors.green : colors.red,
                  }}
                >
                  {coin.percentage1h}%
                </td>
                <td
                  className="text-right"
                  style={{
                    color: coin.percentage24h >= 0 ? colors.green : colors.red,
                  }}
                >
                  {coin.percentage24h}%
                </td>
                <td
                  className="text-right"
                  style={{
                    color: coin.percentage7d >= 0 ? colors.green : colors.red,
                  }}
                >
                  {coin.percentage7d}%
                </td>
                <td className="text-right">
                  {formatDollar(coin.volume, false)}
                </td>
                <td className="text-right">
                  {formatDollar(coin.marketCap, false)}
                </td>
                <td className="text-center">
                  <img src={coin.chartImageUrl} alt="" />
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
