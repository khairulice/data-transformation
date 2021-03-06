import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { NgbDropdownModule, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule,ReactiveFormsModule }    from '@angular/forms';

import { PortfolioRoutingModule } from './portfolio.routing';
import { PortfolioComponent } from './portfolio.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { HeaderComponent } from './header/header.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ModalComponent } from '../_directives';
import { ModalService, StockService, AlertService as AlertService } from '../_services';
import { ChartsModule as Ng2Charts } from 'ng2-charts';
import { PageHeaderModule } from '../shared';
import { StockComponent } from './stock/stock.component';
import { AddStockComponent } from './stock/add-stock/add-stock.component';
import {NgbDateAdapter, NgbDateStruct, NgbDateNativeAdapter} from '@ng-bootstrap/ng-bootstrap';
import { AnalyzeComponent } from './analyze/analyze.component';
import { AlertComponent } from '../_directives';
import { ProfileComponent } from './profile/profile.component';
import { FileUploadModule } from 'ng2-file-upload';
import { NgRedux, NgReduxModule} from '@angular-redux/store';
import { IAppState, rootReducer, INITIAL_STATE } from '../_redux/store';
import { environment } from '../../environments/environment';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFirestore } from '@angular/fire/firestore';



@NgModule({
    imports: [
        CommonModule,
        PortfolioRoutingModule,
        TranslateModule,
        FormsModule,
        ReactiveFormsModule,
        NgbDropdownModule.forRoot(),
        NgbModule.forRoot(),
        PageHeaderModule,
        Ng2Charts,
        FileUploadModule,
        NgReduxModule,
        AngularFireModule.initializeApp(environment.firebase, 'vehicle-registration'),
        AngularFireStorageModule
       
    ],
    declarations: [
        PortfolioComponent, 
        SidebarComponent, 
        HeaderComponent, 
        DashboardComponent, 
        StockComponent,
        ModalComponent,
        AddStockComponent,
        AnalyzeComponent,
        AlertComponent,
        ProfileComponent        
    ],
    providers: [
        ModalService,
        StockService,
        AlertService,
        {provide: NgbDateAdapter, useClass: NgbDateNativeAdapter},
        AngularFirestore        
    ],
})
export class PortfolioModule {
    constructor (ngRedux: NgRedux<IAppState>) {
        ngRedux.configureStore(rootReducer, INITIAL_STATE);
    }
 }
