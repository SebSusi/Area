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
    private lastActionId = '';

    constructor(private actionService: ActionService, public stepsService: StepsService) {
        this.actionService.actionsObservable.subscribe(reset => {
            this.action = this.actionService.getAction(undefined);
            this.lastActionId = this.action.id;
        });
        stepsService.addStep(Steps.SERVICE, 'Select Service');
        stepsService.addStep(Steps.TYPE, 'Choose Action or Reaction');
        stepsService.addStep(Steps.ACCOUNT, 'Connect Account');
        stepsService.addStep(Steps.OPTIONS, 'Set Up Template');
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
