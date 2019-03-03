import {Component, OnInit, ViewChild} from '@angular/core';
import {ActionService} from '../../../services/action.service';
import {FormGroup} from '@angular/forms';
import {Action} from '../../../objects/action';
import {StepperService} from '../../../services/stepper.service';
import {MatStepper} from '@angular/material';

@Component({
    selector: 'app-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
    @ViewChild('stepper') set stepper(stepper: MatStepper) {
        this.stepperService.stepper = stepper;
    };
    forms;
    _action: Action = undefined;
    managers: string[];
    private lastActionId = '';

    constructor(private actionService: ActionService, private stepperService: StepperService) {
        this.actionService.actionsObservable.subscribe(reset => {
            this._action = this.actionService.getAction(undefined);
            if (reset)
                this.resetStepper();
            this.lastActionId = this.action.id;
        });
        this.forms = [
            {group: new FormGroup({}), name: 'services', description: 'Select Service'},
            {group: new FormGroup({}), name: 'triggers', description: 'Choose Action or Reaction'},
            {group: new FormGroup({}), name: 'account', description: 'Connect Account'},
            {group: new FormGroup({}), name: 'options', description: 'Set Up Template'}
        ];
        this.managers = ['services', 'triggers', 'account', 'options'];
    }

    get action(): Action {
        return this._action;
    }

    set action(value: Action) {
        this._action = value;
    }

    public resetStepper() {
        if (!this.stepperService.stepper)
            this.stepperService.stepper = this.stepper;
        this.stepperService.reset();
    }


    ngOnInit() {
        this.stepperService.stepper = this.stepper;
//        this.form = this.formBuilder.group({});
//        this.forms.setValue(['Nancy', 'Drew', 'deed', 'zfezef']);
    }

    onStepChange(event) {
    }
}
