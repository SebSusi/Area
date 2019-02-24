import {Component, Input, OnInit} from '@angular/core';
import {AbstractManager} from '../abstract-manager';
import {ActionService} from '../../../services/action.service';
import {StructureService} from '../../../services/structure.service';
import {AreaService} from '../../../services/area.service';
import {Area} from '../../../objects/area';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent extends AbstractManager implements OnInit {
    @Input()
    area: Area;

    constructor(actionS: ActionService, public areaS: AreaService) {
        super(actionS);
//        this.areaS.getArea("").subscribe(data => this.area) {
    }

    ngOnInit() {
    }

    receiveActionUpdate() {
    }

}
