import {Component, OnInit} from '@angular/core';
import {GetStrategyInformationService} from '../service/getStrategyInformation.service';
import {IStrategy} from '../entities/IStrategy';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../enviroments/environment';

@Component({
  selector: 'app-tactic-description',
  templateUrl: './tactic-description.component.html',
  styleUrls: ['./tactic-description.component.css']
})
export class TacticDescriptionComponent implements OnInit {

  strategy: IStrategy;
  isHidden = true;

  constructor(private share: GetStrategyInformationService, private http: HttpClient ) {
    this.share = share;
    this.http = http;

    this.share.onClick.subscribe((cnt: IStrategy) => {
      this.strategy = cnt;
      this.isHidden = false;
    });
  }

  ngOnInit(): void {
  }

  public executeTest() {
    const httpParams = new HttpParams().set('strategyId', this.strategy.techniqueNumber);
    this.http.post(environment.devUrl + '/activate', httpParams).subscribe(res => {
      console.log(res);
    });
  }

}
