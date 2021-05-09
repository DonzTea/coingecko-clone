import axios from '../../app/axios';

export const fetchCoins = async () => {
  try {
    const response = await axios.get(
      '/coins/markets?vs_currency=usd&per_page=50&page=1&sparkline=false&price_change_percentage=1h%2C24h%2C7d',
    );

    const coins = [];

    for (let i = 0; i < response.data.length; i++) {
      const coin = response.data[i];
      const coinPercentage1h = parseFloat(
        coin.price_change_percentage_1h_in_currency.toFixed(1),
      );
      const coinPercentage24h = parseFloat(
        coin.price_change_percentage_24h_in_currency.toFixed(1),
      );
      const coinPercentage7d = parseFloat(
        coin.price_change_percentage_7d_in_currency.toFixed(1),
      );
      const coinIndex = coin.image.replace(
        'https://assets.coingecko.com/coins/images/',
        '',
      )[0];
      const coinChartImageUrl = `https://www.coingecko.com/coins/${coinIndex}/sparkline`;

      coins.push({
        id: coin.id,
        number: i + 1,
        isFavorite: false,
        name: coin.name,
        logo: coin.image.replace('large', 'small'),
        price: coin.current_price,
        percentage1h: coinPercentage1h,
        percentage24h: coinPercentage24h,
        percentage7d: coinPercentage7d,
        volume: coin.total_volume,
        marketCap: coin.market_cap,
        chartImageUrl: coinChartImageUrl,
        index: coin.symbol.toUpperCase(),
      });
    }

    return coins;
  } catch (error) {
    console.error(error);
  }
};
