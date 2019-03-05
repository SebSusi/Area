import {Component, OnInit} from '@angular/core';
import {StructureService} from '../../../services/structure.service';
import {AbstractManager} from '../abstract-manager';
import {ActionService} from '../../../services/action.service';
import {FormBuilder, Validators} from '@angular/forms';
import {StepsService} from '../../../services/steps.service';

@Component({
    selector: 'app-trigger-manager',
    templateUrl: './trigger-manager.component.html',
    styleUrls: ['./trigger-manager.component.scss']
})
export class TriggerManagerComponent extends AbstractManager implements OnInit {

    public triggers;

    constructor(public structureS: StructureService, as: ActionService, ss: StepsService) {
        super(as, ss);
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
