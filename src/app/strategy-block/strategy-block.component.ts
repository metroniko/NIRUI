import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {ShareService} from '../service/share.service';
import {HttpClient} from '@angular/common/http';
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

  constructor(private router: ActivatedRoute, private share: ShareService,
              private http: HttpClient, private service: GetStrategyInformationService) {
    this.router = router;
    this.http = http;
    this.service = service;

    this.share.onClick.subscribe(cnt => {
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
}
