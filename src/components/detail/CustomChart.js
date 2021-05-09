import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import colors from '../../helpers/colors';
import axios from '../../app/axios';
import { formatDollar } from '../../helpers/currency';

export default function CustomChart({ coinId, days }) {
  const ref = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    axios
      .get(`/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`)
      .then((res) => {
        const response = res.data;
        const labels = [];
        const prices = [];
        response.forEach((el) => {
          labels.push('');
          const date = new Date(el[0]);
          prices.push({
            x: date,
            y: el[4],
          });
        });

        const data = {
          labels,
          datasets: [
            {
              label: 'Price',
              data: prices,
              borderColor: colors.blue,
              backgroundColor: colors.blue,
            },
          ],
        };

        if (chart) {
          chart.config.data = data;
          chart.update();
        } else {
          const ctx = ref.current.getContext('2d');
          const config = {
            type: 'line',
            data: data,
            options: {
              responsive: true,
              interaction: {
                intersect: false,
                mode: 'index',
              },
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  mode: 'index',
                  callbacks: {
                    title: function (tooltipItems) {
                      const date = tooltipItems[0].raw.x;
                      return `${date.toDateString()}, ${date.toLocaleTimeString()}`;
                    },
                    label: function (tooltipItem) {
                      return 'Price: ' + formatDollar(tooltipItem.parsed.y);
                    },
                  },
                },
              },
              scales: {
                xAxes: [
                  {
                    ticks: {
                      display: false,
                    },
                  },
                ],
                y: {
                  ticks: {
                    // Include a dollar sign in the ticks
                    callback: function (value, index, values) {
                      return formatDollar(value, false);
                    },
                  },
                },
              },
            },
          };

          setChart(new Chart(ctx, config));
        }
      })
      .catch((e) => console.error(e));
  }, [days, chart, coinId]);

  return (
    <>
      {/* loading spinner */}
      {chart === null ? (
        <div className="d-flex justify-content-center">
          <div
            className="spinner-border"
            style={{ width: '3rem', height: '3rem' }}
            role="status"
          >
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      ) : null}

      <div>
        <canvas id="chart" ref={ref}></canvas>
      </div>
    </>
  );
}
