import {Component, Input, OnInit} from '@angular/core';
import {AbstractManager} from '../abstract-manager';
import {ActionService} from '../../../services/action.service';
import {StructureService} from '../../../services/structure.service';
import {AreaService} from '../../../services/area.service';
import {Area} from '../../../objects/area';
import {FormBuilder} from '@angular/forms';
import {StepsService} from '../../../services/steps.service';
import {Action} from '../../../objects/action';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    @Input()
    area: Area;
    public action: Action;

    constructor(private actionService: ActionService, formB: FormBuilder, public stepperService: StepsService) {
        this.actionService.actionsObservable.subscribe(reset => {
            this.action = this.actionService.getAction(undefined);
        });
    }

    ngOnInit() {
    }

    public save() {}

    changeActiveAction(id: any) {
        const lastId = this.action.id;
        this.action = this.actionService.getAction(id);
        if (lastId !== this.action.id) {
            this.stepperService.changeStep(0);
        }
    }

    addAction() {
        this.actionService.getNewAction().subscribe(newAction => {
            this.changeActiveAction(newAction.id);
        });
    }

}
