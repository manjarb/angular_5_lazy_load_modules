import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {PreloadAllModules, PreloadingStrategy, RouterModule, Routes, Route} from '@angular/router';
import { HttpModule } from '@angular/http';

import { MailModule } from './mail/mail.module';
import { AuthModule } from './auth/auth.module'

import { AppComponent } from './app.component';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/observable/of'
import {AuthGuard} from "./auth/auth.guard";

export class CustomPreload implements PreloadingStrategy {
  preload(route: Route, fn: () => Observable<any>): Observable<any> {
    return route.data && route.data.preload ? fn() : Observable.of(null)
  }
}

export const ROUTES: Routes = [
  { path: 'dashboard', canLoad: [AuthGuard], data: { preload: true } ,loadChildren: './dashboard/dashboard.module#DashboardModule' },
  { path: '**', redirectTo: 'mail/folder/inbox' }
];

@NgModule({
  declarations: [
    AppComponent
  ],
  providers: [
    CustomPreload
  ],
  imports: [
    BrowserModule,
    HttpModule,
    MailModule,
    AuthModule,
    RouterModule.forRoot(ROUTES, { preloadingStrategy: CustomPreload })
    /*RouterModule.forRoot(ROUTES, { preloadingStrategy: PreloadAllModules })*/
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule {}
