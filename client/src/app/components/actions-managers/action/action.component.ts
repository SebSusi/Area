import {Component, Input, OnInit} from '@angular/core';
import {ActionService} from '../../../services/action.service';
import {AbstractManager} from '../abstract-manager';

@Component({
    selector: 'app-action',
    templateUrl: './action.component.html',
    styleUrls: ['./action.component.scss']
})
export class ActionComponent extends AbstractManager implements OnInit {

    constructor(actionService: ActionService) {
        super(actionService);
    }

    ngOnInit() {
    }

    receiveActionUpdate() {
    }
}
