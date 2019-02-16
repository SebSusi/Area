import {Component, Input, OnInit} from '@angular/core';
import {Action} from '../../../objects/action';
import {StructureService} from '../../../services/structure.service';

@Component({
    selector: 'app-trigger-manager',
    templateUrl: './trigger-manager.component.html',
    styleUrls: ['./trigger-manager.component.scss']
})
export class TriggerManagerComponent implements OnInit {

    @Input()
    public action: Action;
    public triggers;

    constructor(public structureS: StructureService) {
    }

    ngOnInit() {
        this.triggers = Array.from( this.structureS.template.options.get(this.action.type).keys() );
    }

}
