import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../../../objects/form-configs';

@Component({
  selector: 'app-checkbox',
  templateUrl: 'checkbox.component.html',
  styles: []
})
export class CheckboxComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {
//      this.group.get(this.field.name).setValue(this.field.value);
  }
}
