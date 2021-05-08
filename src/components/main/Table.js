import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { selectCoins, toggleFavorite } from '../../redux/reducers/coins';
import { selectActiveFilter } from '../../redux/reducers/filters';
import colors from '../../helpers/colors';

import './Table.scss';

export default function Table() {
  let coins = useSelector(selectCoins);
  const activeFilter = useSelector(selectActiveFilter);

  if (activeFilter === 'favorited')
    coins = coins.filter((coin) => coin.isFavorite);

  const dispatch = useDispatch();

  return (
    <div id="table" className="table-responsive">
      <table className="table">
        <thead>
          <tr>
            <td></td>
            <td className="sortable-column">
              <div className="d-flex justify-content-between">
                <span className="header">#</span>
                <i className="arrow fas fa-sort-down" />
              </div>
            </td>
            <td className="sortable-column">
              <div className="d-flex justify-content-between">
                <span className="header">Coin</span>
                <i className="arrow fas fa-sort-down" />
              </div>
            </td>
            <td className="sortable-column">
              <div className="d-flex justify-content-end">
                <span className="header mr-1">Price</span>
                <i className="arrow fas fa-sort-down" />
              </div>
            </td>
            <td className="sortable-column">
              <div className="d-flex justify-content-end">
                <span className="header mr-1">1h</span>
                <i className="arrow fas fa-sort-down" />
              </div>
            </td>
            <td className="sortable-column">
              <div className="d-flex justify-content-end">
                <span className="header mr-1">24h</span>
                <i className="arrow fas fa-sort-down" />
              </div>
            </td>
            <td className="sortable-column">
              <div className="d-flex justify-content-end">
                <span className="header mr-1">7d</span>
                <i className="arrow fas fa-sort-down" />
              </div>
            </td>
            <td className="sortable-column">
              <div className="d-flex justify-content-end">
                <span className="header mr-1">24h Volume</span>
                <i className="arrow fas fa-sort-down" />
              </div>
            </td>
            <td className="sortable-column">
              <div className="d-flex justify-content-end">
                <span className="header mr-1">Mkt Cap</span>
                <i className="arrow fas fa-sort-down" />
              </div>
            </td>
            <td className="header text-center">Last 7 Days</td>
          </tr>
        </thead>
        <tbody>
          {coins.length === 0 ? (
            <tr key="default">
              <td className="text-center" colSpan="10">
                No Data
              </td>
            </tr>
          ) : (
            coins.map((coin, i) => (
              <tr key={coin.id}>
                <td className="text-center">
                  <i
                    className={`favorite ${
                      coin.isFavorite ? 'fas text-warning' : 'far'
                    } fa-star`}
                    onClick={() => dispatch(toggleFavorite(coin.id))}
                  ></i>
                </td>
                <td className="text-center">{i + 1}</td>
                <td>
                  <img src={coin.logo} width="18px" alt="" />{' '}
                  <Link to={`/coins/${coin.id}`}>
                    <b>{coin.name}</b>
                  </Link>
                </td>
                <td className="text-right">{coin.price}</td>
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
                <td className="text-right">{coin.volume}</td>
                <td className="text-right">{coin.marketCap}</td>
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
