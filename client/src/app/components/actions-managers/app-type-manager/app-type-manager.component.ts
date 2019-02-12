import {Component, Input, OnInit} from '@angular/core';
import {AreaService} from '../../../services/area.service';
import {Action} from '../../../objects/action';

@Component({
    selector: 'app-app-type-manager',
    templateUrl: './app-type-manager.component.html',
    styleUrls: ['./app-type-manager.component.scss']
})

export class AppTypeManagerComponent implements OnInit {

    @Input()
    public action: Action;
    public types: String[];

    constructor(private areaService: AreaService) {
    }

    ngOnInit() {
        this.areaService.getTypes().subscribe(data => {this.types = data; });
    }

    isTypeSelected(type) {
        return this.action && type === this.action.type;
    }

    setSelectedType(type) {
        this.action.type = type;
    }
}
