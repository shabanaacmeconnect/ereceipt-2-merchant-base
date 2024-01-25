import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import {DragDropModule} from '@angular/cdk/drag-drop';
import { NgbNavModule, NgbDropdownModule, NgbModalModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { NgApexchartsModule } from 'ng-apexcharts';
import { WidgetModule } from '../shared/widget/widget.module';
import { UIModule } from '../shared/ui/ui.module';
import { PagesRoutingModule } from './pages-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LoaderService } from '../core/services/loader.service';
import { LoaderInterceptorService } from '../core/services/interceptors/loader-interceptor.service';
import { NgSelectModule } from '@ng-select/ng-select';
import { DashboardsModule } from './dashboards/dashboards.module';
import { LocationsComponent } from './locations/locations.component';
import { Ng2ImgMaxModule } from "ng2-img-max";
import { AddLocationsComponent } from "./locations/addlocations.component";
import { TemplateComponent } from './template/template.component';
import { BillsComponent } from './bills/bills.component';
import { ApiComponent } from "./api/api.component";
import { feedbackComponent } from "./feedbacks/feedback.component";
import { NgxIntlTelInputModule } from "ngx-intl-tel-input";

@NgModule({
  declarations: [LocationsComponent,AddLocationsComponent,TemplateComponent,
  BillsComponent,ApiComponent,feedbackComponent],
  imports: [
    CommonModule,
    FormsModule,
    NgbDropdownModule,
    NgbModalModule,
    PagesRoutingModule,
    NgApexchartsModule,
    ReactiveFormsModule,
    HttpClientModule,
    UIModule,   
    WidgetModule,
    NgbNavModule,
    NgbTooltipModule,
    NgSelectModule,    DragDropModule,
    DashboardsModule,Ng2ImgMaxModule,
    NgxIntlTelInputModule
  ],
  providers: [
    
    LoaderService,
    { provide: HTTP_INTERCEPTORS, useClass: LoaderInterceptorService, multi: true }
  ]
})
export class PagesModule { }
