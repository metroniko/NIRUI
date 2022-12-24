import { Component, OnInit } from '@angular/core';
import {environment} from '../enviroments/environment';
import {IPattern} from '../entities/IPattern';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';
import {IPatternResult} from '../entities/IPatternResult';

@Component({
  selector: 'app-all-patterns',
  templateUrl: './all-patterns.component.html',
  styleUrls: ['./all-patterns.component.css']
})
export class AllPatternsComponent implements OnInit {

  public patternsList: IPattern[];

  public isModelHidden = false;
  public isModelLoad = true;
  public countOfTechniques;
  public isHidden = true;
  public patternResult: IPatternResult[];
  public color: string;

  constructor(private http: HttpClient, private router: Router) {
    this.loadPatternsList();
    this.router = router;
    this.patternResult = [];
  }

  ngOnInit(): void {
  }

  private loadPatternsList() {
    this.http.get(environment.devUrl + `/pattern/all`).subscribe((patterns: IPattern[]) => {
      console.log('lofofoofof', patterns);
      this.patternsList = patterns;
    });
  }

  public executePattern(pattern: IPattern) {
    this.patternResult = [];
    this.isModelLoad = true;
    this.isModelHidden = true;
    this.isHidden = false;
    this.http.post(environment.devUrl + `/pattern/execute`,  pattern).subscribe((res: IPatternResult[]) => {
      console.log('Это вот 2', res);
      this.isHidden = true;
      this.isModelLoad = false;
      this.patternResult = res;
    });
  }

  getPatternDetails(pattern: IPattern) {

  }
}
