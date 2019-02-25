import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {AreaService} from '../../../services/area.service';
import {Area} from '../../../objects/area';
import {ActionService} from '../../../services/action.service';

@Component({
    selector: 'app-editor',
    templateUrl: './editor.component.html',
    styleUrls: ['./editor.component.scss']
})
export class EditorComponent implements OnInit {
    public area: Area;

    constructor(private route: ActivatedRoute, private areaService: AreaService, public actionService: ActionService) {
    }

    ngOnInit(): void {
        this.getArea();
    }

    getArea(): void {
        const id = this.route.snapshot.paramMap.get('id');
        this.areaService.getArea(id)
            .subscribe(area => {
                this.area = area;
                this.actionService.getActions(this.area).subscribe(
                    actions => {
                        this.area.actions = actions;
                        this.actionService.setActiveAction(0);
                        this.actionService.emitActions();
                    }
                );
            });
    }
}
