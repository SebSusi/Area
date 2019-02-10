import {Component, OnInit} from '@angular/core';
import {Area, AreaAdapter} from '../../objects/area';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

@Component({
    selector: 'app-area-list',
    templateUrl: './area-list.component.html',
    styleUrls: ['./area-list.component.scss']
})
export class AreaListComponent implements OnInit {

    public areas: Area[] = [];

    constructor(private http: HttpClient) {
        const names = ['Envois des mails', 'GregStalker', 'Activity Alert', 'Dis bonjour sur facebook', 'Mail Translator'];
        this.getAreas().subscribe(value => {
            this.areas = value;
        });
    }

    getAreas(): Observable<Area[]> {
        const url = '../../assets/areas.json';
        const adapter = new AreaAdapter();
        return this.http.get(url).pipe(
            map((data: any[]) => data.map(item => adapter.adapt(item))),
        );
    }

    ngOnInit() {
    }

}
