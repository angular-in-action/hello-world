/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, coreDirectives, CSSClass} from 'angular2/angular2';

import {StockInterface} from '../services/stocks';

@Component({
  selector: 'summary',
  properties: ['stock: symbol']
})
@View({
  directives: [coreDirectives, CSSClass],
  template: `
<style>
  .stock-card.mdl-card {
    background: #333;
  }
  .stock-card.mdl-card.increase {
    background: #558B2F;
    color: #fff;
  }
  .stock-card.mdl-card.decrease {
    background: #C62828;
    color: #fff;
  }
</style>
<div class="mdl-card stock-card mdl-shadow--2dp" [class]="{increase: isPositive(), decrease: isNegative()}" style="width: 100%;">
  <span *ng-if="stock">
    <div class="mdl-card__title">
      <h4 style="color: #fff; margin: 0">
        {{stock.symbol.toUpperCase()}}<br />
        {{stock.lastTradePriceOnly | currency:'USD':true:'.2'}}<br />
        {{stock.change | currency:'USD':true:'.2'}} ({{stock.changeInPercent | percent}})
      </h4>
    </div>
  </span>
</div>
`
})
export class Summary {
  stock: StockInterface;

  isNegative() {
    if (!this.stock || this.stock.change >= 0) {
      return false;
    }

    return true;
  }

  isPositive() {
    if (!this.stock || this.stock.change <= 0) {
      return false;
    }

    return true;
  }
}
