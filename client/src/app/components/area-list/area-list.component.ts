import {Component, OnInit} from '@angular/core';
import {Area, AreaAdapter} from '../../objects/area';
import {HttpClient} from '@angular/common/http';
import {AreaService} from '../../services/area.service';

@Component({
    selector: 'app-area-list',
    templateUrl: './area-list.component.html',
    styleUrls: ['./area-list.component.scss']
})

export class AreaListComponent implements OnInit {

    public areas: Area[] = [];

    constructor(private http: HttpClient, private areaService: AreaService) {
        areaService.getAreas().subscribe(value => {this.areas = value; });
        areaService.getArea('id').subscribe(value => {this.areas.push(value); });
    }

    ngOnInit() {
    }

}
