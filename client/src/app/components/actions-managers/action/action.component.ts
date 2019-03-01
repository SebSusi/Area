import {Component, OnInit} from '@angular/core';
import {ActionService} from '../../../services/action.service';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Action} from '../../../objects/action';

@Component({
    selector: 'app-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ActionComponent implements OnInit {
    forms: FormArray;
    _action: Action = undefined;
    public form: FormGroup;

    constructor(private actionService: ActionService, private formBuilder: FormBuilder) {
        this.actionService.actionsObservable.subscribe(value => {
            this._action = this.actionService.getAction(undefined);
            console.log(this._action);
        });
        this.forms = new FormArray([
            new FormGroup({}),
            new FormGroup({}),
            new FormGroup({}),
            new FormGroup({})
        ]);
    }

    get action(): Action {
        return this._action;
    }

    set action(value: Action) {
        this._action = value;
    }


    ngOnInit() {
        this.form = this.formBuilder.group({});
//        this.forms.setValue(['Nancy', 'Drew', 'deed', 'zfezef']);
    }
}
