import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { NgbAlertModule } from '@ng-bootstrap/ng-bootstrap';

import { UIModule } from '../../shared/ui/ui.module';
import { BillRoutingModule } from './bill-routing';
import {BillComponent} from './receipt/bill.component';
import { NgxBarcode6Module } from 'ngx-barcode6';
import { QRCodeModule } from 'angularx-qrcode';

@NgModule({
  declarations: [BillComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    NgbAlertModule,
    UIModule,
    BillRoutingModule,
    NgxBarcode6Module,
    FormsModule,
    QRCodeModule
  ]
})
export class BillModule { }
