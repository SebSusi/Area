import {Component, Input, OnInit} from '@angular/core';
import {Action} from '../../../objects/action';

@Component({
    selector: 'app-trigger-manager',
    templateUrl: './trigger-manager.component.html',
    styleUrls: ['./trigger-manager.component.scss']
})
export class TriggerManagerComponent implements OnInit {

    @Input()
    public action: Action;

    constructor() {
    }

    ngOnInit() {
    }

}
