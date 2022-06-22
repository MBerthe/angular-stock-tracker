export interface StockQuote {
  stockName: string;
  symbol: string;
  currentPrice: number;
  percentChange: number;
  highPriceOfTheDay: number;
  openPriceOfTheDay: number;
}
