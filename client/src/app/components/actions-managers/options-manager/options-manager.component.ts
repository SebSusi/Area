import {Component, Input, OnInit} from '@angular/core';
import {Action} from '../../../objects/action';
import {StructureService} from '../../../services/structure.service';
import {Option} from '../../../objects/option';
import {AbstractManager} from '../abstract-manager';
import {ActionService} from '../../../services/action.service';

@Component({
    selector: 'app-options-manager',
    templateUrl: './options-manager.component.html',
    styleUrls: ['./options-manager.component.scss']
})
export class OptionsManagerComponent extends AbstractManager implements OnInit {

    public options: Option[];

    constructor(private actionService: ActionService, public structureS: StructureService) {
        super(actionService);
    }

    ngOnInit() {
    }

    receiveActionUpdate() {
        this.options = this.structureS.getOptions(this.action);
    }
}
