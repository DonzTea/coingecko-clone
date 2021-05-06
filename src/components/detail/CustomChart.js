import React, { useEffect, useRef, useState } from 'react';
import Chart from 'chart.js/auto';
import colors from '../../helpers/colors';
import axios from '../../app/axios';

export default function CustomChart({ coinId, days }) {
  const ref = useRef(null);
  const [chart, setChart] = useState(null);

  useEffect(() => {
    axios
      .get(`/coins/${coinId}/ohlc?vs_currency=usd&days=${days}`)
      .then((res) => {
        const result = res.data.map((el) => el.pop());

        const data = {
          labels: result.map(() => ''),
          datasets: [
            {
              label: 'price',
              data: result,
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
              plugins: {
                legend: {
                  display: false,
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
              },
            },
          };

          setChart(new Chart(ctx, config));
        }
      })
      .catch((e) => console.error(e));
  }, [days]);

  return (
    <div>
      <canvas id="chart" ref={ref}></canvas>
    </div>
  );
}
