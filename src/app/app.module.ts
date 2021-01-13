import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppComponent} from './app.component';
import {TabsComponent} from './tabs/tabs.component';
import {NgbAlertModule, NgbModule, NgbPaginationModule} from '@ng-bootstrap/ng-bootstrap';
import {HttpClientModule} from '@angular/common/http';
import {StrategyBlockComponent} from './strategy-block/strategy-block.component';
import {TacticDescriptionComponent} from './tactic-description/tactic-description.component';
import {RouterModule, Routes} from '@angular/router';
import {ShareService} from './service/share.service';
import {GetStrategyInformationService} from './service/getStrategyInformation.service';

const appRoutes: Routes = [{path: 'strategy/:tacticId', component: StrategyBlockComponent}];

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    StrategyBlockComponent,
    TacticDescriptionComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    NgbPaginationModule,
    RouterModule.forRoot(appRoutes),
    NgbAlertModule,
    HttpClientModule
  ],
  providers: [ShareService,
    GetStrategyInformationService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
