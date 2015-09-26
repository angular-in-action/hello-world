/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, Directive, NgIf, NgFor} from 'angular2/angular2';

import {Summary} from './summary';
import {StocksService, StockInterface} from '../services/stocks';

@Component({
  selector: 'dashboard',
  viewBindings: [StocksService]
})
@View({
  directives: [NgIf, NgFor, Summary],
  template: `
    <div class="mdl-grid">
      <div class="mdl-cell mdl-cell--12-col" *ng-if="!stocks" style="text-align: center;">
        Loading
      </div>
      <div class="mdl-cell mdl-cell--3-col" *ng-for="#stock of stocks">
        <summary [symbol]="stock"></summary>
      </div>
    </div>
  `
})
export class Dashboard {
  stocks: Array<StockInterface>;
  symbols: Array<string>;

  constructor(service: StocksService) {
    this.symbols = service.get();

    service.load(this.symbols)
    .subscribe(stocks => this.stocks = stocks);
  }
}
