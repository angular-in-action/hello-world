/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, coreDirectives} from 'angular2/angular2';
import {formDirectives, Control, ControlGroup} from 'angular2/forms';

import {StocksService} from '../services/stocks';

@Component({
  selector: 'manage',
  viewInjector: [StocksService]
})
@View({
  directives: [coreDirectives, formDirectives],
  template: `
  <div class="demo-grid-1 mdl-grid">
    <div class="mdl-cell mdl-cell--4-col"></div>
    <div class="mdl-cell mdl-cell--4-col">
      <form [ng-form-model]="stockForm" style="margin-bottom: 5px;" (submit)="add()">
        <input ng-control="stock" class="mdl-textfield__input" type="text" placeholder="Add Stock" />
      </form>
      <table class="mdl-data-table mdl-data-table--selectable mdl-shadow--2dp" style="width: 100%;">
        <tbody>
          <tr *ng-for="#symbol of symbols">
            <td class="mdl-data-table__cell--non-numeric">{{symbol}}</td>
            <td style="padding-top: 6px;">
              <button class="mdl-button" (click)="remove(symbol)">Remove</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="mdl-cell mdl-cell--4-col"></div>
  </div>
`
})
export class Manage {
  symbols: Array<string>;
  service: StocksService;
  stockForm: ControlGroup;

  constructor(service: StocksService) {
    this.service = service;
    this.symbols = service.get();
    this.stockForm = new ControlGroup({
      stock: new Control('')
    });
  }

  add() {
    this.symbols.push(this.stockForm.value.stock.toUpperCase());
  }

  remove(symbol) {
    this.symbols = this.service.remove(symbol);
  }

}
