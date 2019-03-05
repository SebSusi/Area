import {ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {ServiceManagerComponent} from './service-manager/service-manager.component';
import {TriggerManagerComponent} from './trigger-manager/trigger-manager.component';
import {AccountManagerComponent} from './account-manager/account-manager.component';
import {OptionsManagerComponent} from './options-manager/options-manager.component';
import {FormGroup} from '@angular/forms';
import {Steps} from '../../services/steps.service';


const componentMapper: Map<Steps, any> = new Map<Steps, any>([
    [Steps.SERVICE, ServiceManagerComponent],
    [Steps.TYPE, TriggerManagerComponent],
    [Steps.ACCOUNT, AccountManagerComponent],
    [Steps.OPTIONS, OptionsManagerComponent]
]);

@Directive({
    selector: '[appDynamicAction]'
})
export class DynamicActionDirective implements OnInit {
    @Input() type: Steps;

    componentRef: any;
    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef
    ) {}
    ngOnInit() {
        const factory = this.resolver.resolveComponentFactory(
            componentMapper.get(this.type)
        );
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.type = this.type;
    }
}