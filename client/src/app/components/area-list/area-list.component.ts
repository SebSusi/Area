import { Component, OnInit } from '@angular/core';
import {Area} from '../../objects/area';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent implements OnInit {

  public areas: Area[] = [];

  constructor() {
      this.areas.push(new Area());
      this.areas.push(new Area());
      this.areas.push(new Area());
      this.areas.push(new Area());
      this.areas.push(new Area());
      this.areas.push(new Area());
  }

  ngOnInit() {
  }

}
