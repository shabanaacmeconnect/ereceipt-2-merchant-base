import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultComponent } from './dashboards/default/default.component';
import { AddLocationsComponent } from './locations/addlocations.component';
import { LocationsComponent } from './locations/locations.component';
import { TemplateComponent } from './template/template.component';
import { BillsComponent } from './bills/bills.component';
import { ApiComponent } from './api/api.component';
import { feedbackComponent } from './feedbacks/feedback.component';

const routes: Routes = [
  { path: '', redirectTo: 'dashboard' ,pathMatch:'full'},
  { path: 'dashboard', component: DefaultComponent },
  { path: 'locations', component: LocationsComponent },
  { path: 'locations/add', component: AddLocationsComponent },
  { path: 'locations/:id', component: AddLocationsComponent },
  { path:'locations/:id/template',component:TemplateComponent},
  { path:'api-keys',component:ApiComponent},
  { path:'bills',component:BillsComponent},
  {path:'feedbacks',component:feedbackComponent}


  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PagesRoutingModule { }
