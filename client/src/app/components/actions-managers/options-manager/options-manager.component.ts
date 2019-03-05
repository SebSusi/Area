import {AbstractManager} from '../abstract-manager';
import {ActionService} from '../../../services/action.service';
import {Component, Input, OnInit} from '@angular/core';
import {StructureService} from '../../../services/structure.service';
import {StepsService} from '../../../services/steps.service';

@Component({
    selector: 'app-options-manager',
    templateUrl: './options-manager.component.html',
    styleUrls: ['./options-manager.component.scss']
})
export class OptionsManagerComponent extends AbstractManager implements OnInit {

    public options: any;

    submit(value: any) {}

    constructor(as: ActionService, ss: StepsService, public structureS: StructureService) {
        super(as, ss);
    }

    ngOnInit() {
        this.initManager();
        this.receiveActionUpdate();
    }

    receiveActionUpdate() {
        this.options = this.structureS.getOptions(this.action);
        if (this.action.options !== undefined)
            for (const i in this.options) {
                this.options[i].value = this.action.options[this.options[i].name];
            }
    }
}
