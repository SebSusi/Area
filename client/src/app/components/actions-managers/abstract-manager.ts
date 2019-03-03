import {Injectable, Input} from '@angular/core';
import {Action} from '../../objects/action';
import {ActionService} from '../../services/action.service';
import {FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Injectable()
export abstract class AbstractManager {

    protected constructor(protected actionService: ActionService, protected formBuilder: FormBuilder) {
        this._action = actionService.getAction(undefined);
        this.actionService.actionsObservable.subscribe(reset => {
            this._action = this.actionService.getAction(undefined);
            /*if (reset)
                this.refreshFormGroup();*/
            this.receiveActionUpdate();
        });
        this.formControls = this.getFormGroup();
    }

    get action(): Action {
        return this._action;
    }

    set action(value: Action) {
        this._action = value;
    }

    @Input()
    public form: FormGroup;

    public _action: Action;

    public formControls;

    protected initManager() {
        this.refreshFormGroup();
    }

    getFormGroup() {
        return {};
    }

    emitActionUpdate() {
        this.actionService.emitActions();
    }

    abstract receiveActionUpdate();

    private refreshFormGroup() {
        if (this.form)
            this.form.reset();
        console.log(this.action);
        for (const key in this.formControls) {
            this.form.addControl(key, new FormControl(this.formControls[key][0], this.formControls[key][1]));
        }
    }
}

