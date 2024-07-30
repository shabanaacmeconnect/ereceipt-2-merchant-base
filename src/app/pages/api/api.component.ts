import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-api',
  templateUrl: './api.component.html',
  styleUrls: ['./faqs.component.scss']
})

export class ApiComponent implements OnInit {
  api_key='';api_secret='';
  keypresent:any=[];
    breadCrumbItems: Array<{}>;
    typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean=false;
  success={
    "status": true,
    "data": "",
    "message": "success"
}
form1=false;
form2=false;
error={
  "status": true,
  "data": "",
  "message": "No reciept found."
};
services=[];
id='';
secretKeys=[];
service_id=''
  constructor( private modalService: NgbModal,public formBuilder: FormBuilder, private route: ActivatedRoute,private authFackservice: AuthfakeauthenticationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")?this.route.snapshot.paramMap.get("id"):'';

    this.breadCrumbItems = [{ label: 'Dashoboard' },{ label: 'Users' }, { label: 'Api Key Settings', active: true }];
    // this.getservices();
    this.getsecretKeys()
  }
  // getservices(){
  //   this.authFackservice.get('merchants/services').subscribe(
  //     res => {
  //       if(res['status']==true){
  //         this.services =res['data'];
  //         if(this.services.length>0){
  //           this.getsecretKeys(this.services[0].id)
            
  //         }
  //       }
  //     });
  // }
  getsecretKeys(){
    // this.service_id=ids;
    this.authFackservice.get('merchants/apiKeys').subscribe(
      res1 => {
        if(res1['status']==true){
          this.secretKeys=res1['data']
        }
      })
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
        this.authFackservice.put('merchants/apiKeys/status?key_id='+item.key_id,{}).subscribe(
          res => {
            if(res['status']==true){
              Swal.fire('Deleted!', 'Selected row has been deleted.', 'success');
              this.getsecretKeys();
            }
          });  
      }
    });
  }
  copyInputMessage(item){
    document.addEventListener('copy', (e: ClipboardEvent) => {
      e.clipboardData.setData('text/plain', (item));
      e.preventDefault();
      document.removeEventListener('copy', null);
    });
    document.execCommand('copy');
  }
  generateKeys(template){
    this.initForm();
    this.typesubmit=false;
    this.api_key='';
    this.api_secret='';
    this.modalService.open(template, { size: 'lg',windowClass:'modal-holder', centered: true });

  }
  typeSubmit(){
    this.typesubmit = true;
    if(this.typeValidationForm.status=='INVALID')
    return;
    var formData: any = new FormData();
    formData.append("key_name", this.typeValidationForm.value.name);
    // formData.append("service_id", this.service_id);
    // formData.append("user_id", this.id);
    this.authFackservice.postMultipart('merchants/apiKeys',formData).subscribe(
      res => {
        if(res['status']==true){
          this.api_key=res['data']['api_key'];
          this.api_secret=res['data']['api_secret'];
          // Swal.fire('Success!', 'New api keys has been added.', 'success');
          this.getsecretKeys();
        }else{
          Swal.fire('Error!', res['message'], 'error');
        }
      })
  }
  initForm(){
    this.typeValidationForm = this.formBuilder.group({
      name: ['', [Validators.required]],
    })
  }
  get type() {
    return this.typeValidationForm.controls;
  }
  // generateKeys(){
  //   this.authFackservice.get('merchants/apiKeys').subscribe(
  //     res => {
  //       if(res['status']==true){
  //         this.api_key=res['data']['api_key'];
  //         this.api_secret=res['data']['api_secret'];
  //         Swal.fire('Success!', 'Api Keys generated successfully.Please copy them for use', 'success');
  //       }else{
  //         Swal.fire('Error!', res['message'], 'error');
  //       }
  //     });
  // }
 
}
