import {Component, Input, OnInit} from '@angular/core';
import {Area} from '../../objects/area';

@Component({
  selector: 'app-area-item',
  templateUrl: './area-item.component.html',
  styleUrls: ['./area-item.component.scss']
})
export class AreaItemComponent implements OnInit {

  @Input() area: Area;

  constructor() { }

  ngOnInit() {
  }

}
