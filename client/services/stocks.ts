/// <reference path="../../typings/tsd.d.ts"/>

let stocks: Array<string> = ['AAPL', 'GOOG', 'FB', 'AMZN', 'TWTR'];

export interface StockInterface {
  symbol: string,
  lastTradePriceOnly: number,
  change: number,
  changeInPercent: number
}

export class StocksService {

  get() {
    return stocks;
  }

  add(stock) {
    stocks.push(stock);
    return this.get();
  }

  remove(stock) {
    stocks.splice(stocks.indexOf(stock), 1);
    return this.get();
  }
}
