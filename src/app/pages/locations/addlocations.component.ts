import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AuthfakeauthenticationService } from 'src/app/core/services/authfake.service';
import { notificationService } from 'src/app/core/services/notofication.service';
import { Ng2ImgMaxService } from 'ng2-img-max';
import { SearchCountryField, CountryISO, PhoneNumberFormat } from 'ngx-intl-tel-input';
import Swal from 'sweetalert2';



@Component({
  selector: 'app-addlocations',
  templateUrl: './addlocations.component.html',
})

/**
 * Ecomerce locations component
 */
export class AddLocationsComponent implements OnInit {

  breadCrumbItems: Array<{}>;
  typeValidationForm: FormGroup; // type validation form
  typesubmit: boolean=false;
 
  imageType=true;
  sizeError=false;
    logo: any;
  // page
  title='Add';
  image: string;
  id="";
  separateDialCode = true;
	SearchCountryField = SearchCountryField;
	CountryISO = CountryISO;
  PhoneNumberFormat = PhoneNumberFormat;
  selectedCountryISO='ae'
	preferredCountries= ["ae", "us"];
  constructor(private ng2ImgMaxService: Ng2ImgMaxService,private route:ActivatedRoute , private router: Router,private modalService: NgbModal,public notificationService:notificationService,
    private authFackservice: AuthfakeauthenticationService,public formBuilder: FormBuilder) { }
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")?this.route.snapshot.paramMap.get("id"):'';
    if(this.id){
      this._fetchData();
      this.title='Edit'
    }
    this.initForm();
  }
  initForm(){
    this.typeValidationForm = this.formBuilder.group({
      loc_id:0,
      name: ['', [Validators.required]],
      address:['',[Validators.required]],
      phone:['',[Validators.required]],
      TRN_Number:['',[Validators.required,Validators.pattern('[0-9]{10,20}')]],
      headline: [''],
      rating:'',
      logo:[''],
      privacy_url:'',
      privacy_content:'',
      return_url:'',
      return_content:'',
      conditions_url:'',
      conditions_content:'',
      site:'',
      formlist: this.formBuilder.array([]),
      formlist1: this.formBuilder.array([]),
      facebook:'',
      twitter:'',
      linkedin:'',
      youtube:'',
      insta:''
//,this.conditionalrequiredValidator(this.title)
    });
    
  }
  field(): FormGroup {
    return this.formBuilder.group({
      reason:['',Validators.required],
    });
  }
  get formlist(): FormArray {
    return this.typeValidationForm.get('formlist') as FormArray;
  }
  removeField(i: number) {
    if (confirm('Are you sure you want to delete this element?')) {
      this.formlist.removeAt(i);
    }
  }
  addField() {
    let fg = this.field();
		this.formlist.push(fg);
  }
  field1(): FormGroup {
    return this.formBuilder.group({
      question:['', Validators.required],
    });
  }
  get formlist1(): FormArray {
    return this.typeValidationForm.get('formlist1') as FormArray;
  }
  removeField1(i: number) {
    if (confirm('Are you sure you want to delete this element?')) {
      this.formlist1.removeAt(i);
    }
  }
  addField1() {
    let fg = this.field1();
		this.formlist1.push(fg);
  }
  conditionalrequiredValidator(client){      //factory function
    return (control: AbstractControl):{[key: string]: boolean} | null => {
      return (client=="Add"  && (control.value=="" || control.value==null))?{required:true}:null;
    };
  }


  public _fetchData() {
    this.authFackservice.get('merchants/getlocationDetails?loc_id='+this.id).subscribe(
      res => {
        if(res['status']==true){
          let item=res['data']
          this.imageType=true;
          this.sizeError=false;
          let reasons=[]
          if(item.reasons){
            item.reasons.forEach(element => {
              reasons.push({reason:element.title})
              this.addField()
            });
          } 
          let questions=[]
          if(item.questions){
            item.questions.forEach(element => {
              questions.push({question:element.title})
              this.addField1()
            });
          }
          this.typeValidationForm.patchValue({
            name: item.name,
            address:item.address,
            phone:item.phone,
            TRN_Number:item.TRN_Number,
            rating:item.rating,
            headline:item.headline,
            loc_id:item.loc_id,
            formlist:reasons,
            formlist1:questions,
            privacy_url:item.privacy_url,
            privacy_content:item.privacy_content,
            return_url:item.return_url,
            return_content:item.return_content,
            conditions_url:item.conditions_url,
            conditions_content:item.conditions_content,
            site:item.site,
            facebook:item.social?JSON.parse(item.social).facebook:'',
            twitter:item.social?JSON.parse(item.social).twitter:'',
            youtube:item.social?JSON.parse(item.social).youtube:'',
            insta:item.social?JSON.parse(item.social).insta:'',
            linkedin:item.social?JSON.parse(item.social).linkedin:''
          });
        }
      });
  }
  get type() {
    return this.typeValidationForm.controls;
  }
  changePreferredCountries() {
		this.preferredCountries = [CountryISO.India, CountryISO.Canada];
	}
  typeSubmit() {
    this.typesubmit = true;
    console.log(this.typeValidationForm)
    if(this.typeValidationForm.status=='INVALID'||this.sizeError || !this.imageType)
    return;
    var formData: any = new FormData();
    formData.append("name", this.typeValidationForm.value.name);
    formData.append("TRN_Number",this.typeValidationForm.value.TRN_Number);
    formData.append("phone", this.typeValidationForm.value.phone.nationalNumber);
    formData.append("country", this.typeValidationForm.value.phone.countryCode);
    formData.append("code", this.typeValidationForm.value.phone.dialCode);
    formData.append("headline", this.typeValidationForm.value.headline);
    formData.append("address", this.typeValidationForm.value.address);
    formData.append("rating",this.typeValidationForm.value.rating);
    formData.append("privacy_content",this.typeValidationForm.value.privacy_content);
    formData.append("privacy_url",this.typeValidationForm.value.privacy_url);
    formData.append("return_content",this.typeValidationForm.value.return_content);
    formData.append("return_url",this.typeValidationForm.value.return_url);
    formData.append("conditions_content",this.typeValidationForm.value.conditions_content);
    formData.append("conditions_url",this.typeValidationForm.value.conditions_url);
    formData.append("site",this.typeValidationForm.value.site);
    if(this.typeValidationForm.value.formlist)
    formData.append("reason",JSON.stringify(this.typeValidationForm.value.formlist));
    if(this.typeValidationForm.value.formlist1)
    formData.append("question",JSON.stringify(this.typeValidationForm.value.formlist1));
    if(this.typeValidationForm.value.logo)
    formData.append("logo",this.logo);
    if(this.typeValidationForm.value.password!=""&&this.typeValidationForm.value.password!=null)
    formData.append("password", this.typeValidationForm.value.password);
    formData.append("social",JSON.stringify({
      facebook:this.typeValidationForm.value.facebook,
      twitter:this.typeValidationForm.value.twitter,
      youtube:this.typeValidationForm.value.youtube,
      insta:this.typeValidationForm.value.insta,
      linkedin:this.typeValidationForm.value.linkedin}));

    let data=this.typeValidationForm.value;
    // if(this.typeValidationForm.value.password=='')
    // delete data.password;
    // delete data.confirmpwd;
    if(data.loc_id==0 || data.loc_id==null){
      // delete data.loc_id;
      this.authFackservice.postMultipart('merchants/location',formData).subscribe(
        res => {
          if(res['status']==true){
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
            Swal.fire('Success!', 'Selected row has been updated.', 'success');

          }else{
            Swal.fire('Error!', res['message'], 'error');
          }
          this.modalService.dismissAll()
        }); 
    }
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
 
}
