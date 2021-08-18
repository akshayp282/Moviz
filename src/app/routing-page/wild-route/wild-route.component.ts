import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-wild-route',
  templateUrl: './wild-route.component.html',
  styleUrls: ['./wild-route.component.css']
})
export class WildRouteComponent implements OnInit {

  constructor(private router: Router) { }

  ngOnInit(): void {
  }

}
