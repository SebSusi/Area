import {Component, Input, OnInit} from '@angular/core';
import {AreaService} from '../../../services/area.service';
import {StructureService} from '../../../services/structure.service';
import {AbstractManager} from '../abstract-manager';
import {ActionService} from '../../../services/action.service';

@Component({
    selector: 'app-service-manager',
    templateUrl: './service-manager.component.html',
    styleUrls: ['./service-manager.component.scss']
})

export class ServiceManagerComponent extends AbstractManager implements OnInit{

    public services: string[];

    constructor(actionService: ActionService, private areaService: AreaService, private structureService: StructureService) {
        super(actionService);
    }

    ngOnInit() {
        this.services = this.structureService.getServices();
    }

    isTypeSelected(type) {
        return this.action && type === this.action.service;
    }

    setSelectedType(type) {
        this.action.service = type;
        this.emitActionUpdate();
    }

    receiveActionUpdate() {
    }
}
