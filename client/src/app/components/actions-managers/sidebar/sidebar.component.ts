import {Component, Input, OnInit} from '@angular/core';
import {AbstractManager} from '../abstract-manager';
import {ActionService} from '../../../services/action.service';
import {StructureService} from '../../../services/structure.service';
import {AreaService} from '../../../services/area.service';
import {Area} from '../../../objects/area';
import {FormBuilder} from '@angular/forms';
import {StepperService} from '../../../services/stepper.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends AbstractManager implements OnInit {
    @Input()
    area: Area;

    constructor(actionS: ActionService, formB: FormBuilder, public stepperService: StepperService) {
        super(actionS, formB);
//        this.areaS.getArea("").subscribe(data => this.area) {
    }

    ngOnInit() {
    }

    receiveActionUpdate() {
    }

    public save() {}

    changeActiveAction(id: any) {
        this.action = this.actionService.getAction(id);
    }
}
