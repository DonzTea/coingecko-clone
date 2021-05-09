import axios from '../../app/axios';

export default async function fetchGlobals() {
  try {
    const [globals, exchanges, ethGas] = await Promise.all([
      axios.get('/global').then((res) => {
        const coins = res.data.data.active_cryptocurrencies;
        const marketCap = Math.round(res.data.data.total_market_cap.usd);
        const marketCapPercentage = parseFloat(
          res.data.data.market_cap_change_percentage_24h_usd.toFixed(2),
        );
        const vol24h = Math.round(res.data.data.total_volume.usd);
        const btcDominance = parseFloat(
          res.data.data.market_cap_percentage.btc.toFixed(1),
        );
        const ethDominance = parseFloat(
          res.data.data.market_cap_percentage.eth.toFixed(1),
        );

        return {
          coins,
          marketCap,
          marketCapPercentage,
          vol24h,
          btcDominance,
          ethDominance,
        };
      }),
      axios.get('/exchanges/list').then((res) => res.data.length),
      axios
        .get('/simple/price?ids=gas&vs_currencies=eth')
        .then((res) => Math.trunc(res.data.gas.eth * 10000)),
    ]);

    return { ...globals, exchanges, ethGas };
  } catch (error) {
    console.error(error);
  }
}
