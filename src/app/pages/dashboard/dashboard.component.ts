import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  listaUrl : any [] = [];
  constructor(
    private activedRoute : ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.listaUrl = this.activedRoute.snapshot.url;  
  }

}
