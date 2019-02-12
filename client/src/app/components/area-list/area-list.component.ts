import {Component, OnInit} from '@angular/core';
import {Area, AreaAdapter} from '../../objects/area';
import {HttpClient} from '@angular/common/http';
import {from, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {AreaService} from '../../services/area.service';

@Component({
    selector: 'app-area-list',
    templateUrl: './area-list.component.html',
    styleUrls: ['./area-list.component.scss']
})

export class AreaListComponent implements OnInit {

    public areas: Area[] = [];
    private adapter = new AreaAdapter();

    constructor(private http: HttpClient, private areaService: AreaService) {
        const names = ['Envois des mails', 'GregStalker', 'Activity Alert', 'Dis bonjour sur facebook', 'Mail Translator'];
        areaService.getAreas().subscribe(value => {this.areas = value; });
        areaService.getArea('id').subscribe(value => {this.areas.push(value); });
    }

    ngOnInit() {
    }

}
