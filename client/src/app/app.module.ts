import {AccountManagerComponent} from './components/actions-managers/account-manager/account-manager.component';
import {ActionComponent} from './components/actions-managers/action/action.component';
import {AngularSvgIconModule} from 'angular-svg-icon';
import {AppComponent} from './app.component';
import {AreaItemComponent} from './components/area-item/area-item.component';
import {AreaListComponent} from './components/area-list/area-list.component';
import {AuthServiceConfig, SocialLoginModule} from 'angularx-social-login';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {BrowserModule} from '@angular/platform-browser';
import {ButtonComponent} from './components/actions-managers/options-manager/form-components/button/button.component';
import {ButtonsModule} from 'angular-bootstrap-md';
import {CheckboxComponent} from './components/actions-managers/options-manager/form-components/checkbox/checkbox.component';
import {DateComponent} from './components/actions-managers/options-manager/form-components/date/date.component';
import {DynamicFieldDirective} from './components/actions-managers/options-manager/form-components/dynamic-field/dynamic-field.directive';
import {EditorComponent} from './components/pages/editor/editor.component';
import {Error404Component} from './components/error404/error404.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {getAuthServiceConfigs} from './objects/socialLoginConfig';
import {HomeComponent} from './components/pages/home/home.component';
import {HttpClientModule} from '@angular/common/http';
import {InputComponent} from './components/actions-managers/options-manager/form-components/input/input.component';
import {LoginComponent} from './components/pages/login/login.component';
import {NavbarComponent} from './components/navbar/navbar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {NgModule} from '@angular/core';
import {OptionsManagerComponent} from './components/actions-managers/options-manager/options-manager.component';
import {RadiobuttonComponent} from './components/actions-managers/options-manager/form-components/radiobutton/radiobutton.component';
import {RouterModule, Routes} from '@angular/router';
import {SelectComponent} from './components/actions-managers/options-manager/form-components/select/select.component';
import {ServiceManagerComponent} from './components/actions-managers/service-manager/service-manager.component';
import {TriggerManagerComponent} from './components/actions-managers/trigger-manager/trigger-manager.component';
import {UserAppComponent} from './components/pages/user-app/user-app.component';
import {UserComponent} from './components/pages/user/user.component';
import {MatRippleModule} from '@angular/material/core';
import {
    MatAutocompleteModule,
    MatButtonModule,
    MatCardModule,
    MatCheckboxModule,
    MatChipsModule,
    MatDatepickerModule,
    MatDialogModule,
    MatDividerModule, MatExpansionModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatListModule, MatMenuModule, MatNativeDateModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatSelectModule,
    MatSlideToggleModule, MatStepperModule,
    MatTabsModule,
    MatTreeModule
} from '@angular/material';
import { SidebarComponent } from './components/actions-managers/sidebar/sidebar.component';
import { ActionStepComponent } from './components/actions-managers/sidebar/action-step/action-step.component';
import { DynamicActionDirective } from './components/actions-managers/dynamic-action.directive';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {environment} from '../environments/environment';
import { AccountsComponent } from './components/accounts/accounts.component';
import {TextareaComponent} from './components/actions-managers/options-manager/form-components/textarea/textarea.component';
import { ApkComponent } from './components/pages/apk/apk.component';

const appRoutes: Routes = [
    {
        path: '',
        redirectTo: '/app',
        pathMatch: 'full',
    },
    {
        path: 'app',
        component: UserAppComponent,
        children: [
            {
                path: '',
                component: HomeComponent
            },
            {
                path: 'editor',
                redirectTo: 'editor/'
            },
            {
                path: 'editor/:id',
                component: EditorComponent
            },
            {
                path: 'account',
                component: UserComponent
            }
        ]
    },
    {
        path: 'login',
        component: LoginComponent
    },
    {
        path: 'client.apk',
        component: ApkComponent
    },
    {
        path: '404',
        component: Error404Component
    },
    {
        path: '**',
        redirectTo: '/404'
    }
];

@NgModule({
    declarations: [
        AccountManagerComponent,
        ActionComponent,
        AppComponent,
        AreaItemComponent,
        AreaListComponent,
        ButtonComponent,
        CheckboxComponent,
        DateComponent,
        DynamicFieldDirective,
        EditorComponent,
        Error404Component,
        HomeComponent,
        InputComponent,
        LoginComponent,
        TextareaComponent,
        NavbarComponent,
        OptionsManagerComponent,
        RadiobuttonComponent,
        SelectComponent,
        ServiceManagerComponent,
        TriggerManagerComponent,
        UserAppComponent,
        UserComponent,
        SidebarComponent,
        ActionStepComponent,
        DynamicActionDirective,
        AccountsComponent,
        ApkComponent,
    ],
    entryComponents: [
        InputComponent,
        ButtonComponent,
        SelectComponent,
        DateComponent,
        RadiobuttonComponent,
        TextareaComponent,
        CheckboxComponent,
        ServiceManagerComponent,
        TriggerManagerComponent,
        AccountManagerComponent,
        OptionsManagerComponent
    ],
    imports: [
        ReactiveFormsModule.withConfig({warnOnNgModelWithFormControl: 'never'}),
        RouterModule.forRoot(
            appRoutes,
            {enableTracing: false}
        ),
        AngularSvgIconModule,
        BrowserAnimationsModule,
        BrowserModule,
        ButtonsModule,
        FormsModule,
        HttpClientModule,
        MatAutocompleteModule,
        MatButtonModule,
        MatCardModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatNativeDateModule,
        MatDialogModule,
        MatDividerModule,
        MatStepperModule,
        MatFormFieldModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatMenuModule,
        MatExpansionModule,
        MatProgressBarModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSlideToggleModule,
        MatTabsModule,
        MatTreeModule,
        NgbModule,
        ReactiveFormsModule,
        SocialLoginModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireModule,
        AngularFirestoreModule,
        AngularFireAuthModule
    ],
    providers: [{
        provide: AuthServiceConfig,
        useFactory: getAuthServiceConfigs
    }],
    bootstrap: [AppComponent]
})

export class AppModule {
}