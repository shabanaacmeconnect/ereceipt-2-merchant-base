import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { notificationService } from 'src/app/core/services/notofication.service';
import { Ng2ImgMaxService } from 'ng2-img-max';

import Swal from 'sweetalert2';



@Component({
  selector: 'app-locations',
  templateUrl: './locations.component.html',
})

/**
 * Ecomerce locations component
 */
export class LocationsComponent implements OnInit {

  // bread crumb items
  elementCount=0;
  currentpage=1;
  page={totalElements:0,pageNumber:1,size:10};
  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean=false;
  locationsData:any=[];
  hrefLink: any;
  blob: Blob;
  term: any;
  imageType=true;
  sizeError=false;
    logo: any;
  // page
  title='Add';
  keyword: string='';
  image: string;
  constructor(private ng2ImgMaxService: Ng2ImgMaxService,  private router: Router,private modalService: NgbModal,public notificationService:notificationService,
    private authFackservice: AuthfakeauthenticationService,public formBuilder: FormBuilder) { }
  ngOnInit() {
    // this.breadCrumbItems = [{ label: 'Dashboard'},{ label: 'locations', active: true }];
    this.currentpage = 1;
    this.initForm();
    this._fetchData();
  }
  initForm(){
    this.typeValidationForm = this.formBuilder.group({
      loc_id:0,
      name: ['', [Validators.required]],
      address:['',[Validators.required]],
      phone:['',[Validators.required,Validators.pattern('[0-9]{9,10}')]],
      TRN_Number:['',[Validators.required,Validators.pattern('[0-9]{10,20}')]],
      headline: ['', [Validators.required]],
      logo:['',this.conditionalrequiredValidator(this.title)],
    });
    
  }
  conditionalrequiredValidator(client){      //factory function
    return (control: AbstractControl):{[key: string]: boolean} | null => {
      return (client=="Add"  && (control.value=="" || control.value==null))?{required:true}:null;
    };
  }

  search(){
    this.currentpage=1;
    this.page.pageNumber=1;
    this._fetchData()
  }
  public _fetchData() {
    this.authFackservice.get('merchants/location?page='+this.page.pageNumber+'&perPage=10&keyword='+this.keyword).subscribe(
      res => {
        if(res['status']==true){
          this.locationsData =res['data'];
          this.elementCount=res['elementCount']
          this.page.totalElements=res['elementCount']

        }
      });
  }
  get type() {
    return this.typeValidationForm.controls;
  }
  largeModal(largeDataModal: any) {
    this.title='Add';
    this.typesubmit=false;

    this.typeValidationForm.reset();
    this.imageType=true;
    this.sizeError=false;
    this.modalService.open(largeDataModal, { size: 'lg',windowClass:'modal-holder', centered: true });
  }
  editModal(largeDataModal: any,item) {
    this.typesubmit=false;
    this.imageType=true;
    this.sizeError=false;
    this.title='Edit';
    this.initForm();
    this.typeValidationForm.patchValue({
      name: item.name,
      address:item.address,
      phone:item.phone,
      TRN_Number:item.TRN_Number,
      headline:item.headline,
      loc_id:item.loc_id,
    });
    this.modalService.open(largeDataModal, { size: 'lg',windowClass:'modal-holder', centered: true });
  }
  toggleFunction(event,id){
    let currentTarget=event.currentTarget.checked==true?0:1;
    let data={type:'status',value:currentTarget,school_uid:id};
    this.authFackservice.get('merchants/location/status?value='+currentTarget+'&loc_id='+id).subscribe(
      res => {
        if(res['status']==true){
          if(currentTarget==0)
          Swal.fire('Enabled!', 'Selected row has been enabled.', 'success');
          else
          Swal.fire('Disabled!', 'Selected row has been disabled.', 'success');
          this._fetchData();
        }
      });  
  
  }
  deleteRow(item){
    Swal.fire({
      title: 'Are you sure?',
      text: 'You won\'t be able to revert this!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes, delete it!'
    }).then(result => {
      if (result.value) {
        this.authFackservice.delete('merchants/location?loc_id='+item.loc_id).subscribe(
          res => {
            if(res['status']==true){
              Swal.fire('Deleted!', 'Selected row has been deleted.', 'success');
              this._fetchData();
            }
          });  
      }
    });
  }
  typeSubmit() {
    this.typesubmit = true;
    if(this.typeValidationForm.status=='INVALID'||this.sizeError || !this.imageType)
    return;
    var formData: any = new FormData();
    formData.append("name", this.typeValidationForm.value.name);
    formData.append("TRN_Number",this.typeValidationForm.value.TRN_Number)
    formData.append("phone", this.typeValidationForm.value.phone);
    formData.append("headline", this.typeValidationForm.value.headline);
    formData.append("address", this.typeValidationForm.value.address);
    if(this.typeValidationForm.value.logo)
    formData.append("logo",this.logo);
    if(this.typeValidationForm.value.password!=""&&this.typeValidationForm.value.password!=null)
    formData.append("password", this.typeValidationForm.value.password);
    let data=this.typeValidationForm.value;
    // if(this.typeValidationForm.value.password=='')
    // delete data.password;
    // delete data.confirmpwd;
    if(data.loc_id==0 || data.loc_id==null){
      // delete data.loc_id;
      this.authFackservice.postMultipart('merchants/location',formData).subscribe(
        res => {
          if(res['status']==true){
            this._fetchData();
            Swal.fire('Success!', 'New location has been added.', 'success');
          }else{
            Swal.fire('Error!', res['message'], 'error');

          }
          this.modalService.dismissAll()
        });  
    }else{
      formData.append("loc_id", this.typeValidationForm.value.loc_id);
      this.authFackservice.putMultipart('merchants/location',formData).subscribe(
        res => {
          if(res['status']==true){
            this._fetchData();
            Swal.fire('Success!', 'Selected row has been updated.', 'success');

          }else{
            Swal.fire('Error!', res['message'], 'error');

          }
          this.modalService.dismissAll()
        }); 
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
  onFileSelected(event) {
    if(event.target.files[0].type=='image/png' || event.target.files[0].type=='image/jpg' || event.target.files[0].type=='image/jpeg'){
       this.imageType=true;
    }else{
      this.imageType=false;
      return;
    }if( event.target.files[0].size>2000000){
      this.sizeError=true;
      return;
    }else{
      this.sizeError=false;
    }
    var fileName =event.target.files[0]['name'];
    this.ng2ImgMaxService.resize([event.target.files[0]], 500,10000).subscribe((result)=>{
      this.logo=new File([result], fileName, { type: 'image/jpeg' });
    });
  }
  duplicate(item){
    Swal.fire({
      title:'Are you sure to duplicate this location?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#34c38f',
      cancelButtonColor: '#f46a6a',
      confirmButtonText: 'Yes!'
    }).then(result => {
      if (result.value) {
        this.authFackservice.get('merchants/duplicate?loc_id='+item).subscribe(
          res => {
            if(res['status']==true){
              Swal.fire('Success!', 'Selected location has been duplicated.', 'success');
              this._fetchData();
            }else{
              Swal.fire('Failed!', res['message'], 'error');

            }
          });  
      }
    });
  }
}
