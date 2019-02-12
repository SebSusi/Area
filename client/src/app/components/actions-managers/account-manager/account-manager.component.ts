import {Component, Input, OnInit} from '@angular/core';
import {Action} from '../../../objects/action';

@Component({
  selector: 'app-account-manager',
  templateUrl: './account-manager.component.html',
  styleUrls: ['./account-manager.component.scss']
})
export class AccountManagerComponent implements OnInit {

    @Input()
    public action: Action;

    constructor() { }

  ngOnInit() {
  }

}
