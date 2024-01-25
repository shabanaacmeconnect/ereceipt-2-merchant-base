import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { StatComponent } from './stat/stat.component';
import { TransactionComponent } from './transaction/transaction.component';
import { NgbdSortableHeader } from './table-sortable';

@NgModule({
  declarations: [StatComponent, TransactionComponent,NgbdSortableHeader],
  imports: [
    CommonModule,
    NgbModalModule
  ],
  exports: [StatComponent, TransactionComponent,NgbdSortableHeader]
})
export class WidgetModule { }
