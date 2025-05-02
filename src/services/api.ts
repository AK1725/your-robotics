
import axios from "axios";

const api = axios.create({
  baseURL: "",               // we rely on the Vite proxy
  headers: { "Content-Type": "application/json" }
});

// Currency conversion utility (1 USD to Bangladeshi Taka - approximately 110 BDT)
export const convertToTaka = (usdPrice: number): number => {
  const exchangeRate = 110; // USD to BDT exchange rate
  return parseFloat((usdPrice * exchangeRate).toFixed(2));
};

// Format price with currency symbol
export const formatPrice = (price: number, currency: string = "৳"): string => {
  return `${currency}${price.toLocaleString()}`;
};

export default api;
