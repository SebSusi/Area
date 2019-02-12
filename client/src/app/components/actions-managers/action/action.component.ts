import {Component, Input, OnInit} from '@angular/core';
import {Action} from '../../../objects/action';

@Component({
  selector: 'app-action',
  templateUrl: './action.component.html',
  styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
  @Input()
  public action: Action;

  constructor() { }

  ngOnInit() {
  }

}
