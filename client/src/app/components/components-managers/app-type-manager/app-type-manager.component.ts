import {Component, Input, OnInit} from '@angular/core';
import {Area} from '../../../objects/area';

@Component({
    selector: 'app-app-type-manager',
    templateUrl: './app-type-manager.component.html',
    styleUrls: ['./app-type-manager.component.scss']
})
export class AppTypeManagerComponent implements OnInit {

    @Input()
    public area: Area;

    constructor() {
    }

    ngOnInit() {
    }

}
