import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionService} from '../../../services/action.service';
import {Action} from '../../../objects/action';
import {Steps, StepsService} from '../../../services/steps.service';
import {MatStepper} from '@angular/material';
import {KeyValue} from '@angular/common';

@Component({
    selector: 'app-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
    @ViewChild('stepper') set stepper(stepper: MatStepper) {
        this.stepsService.stepper = stepper;
    }

    public action: Action = undefined;

    constructor(private actionService: ActionService, public stepsService: StepsService) {
        this.actionService.actionsObservable.subscribe(reset => {
            this.action = this.actionService.getActiveAction();
        });
        stepsService.addStep(Steps.SERVICE, 'Select Service', 0);
        stepsService.addStep(Steps.TYPE, 'Choose Action or Reaction', 1);
        stepsService.addStep(Steps.ACCOUNT, 'Connect Account', 2);
        stepsService.addStep(Steps.OPTIONS, 'Set Up Template', 3);
    }

    indexOrderAsc = (akv: KeyValue<string, any>, bkv: KeyValue<string, any>): number => {
        const a = akv.value.index;
        const b = bkv.value.index;

        return a > b ? 1 : (b > a ? -1 : 0);
    }

    ngOnInit() {
        this.stepsService.stepper = this.stepper;
    }

    saveAction() {
        if (this.stepsService.getFormGroup(Steps.OPTIONS).valid) {
            this.action.fields = this.stepsService.getFormGroup(Steps.OPTIONS).getRawValue();
            this.actionService.updateAction(this.action.id)
        }
    }
}
