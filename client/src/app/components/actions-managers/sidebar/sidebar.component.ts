import {Component, Input, OnInit} from '@angular/core';
import {ActionService} from '../../../services/action.service';
import {Area} from '../../../objects/area';
import {FormBuilder} from '@angular/forms';
import {Steps, StepsService} from '../../../services/steps.service';
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
    Steps = Steps;

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
        if (lastId !== this.action.id)
            this.stepperService.changeStep(0);
    }

    addAction() {
        this.actionService.getNewAction().subscribe(newAction => {
            this.changeActiveAction(newAction.id);
        });
    }

    deleteAction(id: string) {
        this.actionService.deleteAction(id).subscribe();
    }

}
