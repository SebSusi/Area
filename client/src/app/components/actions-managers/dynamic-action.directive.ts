import {ComponentFactoryResolver, Directive, Input, OnInit, ViewContainerRef} from '@angular/core';
import {ServiceManagerComponent} from './service-manager/service-manager.component';
import {TriggerManagerComponent} from './trigger-manager/trigger-manager.component';
import {AccountManagerComponent} from './account-manager/account-manager.component';
import {OptionsManagerComponent} from './options-manager/options-manager.component';
import {FormGroup} from '@angular/forms';


const componentMapper = {
    services: ServiceManagerComponent,
    triggers: TriggerManagerComponent,
    account: AccountManagerComponent,
    options: OptionsManagerComponent
};

@Directive({
    selector: '[appDynamicAction]'
})
export class DynamicActionDirective implements OnInit {
    @Input() type: string;
    @Input() form: FormGroup;

    componentRef: any;
    constructor(
        private resolver: ComponentFactoryResolver,
        private container: ViewContainerRef
    ) {}
    ngOnInit() {
        console.log(this.type);
        const factory = this.resolver.resolveComponentFactory(
            componentMapper[this.type]
        );
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.form = this.form;
    }
}