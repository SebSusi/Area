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
    public checked = false;

    constructor(private http: HttpClient, private areaService: AreaService) {
        areaService.getAreas().subscribe();
    }

    get areas(): Area[] {
        return this.areaService.areas;
    }

    ngOnInit() {
    }

    selectAll() {
        for (const item of this.areas) {
            item.checked = this.checked;
        }
    }

    areSomeChecked() {
        for (const item of this.areas) {
            if (item.checked)
                return true;
        }
        return false;
    }

    deleteAreas() {
        for (const item of this.areas) {
            if (item.checked) {
                const idx = this.areaService.deleteArea(item.id);
            }
        }
    }
}
