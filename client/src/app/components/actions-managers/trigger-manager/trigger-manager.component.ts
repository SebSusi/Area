import {Component, Input, OnChanges, OnInit} from '@angular/core';
import {StructureService} from '../../../services/structure.service';
import {AbstractManager} from '../abstract-manager';
import {ActionService} from '../../../services/action.service';

@Component({
    selector: 'app-trigger-manager',
    templateUrl: './trigger-manager.component.html',
    styleUrls: ['./trigger-manager.component.scss']
})
export class TriggerManagerComponent extends AbstractManager implements OnInit {

    public triggers;

    constructor(public structureS: StructureService, actionService: ActionService) {
        super(actionService);
    }

    ngOnInit() {
    }

    receiveActionUpdate() {
        this.triggers = this.structureS.getTriggers(this.action);
    }
}
