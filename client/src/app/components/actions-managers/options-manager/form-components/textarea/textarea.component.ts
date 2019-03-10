import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { FieldConfig } from '../../../../../objects/form-configs';

@Component({
  selector: 'app-input',
  templateUrl: 'textarea.component.html',
  styles: []
})
export class TextareaComponent implements OnInit {
  field: FieldConfig;
  group: FormGroup;
  constructor() {}
  ngOnInit() {}
}
