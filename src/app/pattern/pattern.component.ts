import { Component, OnInit } from '@angular/core';
import {IStrategy} from '../entities/IStrategy';
import {IPattern} from '../entities/IPattern';
import {HttpClient, HttpParams} from '@angular/common/http';
import {environment} from '../enviroments/environment';
import {ITactic} from '../entities/ITactic';
import {Router} from '@angular/router';

@Component({
  selector: 'app-pattern',
  templateUrl: './pattern.component.html',
  styleUrls: ['./pattern.component.css']
})
export class PatternComponent implements OnInit {
  public patternsList: IPattern[];
  public inputValue: string;
  isHidden = true;
  public tacticList: ITactic[];
  public tacticToSave: ITactic[];
  public patternName: string;

  constructor(private http: HttpClient, private router: Router) {
    this.http = http;
    this.loadPatternsList();
    this.tacticToSave = [];
    this.router = router;
  }

  ngOnInit(): void {
  }

  private loadPatternsList() {
    this.http.get(environment.devUrl + `/pattern/all`).subscribe((patterns: IPattern[]) => {
      this.patternsList = patterns;
    });
  }

  searchTactics() {
    this.isHidden = false;
    console.log(this.inputValue);
    this.http.get(environment.devUrl + `/tactic/search/${this.inputValue}`).subscribe((res: ITactic[]) => {
      this.isHidden = true;
      this.tacticList = res;
      console.log(this.tacticList);
    });
  }

  addToPattern(tactic: ITactic) {
    this.tacticToSave.push(tactic);
    console.log(this.tacticToSave);
  }

  createPattern() {
    const pattern: IPattern = {
      tacticNames: this.tacticToSave.map(ts => ts.tacticId),
      patternName: this.patternName
    };
    console.log(pattern);
    this.http.post(environment.devUrl + '/pattern/create', pattern).subscribe(res => {
      this.router.navigate(['/']);
    });
  }

}
