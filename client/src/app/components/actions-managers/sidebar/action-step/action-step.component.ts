import {ChangeDetectorRef, Component, ElementRef, Injectable, Input, OnInit} from '@angular/core';
import {MatList, MatListItem, MatNavList} from '@angular/material';
import {StepsService} from '../../../../services/steps.service';

@Component({
  selector: 'app-action-step',
  templateUrl: './action-step.component.html',
  styleUrls: ['./action-step.component.scss']
})
export class ActionStepComponent implements OnInit {
    @Input() icon: string;
    @Input() content: string;
    @Input() step: number;

    constructor(public stepperService: StepsService) {
    }

  ngOnInit() {
  }

}
