import axios from '../../app/axios';

export const fetchExchangeRates = async () => {
  try {
    const response = await axios.get('/exchange_rates');
    const coins = Object.keys(response.data.rates);

    const exchangeRates = {};
    coins.forEach((coin) => {
      exchangeRates[coin] = response.data.rates[coin].value;
    });

    return exchangeRates;
  } catch (error) {
    console.error(error);
  }
};
