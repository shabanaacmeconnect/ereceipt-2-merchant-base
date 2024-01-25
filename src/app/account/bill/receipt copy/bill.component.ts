import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';

import { ActivatedRoute, Router } from '@angular/router';
import { first } from 'rxjs/operators';

import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-bill',
  templateUrl: './bill.component.html',
  styleUrls: ['./bill.component.scss']
})

/**
 * bill component
 */
export class BillComponent implements OnInit, AfterViewInit {
  view=1;
  // set the currenr year
  year: number = new Date().getFullYear();
  id: string;
  data:any;
  count=0;
  myForm:FormGroup;  

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private authFackservice: AuthfakeauthenticationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")?this.route.snapshot.paramMap.get("id"):'';
    this.getDetails();
    this.myForm = new FormGroup({          
      'email':new FormControl(null,Validators.email)

 })
  }

  ngAfterViewInit() {
  }
  getDetails(){
    if(this.id){
      let url='api/billDetails?ref='+this.id
      this.authFackservice.get(url).subscribe(
        res => {
          if(res['status']==true){
            this.data =res['data'][0];
            this.count=JSON.parse(this.data.Product_Details).length
          }
        });
    }
  }
  productdetails(details){
    if(details){
      let d=JSON.parse(details)
      
      return d;
      
    }
  }
  changeview(id){
    this.view=id
  }
}
