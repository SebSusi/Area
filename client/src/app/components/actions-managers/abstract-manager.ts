import {Injectable, Input} from '@angular/core';
import {Action} from '../../objects/action';
import {ActionService} from '../../services/action.service';
import {FormControl, Validators} from '@angular/forms';
import {Steps, StepsService} from '../../services/steps.service';

@Injectable()
export abstract class AbstractManager {

    protected constructor(protected actionService: ActionService, public stepsService: StepsService) {
        this.action = actionService.getAction(undefined);
        this.actionService.actionsObservable.subscribe(changePage => {
            this.action = this.actionService.getAction(undefined);
            if (this.stepsService.getStepIndex() < this.stepsService.getMyStepIndex(this.type)) {
                if (!changePage)
                    this.stepsService.getFormGroup(this.type).reset();
                this.refreshFormGroup();
            }
            this.receiveActionUpdate();
        });
    }

    @Input()
    public type: Steps;

    public action: Action;

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
        this.stepsService.reset(this.type, this.getFormGroup());
    }
}

