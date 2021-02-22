import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareService} from '../service/share.service';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../enviroments/environment';
import {IStrategy} from '../entities/IStrategy';
import {GetStrategyInformationService} from '../service/getStrategyInformation.service';

@Component({
  selector: 'app-strategy-block',
  templateUrl: './strategy-block.component.html',
  styleUrls: ['./strategy-block.component.css']
})
export class StrategyBlockComponent implements OnInit {

  public strategyList: IStrategy[];
  public tacticName;
  isHidden = true;

  constructor(private router: ActivatedRoute, private share: ShareService,
              private http: HttpClient, private service: GetStrategyInformationService) {
    this.router = router;
    this.http = http;
    this.service = service;

    this.share.onClick.subscribe(cnt => {
      this.tacticName = cnt;
      this.loadStrategyList(cnt);
    });
  }

  ngOnInit(): void {
  }

  private loadStrategyList(strategyName) {
    this.http.get(environment.devUrl + `/tactic/${strategyName}`).subscribe((res: IStrategy[]) => {
      this.strategyList = res;
    });
  }

  public getStrategyDetails(tactic: IStrategy) {
    this.service.getInfo(tactic);
  }

  public executeAll() {
    this.isHidden = false;
    const httpParams = new HttpParams().set('tacticId', this.tacticName);
    this.http.post(environment.devUrl + '/activate/tactic', httpParams).subscribe((res: string[]) => {
      this.isHidden = true;
      console.log(res);
    });
  }
}
