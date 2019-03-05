import { Injectable } from '@angular/core';
import {MatStepper} from '@angular/material';
import {FormControl, FormGroup, Validators} from '@angular/forms';

export enum Steps {
    SERVICE = 'services',
    TYPE = 'type',
    ACCOUNT = 'account',
    OPTIONS = 'options'
}

@Injectable({
  providedIn: 'root'
})
export class StepsService {

  public stepper: MatStepper;
  public steps: Map<string, {group: FormGroup, description: string, index: number}>;
  public firstStep: string = undefined;
  public lastStep: string;

  constructor() {
      this.steps = new Map();
  }

  addStep(name, description) {
      if (!this.firstStep)
          this.firstStep = name;
      this.lastStep = name;
      this.steps.set(name, {
          group: new FormGroup({}),
          description: description,
          index: this.steps.size});
  }

  getStep(name) {
      return this.steps.get(name);
  }

  getController(name, controlName) {
      return this.getFormGroup(name).get(controlName);
  }

  getFormGroup(name) {
      return this.getStep(name).group;
  }

  addControls(name, controls) {
      for (const key in controls) {
          this.getFormGroup(name).addControl(key, new FormControl(controls[key][0], controls[key][1]));
      }
  }

  reset(name, controls = null) {
      this.getStep(name).group = new FormGroup({});
      this.addControls(name, controls);
  }

  getStepIndex(): number {
      if (this.stepper === undefined)
        return 0;
      return this.stepper.selectedIndex;
  }

  resetStepper() {
      if (this.stepper === undefined)
          return;
      this.stepper.reset();
      this.changeStep(0);
  }

  changeStep(index: number) {
      this.stepper.selectedIndex = index;
  }

    getMyStepIndex(type: Steps) {
        return this.steps.get(type).index;
    }
}
