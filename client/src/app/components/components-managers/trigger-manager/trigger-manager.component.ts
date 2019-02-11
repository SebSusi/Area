import {Component, Input, OnInit} from '@angular/core';
import {Area} from '../../../objects/area';

@Component({
    selector: 'app-trigger-manager',
    templateUrl: './trigger-manager.component.html',
    styleUrls: ['./trigger-manager.component.scss']
})
export class TriggerManagerComponent implements OnInit {

    @Input()
    public area: Area;

    constructor() {
    }

    ngOnInit() {
    }

}
