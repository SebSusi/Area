import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    Input, OnChanges,
    OnInit, SimpleChanges,
    ViewContainerRef
} from '@angular/core';
import {FormGroup} from '@angular/forms';
import {FieldConfig} from '../../../../../objects/form-configs';
import {InputComponent} from '../input/input.component';
import {ButtonComponent} from '../button/button.component';
import {SelectComponent} from '../select/select.component';
import {DateComponent} from '../date/date.component';
import {RadiobuttonComponent} from '../radiobutton/radiobutton.component';
import {CheckboxComponent} from '../checkbox/checkbox.component';
import {TextareaComponent} from '../textarea/textarea.component';

const componentMapper = {
    text: InputComponent,
    number: InputComponent,
    textarea: TextareaComponent,
    button: ButtonComponent,
    list: SelectComponent,
    date: DateComponent,
    radiobutton: RadiobuttonComponent,
    boolean: CheckboxComponent
};

@Directive({
    selector: '[appDynamicField]'
})
export class DynamicFieldDirective implements OnInit, OnChanges {
    @Input() field: FieldConfig;
    @Input() group: FormGroup;
    componentRef: any;

    constructor(private resolver: ComponentFactoryResolver, private container: ViewContainerRef) {
    }

    ngOnInit() {
        console.log(this.field.type);
        if (!componentMapper[this.field.type])
            this.field.type = 'text';
        const factory = this.resolver.resolveComponentFactory(
            componentMapper[this.field.type]
        );
        this.componentRef = this.container.createComponent(factory);
        this.componentRef.instance.field = this.field;
        this.componentRef.instance.group = this.group;
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (!this.componentRef) return;
        this.componentRef.instance.field = this.field;
        this.componentRef.instance.group = this.group;
    }
}
