import {Component, Input, OnInit} from '@angular/core';
import {Action} from '../../../objects/action';

@Component({
    selector: 'app-options-manager',
    templateUrl: './options-manager.component.html',
    styleUrls: ['./options-manager.component.scss']
})
export class OptionsManagerComponent implements OnInit {

    @Input()
    public action: Action;

    constructor() {
    }

    ngOnInit() {
    }
}
