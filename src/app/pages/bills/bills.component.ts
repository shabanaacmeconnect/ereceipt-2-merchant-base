import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { notificationService } from 'src/app/core/services/notofication.service';
import { NgbdSortableHeader } from '../table-sortable';
export type SortDirection = 'asc' | 'desc' | '';
export const compare = (v1:number|string, v2:number|string) => v1 < v2 ? -1 : v1 > v2 ? 1 : 0;

export interface SortEvent {
  column: string|null;
  direction: SortDirection;
}

@Component({
  selector: 'app-bills',
  templateUrl: './bills.component.html',
})

/**
 * Ecomerce merchants component
 */
export class BillsComponent implements OnInit {
  page={totalElements:0,pageNumber:1,size:10};
  codes=[];
  sortBy='';
  order='';
  
  @ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>=Object.create(null);
  
  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  merchantsData:any=[];
  merchants=[];
  merchant_id=''
  title='Add';
  keyword: string='';
  constructor( private router: Router,private modalService: NgbModal,public notificationService:notificationService,
    private authFackservice: AuthfakeauthenticationService,public formBuilder: FormBuilder) { }

  ngOnInit() {
     this.breadCrumbItems = [];
    this._fetchData();
    this.getMerchants();
  }
 getMerchants(){
  let url='merchants/location';
  this.authFackservice.get(url).subscribe(
    res => {
      if(res['status']==true){
        this.merchants =res['data'];
      }
    });
 }

  search(){
    this.page.pageNumber=1
    this._fetchData()
  }

  public _fetchData() {
    let url='merchants/bills?page='+this.page.pageNumber+'&perPage='+this.page.size+'&keyword='+this.keyword
    if(this.sortBy!='' && this.order!=''){
      url+='&sortBy='+this.sortBy+'&order='+this.order;
    }if(this.merchant_id)
    url+='&location_id='+this.merchant_id;
    this.authFackservice.get(url).subscribe(
      res => {
        if(res['status']==true){
          this.merchantsData =res['data'];
          this.page.totalElements=res['elementCount'];
        }
      });
  }
 
 
  onSort({column, direction}: SortEvent) {
    this.headers.forEach(header => {
      if (header.sortable !== column) {
        header.direction = '';
      }
    });
    if (direction === '') {       
      this.order='';this.sortBy=''; this._fetchData();
    } else {
      this.order=direction;this.sortBy=column
      this._fetchData();
    }
  }  
 
  sorting(){
    if(this.sortBy!='' && this.order!=''){
      this._fetchData()
    }
  }
  pageChange(){
    this._fetchData();
  }
  pageCopy(){
    return {...this.page}
 }

  changePage(event){
    this.page.pageNumber=event;
    this._fetchData()
  }

}
