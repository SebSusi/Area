import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AreaService} from '../../../services/area.service';
import {Area} from '../../../objects/area';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    public area: Area;

    constructor(private route: ActivatedRoute, private areaService: AreaService) {
    }

    ngOnInit(): void {
        this.getArea();
    }

    getArea(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.areaService.getArea(id)
            .subscribe(area => this.area = area);
    }
}
