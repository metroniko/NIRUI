import {Component, OnInit} from '@angular/core';
import {ITactic} from '../entities/ITactic';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {environment} from '../enviroments/environment';
import {Router} from '@angular/router';
import {ShareService} from '../service/share.service';


@Component({
  selector: 'app-tabs',
  templateUrl: './tabs.component.html',
  styleUrls: ['./tabs.component.css']
})
export class TabsComponent implements OnInit {

  constructor(private http: HttpClient, private shared: ShareService) {
    this.http = http;
  }

  listOfTactics: ITactic[];


  ngOnInit(): void {
    console.log(environment.devUrl);
    this.http.get(environment.devUrl + '/tactic').subscribe((res: ITactic[]) => {
      this.listOfTactics = res;
    });
  }

  getTechies(event) {
    const tacticId = event.target.id;
    this.shared.doClick(tacticId);
  }

}
