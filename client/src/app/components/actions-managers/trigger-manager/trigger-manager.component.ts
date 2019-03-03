import {Component, OnInit} from '@angular/core';
import {StructureService} from '../../../services/structure.service';
import {AbstractManager} from '../abstract-manager';
import {ActionService} from '../../../services/action.service';
import {FormBuilder, Validators} from '@angular/forms';

@Component({
    selector: 'app-trigger-manager',
    templateUrl: './trigger-manager.component.html',
    styleUrls: ['./trigger-manager.component.scss']
})
export class TriggerManagerComponent extends AbstractManager implements OnInit {

    public triggers;

    constructor(public structureS: StructureService, actionService: ActionService, formB: FormBuilder) {
        super(actionService, formB);
    }

    ngOnInit() {
        this.initManager();
    }

    receiveActionUpdate() {
        this.triggers = this.structureS.getActionsTypes(this.action);
    }


    getFormGroup(): {} {
        return {
            triggerControl : [this.action.name, Validators.required]
        };
    }
}
