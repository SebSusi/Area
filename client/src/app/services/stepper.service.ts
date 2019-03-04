import { Injectable } from '@angular/core';
import {MatStepper} from '@angular/material';

@Injectable({
  providedIn: 'root'
})
export class StepperService {

  public stepper: MatStepper;

  constructor() { }

  getStep(): number {
      if (this.stepper === undefined)
        return 0;
      return this.stepper.selectedIndex;
  }

  reset() {
      if (this.stepper === undefined)
          return;
      this.stepper.reset();
      this.changeStep(0);
  }

  changeStep(index: number) {
      this.stepper.selectedIndex = index;
      this.stepper.selectedIndex = index;
  }
}
