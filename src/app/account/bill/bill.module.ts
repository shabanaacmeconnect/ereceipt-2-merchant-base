import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../../shared/ui/ui.module';
import { BillRoutingModule } from './bill-routing';
import {BillComponent} from './receipt/bill.component';
import { NgxBarcodeModule } from 'ngx-barcode';

@NgModule({
  declarations: [BillComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule,
    UIModule,
    BillRoutingModule,
    NgxBarcodeModule,
    FormsModule
  ]
})
export class BillModule { }
