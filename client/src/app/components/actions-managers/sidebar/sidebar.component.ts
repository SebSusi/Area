import {Component, Input, OnInit} from '@angular/core';
import {ActionService} from '../../../services/action.service';
import {Area} from '../../../objects/area';
import {FormBuilder} from '@angular/forms';
import {Steps, StepsService} from '../../../services/steps.service';
import {Action} from '../../../objects/action';
import {AreaService} from '../../../services/area.service';

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

    constructor(public actionService: ActionService, formB: FormBuilder, public stepperService: StepsService, private areaService: AreaService) {
        this.actionService.actionsObservable.subscribe(reset => {
            this.action = this.actionService.getActiveAction();
        });
    }

    ngOnInit() {
    }

    public save() {
    }

    changeActiveAction(id: any) {
        const isFirst = (!this.action);
        console.log(isFirst);
        const lastId = isFirst ? id : this.action.id;
        this.action = this.actionService.getAction(id);
        if (lastId !== this.action.id || isFirst)
            this.stepperService.changeStep(0);
    }

    addAction() {
        const id = this.actionService.getNewAction();
        this.changeActiveAction(id);
        this.actionService.emitActions();
    }

    deleteAction(id: string) {
        this.actionService.deleteAction(id).subscribe();
    }

    saveAction() {
        console.log('Save');
        this.action.fields = this.stepperService.getFormGroup(Steps.OPTIONS).getRawValue();
        this.actionService.updateAction(this.action.id);
    }

    saveArea() {
        this.areaService.putArea(this.area.id);
    }
}
