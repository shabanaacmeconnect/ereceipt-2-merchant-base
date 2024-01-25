import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BillComponent } from './receipt/bill.component';

const routes: Routes = [
    {
        path: ':id',
        component: BillComponent
    },
]; 

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class BillRoutingModule { }
