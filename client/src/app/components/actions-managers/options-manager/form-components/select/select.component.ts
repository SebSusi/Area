import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../../../objects/form-configs';

@Component({
  selector: 'app-select',
  templateUrl: './select.component.html',
  styles: []
})
export class SelectComponent implements OnInit {
  field: any;
  group: FormGroup;

  constructor() {}
  ngOnInit() {
  }
}
