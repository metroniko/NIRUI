import {Component, OnInit} from '@angular/core';
import {ITactic} from '../entities/ITactic';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../enviroments/environment';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  constructor(private http: HttpClient) {
    this.http = http;
  }

  listOfTactics: ITactic[];


  ngOnInit(): void {
    console.log(environment.devUrl);
    this.http.get(environment.devUrl + '/tactic').subscribe((res: ITactic[]) => {
      this.listOfTactics = res;
    });
  }

}
