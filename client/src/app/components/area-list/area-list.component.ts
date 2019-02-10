import { Component, OnInit } from '@angular/core';
import {Area, AreaAdapter} from '../../objects/area';
import {forEach} from '@angular/router/src/utils/collection';

@Component({
  selector: 'app-area-list',
  templateUrl: './area-list.component.html',
  styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent implements OnInit {

  public areas: Area[] = [];

  constructor() {
      const adapter = new AreaAdapter();
      const names = ['Envois des mails', 'GregStalker', 'Activity Alert', 'Dis bonjour sur facebook', 'Mail Translator'];
      for (const value of names) {
          this.areas.push(adapter.adapt({name: value}));
      }
  }

  ngOnInit() {
  }

}
