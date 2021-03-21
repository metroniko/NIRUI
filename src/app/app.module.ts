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
import { PatternBlockComponent } from './pattern-block/pattern-block.component';
import { AppTabsPatternComponent } from './app-tabs-pattern/app-tabs-pattern.component';
import { PatternComponent } from './pattern/pattern.component';
import {FormsModule} from '@angular/forms';
import { AllPatternsComponent } from './all-patterns/all-patterns.component';

const appRoutes: Routes = [{path: 'strategy/:tacticId', component: StrategyBlockComponent},
  {path: 'createPatterns', component: PatternComponent},
  {path: 'patterns', component: AllPatternsComponent}];

@NgModule({
  declarations: [
    AppComponent,
    TabsComponent,
    StrategyBlockComponent,
    TacticDescriptionComponent,
    PatternBlockComponent,
    AppTabsPatternComponent,
    PatternComponent,
    AllPatternsComponent
  ],
    imports: [
        BrowserModule,
        NgbModule,
        NgbPaginationModule,
        RouterModule.forRoot(appRoutes),
        NgbAlertModule,
        HttpClientModule,
        FormsModule
    ],
  providers: [ShareService,
    GetStrategyInformationService],
  bootstrap: [AppComponent]
})

export class AppModule {
}
