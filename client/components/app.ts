/// <reference path="../../typings/tsd.d.ts" />

import {Component, View, coreDirectives} from 'angular2/angular2';
import {RouteConfig, RouterOutlet, RouterLink, routerInjectables} from 'angular2/router';

import {Dashboard} from './dashboard';
import {Manage} from './manage';

@RouteConfig([
  {path: '/', as: 'dashboard', component: Dashboard},
  {path: '/manage', as: 'manage', component: Manage}
])

@Component({
  selector: 'app',
  viewInjector: [routerInjectables]
})
@View({
  directives: [coreDirectives, RouterOutlet, RouterLink],
  template: `
  <div class="mdl-layout mdl-js-layout mdl-layout--fixed-header">
    <header class="mdl-layout__header">
      <div class="mdl-layout__header-row">
        <span class="mdl-layout-title">Stock Tracker</span>
        <div class="mdl-layout-spacer"></div>
        <nav class="mdl-navigation mdl-layout--large-screen-only">
          <a class="mdl-navigation__link" [router-link]="['/dashboard']">Dashboard</a>
          <a class="mdl-navigation__link" [router-link]="['/manage']">Manage</a>
        </nav>
      </div>
    </header>
    <main class="mdl-layout__content" style="padding: 20px;">
      <router-outlet></router-outlet>
    </main>
  </div>
  `
})
export class App {
}
