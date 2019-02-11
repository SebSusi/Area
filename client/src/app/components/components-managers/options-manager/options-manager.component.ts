import {Component, Input, OnInit} from '@angular/core';
import {Area} from '../../../objects/area';

@Component({
    selector: 'app-options-manager',
    templateUrl: './options-manager.component.html',
    styleUrls: ['./options-manager.component.scss']
})
export class OptionsManagerComponent implements OnInit {

    @Input()
    public area: Area;

    constructor() {
    }

    ngOnInit() {
    }

}
