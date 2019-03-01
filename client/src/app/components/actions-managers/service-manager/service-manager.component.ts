import {Component, Input, OnInit} from '@angular/core';
import {AreaService} from '../../../services/area.service';
import {StructureService} from '../../../services/structure.service';
import {AbstractManager} from '../abstract-manager';
import {ActionService} from '../../../services/action.service';
import {FormBuilder, FormArray, Validators, FormControl} from '@angular/forms';

@Component({
    selector: 'app-service-manager',
    templateUrl: './service-manager.component.html',
    styleUrls: ['./service-manager.component.scss']
})

export class ServiceManagerComponent extends AbstractManager implements OnInit{

    constructor(actionService: ActionService, formBuilder: FormBuilder, private areaService: AreaService,
                private structureService: StructureService) {
        super(actionService, formBuilder);
    }

    public services: string[];

    getFormGroup() {
        return {
            typeControl: [this.action.service, Validators.required]
        };
    }

    ngOnInit() {
        this.initManager();
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
