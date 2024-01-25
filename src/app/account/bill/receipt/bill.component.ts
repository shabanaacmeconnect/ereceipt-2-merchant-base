import { Component, OnInit, AfterViewInit, ViewChild, TemplateRef, ElementRef } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthfakeauthenticationService } from '../../../core/services/authfake.service';
import Swal from 'sweetalert2';

import { ActivatedRoute, Router } from '@angular/router';
import * as htmlToImage from 'html-to-image';
import { delay } from 'rxjs/operators';

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
  feedback='';
  // set the currenr year
  year: number = new Date().getFullYear();
  id: string;
  data:any;
  count=0;
  myForm:FormGroup;  
  template: any;
  @ViewChild('logo') logo:TemplateRef<any>;
  @ViewChild('address') address:TemplateRef<any>;
  @ViewChild('name') name:TemplateRef<any>;
  @ViewChild('trn') trn:TemplateRef<any>;
  @ViewChild('phone') phone:TemplateRef<any>;
  @ViewChild('item_count') item_count:TemplateRef<any>;
  @ViewChild('date') date:TemplateRef<any>;
 
  @ViewChild('headline') headline:TemplateRef<any>;
  @ViewChild('greetings') greetings:TemplateRef<any>;
  @ViewChild('product') product:TemplateRef<any>;
  @ViewChild('tax') tax:TemplateRef<any>;
  @ViewChild('card') card:TemplateRef<any>;
  @ViewChild('mode') mode:TemplateRef<any>;
  @ViewChild('invoice') invoice:TemplateRef<any>;

  @ViewChild('batch') batch:TemplateRef<any>;
  @ViewChild('app_ver') app_ver:TemplateRef<any>;
  @ViewChild('VFI_TID') VFI_TID:TemplateRef<any>;
  @ViewChild('VFI_POSID') VFI_POSID:TemplateRef<any>;
  
  @ViewChild('VFI_MID') VFI_MID:TemplateRef<any>;
  @ViewChild('VFI_TxnType') VFI_TxnType:TemplateRef<any>;
  @ViewChild('VFI_CardScheme') VFI_CardScheme:TemplateRef<any>;
  @ViewChild('VFI_CardNum') VFI_CardNum:TemplateRef<any>;
  @ViewChild('expiry') expiry:TemplateRef<any>;
  @ViewChild('pan') pan:TemplateRef<any>;
  @ViewChild('VFI_RRN') VFI_RRN:TemplateRef<any>;
  @ViewChild('base') base:TemplateRef<any>;
  @ViewChild('tip') tip:TemplateRef<any>;
  @ViewChild('dcc') dcc:TemplateRef<any>;
  @ViewChild('PYCCurrAmount') PYCCurrAmount:TemplateRef<any>;
  @ViewChild('disclaimer') disclaimer:TemplateRef<any>;
  @ViewChild('signature') signature:TemplateRef<any>;
  @ViewChild('approval') approval:TemplateRef<any>;
  @ViewChild('aid') aid:TemplateRef<any>;
  @ViewChild('app') app:TemplateRef<any>;
  @ViewChild('pre') pre:TemplateRef<any>;
  @ViewChild('tvr') tvr:TemplateRef<any>;
  @ViewChild('tsi') tsi:TemplateRef<any>;
  @ViewChild('info') info:TemplateRef<any>;
  @ViewChild('ac') ac:TemplateRef<any>;
  @ViewChild('Receipt_No') Receipt_No:TemplateRef<any>;
  @ViewChild('Store_Code') Store_Code:TemplateRef<any>;
  @ViewChild('Cashier') Cashier:TemplateRef<any>;
  @ViewChild('Serial_number') Serial_number:TemplateRef<any>;
  @ViewChild('Customer_ID') Customer_ID:TemplateRef<any>;
  @ViewChild('Customer_Name') Customer_Name:TemplateRef<any>;
  @ViewChild('Total_Discount') Total_Discount:TemplateRef<any>;
  @ViewChild('privacy_url') privacy_url:TemplateRef<any>;
  @ViewChild('privacy_content') privacy_content:TemplateRef<any>;
  @ViewChild('return_url') return_url:TemplateRef<any>;
  @ViewChild('return_content') return_content:TemplateRef<any>;
  @ViewChild('conditions_url') conditions_url:TemplateRef<any>;
  @ViewChild('conditions_content') conditions_content:TemplateRef<any>;
  @ViewChild('social') social:TemplateRef<any>;
  @ViewChild('order_type') order_type:TemplateRef<any>;
  @ViewChild('barcode') barcode:TemplateRef<any>;
  @ViewChild('VFI_TransType') VFI_TransType:TemplateRef<any>;
  @ViewChild('VFI_CHName') VFI_CHName: TemplateRef<any>;
@ViewChild('VFI_MessNum') VFI_MessNum: TemplateRef<any>;
@ViewChild('VFI_TransSource') VFI_TransSource: TemplateRef<any>;
@ViewChild('VFI_AuthMode') VFI_AuthMode: TemplateRef<any>;
@ViewChild('VFI_CHVerification') VFI_CHVerification: TemplateRef<any>;
@ViewChild('VFI_RespCode') VFI_RespCode: TemplateRef<any>;
@ViewChild('VFI_RespMess') VFI_RespMess: TemplateRef<any>;
@ViewChild('VFI_DBCount') VFI_DBCount: TemplateRef<any>;
@ViewChild('VFI_CRCount') VFI_CRCount: TemplateRef<any>;
@ViewChild('VFI_DBAmount') VFI_DBAmount: TemplateRef<any>;
@ViewChild('VFI_CRAmount') VFI_CRAmount: TemplateRef<any>;
@ViewChild('VFI_AdditionalInfo') VFI_AdditionalInfo: TemplateRef<any>;
@ViewChild('VFI_ReportType') VFI_ReportType: TemplateRef<any>;
@ViewChild('VFI_ExchRate') VFI_ExchRate: TemplateRef<any>;
@ViewChild('VFI_MarkUp') VFI_MarkUp: TemplateRef<any>;
@ViewChild('VFI_PYCCurrName') VFI_PYCCurrName: TemplateRef<any>;
@ViewChild('VFI_OptinOut') VFI_OptinOut: TemplateRef<any>;
@ViewChild('VFI_QPSVeps') VFI_QPSVeps: TemplateRef<any>;
@ViewChild('VFI_CashAmount') VFI_CashAmount: TemplateRef<any>;
@ViewChild('VFI_Epp_Tenor') VFI_Epp_Tenor: TemplateRef<any>;
@ViewChild('VFI_Epp_Invoice') VFI_Epp_Invoice: TemplateRef<any>;
@ViewChild('VFI_Surcharge') VFI_Surcharge: TemplateRef<any>;
@ViewChild('VFI_VoucherNo') VFI_VoucherNo: TemplateRef<any>;
@ViewChild('VFI_CouponMessage') VFI_CouponMessage: TemplateRef<any>;
@ViewChild('VFI_CouponCode') VFI_CouponCode: TemplateRef<any>;
@ViewChild('VFI_QRVoucherNo') VFI_QRVoucherNo: TemplateRef<any>;
@ViewChild('VFI_VASRefId') VFI_VASRefId: TemplateRef<any>;
@ViewChild('VFI_PaybyMerchantOrderNo') VFI_PaybyMerchantOrderNo: TemplateRef<any>;
@ViewChild('VFI_PaybyOrderNo') VFI_PaybyOrderNo: TemplateRef<any>;
@ViewChild('VFI_MerchantOrderNo') VFI_MerchantOrderNo: TemplateRef<any>;
@ViewChild('VFI_AliPayOrderNo') VFI_AliPayOrderNo: TemplateRef<any>;
@ViewChild('VFI_MerRefNo') VFI_MerRefNo: TemplateRef<any>;
@ViewChild('VFI_ServiceId') VFI_ServiceId: TemplateRef<any>;
@ViewChild('VFI_ServiceType') VFI_ServiceType: TemplateRef<any>;
@ViewChild('VFI_ServiceCount') VFI_ServiceCount: TemplateRef<any>;
@ViewChild('VFI_ServiceData') VFI_ServiceData: TemplateRef<any>;
@ViewChild('VFI_ServiceAmount') VFI_ServiceAmount: TemplateRef<any>;
@ViewChild('VFI_VatAmount') VFI_VatAmount: TemplateRef<any>;
@ViewChild('VFI_ConfirmationCode') VFI_ConfirmationCode: TemplateRef<any>;

  rating_reason: any;
  question: any;
  totalStars = 5;
  
  stars: number[] = Array.from({ length: this.totalStars });

  selectedStars = 0;


  reason: any;

  likes: any=[];
  vfi: any;
  social_data: any;

  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private authFackservice: AuthfakeauthenticationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")?this.route.snapshot.paramMap.get("id"):'';
    this.getDetails();
    this.myForm = new FormGroup({          
      'email':new FormControl(null,[Validators.required,Validators.email])

 })
  }
getclass(element){
  var size=element.class=='h'?'col-6 ':'col-12'
  return size;
}
rate(stars: number): void {
  this.selectedStars = stars;
}  
getalignment(element){
  var align=element.align=='r'?'text-end':element.align=='c'?'text-center':'text-start';
  return align;
}
  ngAfterViewInit() {
  
  }
  getDetails(){
    if(this.id){
      let url='api/billDetails?ref='+this.id
      this.authFackservice.get(url).subscribe(
        res => {
          if(res['status']==true){
            if(res['data'].length>0){
              this.data =res['data'][0];
              console.log(this.data.created_at)
              if(this.data.vfi_details){
                this.vfi=JSON.parse(this.data.vfi_details);                
              }
              this.social_data=this.data.social?JSON.parse(this.data.social):{facebook:'',insta:'',linkedin:'',youtube:'',twitter:''}
              this.template=JSON.parse(this.data.template);
              this.count=JSON.parse(this.data.Product_Details).length;
              this.rating_reason=JSON.parse(this.data.reason)
              this.question=JSON.parse(this.data.question);
              // this.getimage(this.data.logo)
            }
            
          }
        });
    }
  }

  setlikes(id,value){
    let index=this.likes.findIndex(x => x.id ==id)
    if(index!=-1){
      this.likes[index].value=value
    } else{
      this.likes.push({id:id,value:value})
    }
  }
  getClass(id){
    let index=this.likes.findIndex(x => x.id ==id)
    if(index!=-1){
      return this.likes[index].value

    }
  }
  showFloat(x){
    return parseFloat(x)
  }
  submitfeedback(){
    // let body={req_id:  this.data.req_id ,likes:this.likes,rating:this.rating,reason:this.reason}
    // this.authFackservice.post('api/feedback',body).subscribe(
    //   res => {
    //     if(res['status']==true){

    //     }
    //   })
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
  typeSubmit(){
    if(this.id){
      let url='api/sendemail?email='+this.myForm.value.email+'&reference='+this.id
      this.authFackservice.get(url).subscribe(
        res => {
          if(res['status']==true){
            Swal.fire('', 'Email has been sent to your E-mail ID.', 'success');
          }
        });
    }
  }

//Usage example:


  download(){
        this.authFackservice.setLoader(true)
         
    this.changeview(2);
    setTimeout(()=>{
      var data = document.getElementById('canvases');
      var id=this.id;
      let a=this.authFackservice;
      htmlToImage.toJpeg(data)
      .then(function (dataUrl) {
        var img = new Image()
        img.src = dataUrl;
        var link = document.createElement('a');
        link.download = id+'.jpeg';
        link.href = dataUrl;
        link.click();
        a.setLoader(false)

    })
    },100)
 
        //   let pdf = new jsPDF('p', 'mm', 'a4');
      //   const imgProps= pdf.getImageProperties(dataUrl);

      //   const width = pdf.internal.pageSize.getWidth();
      //   const height = (imgProps.height * width) / imgProps.width;
      //           pdf.addImage(img, 'jpg',  0, 0, width, height)
      //   pdf.save('pdf.pdf')
      //   // var opt = {
      //   //   margin:       1,
      //   //   filename:     'e-receipt.pdf',
      //   //   image:        { type: 'jpeg', quality: 0.98 },
      //   //   html2canvas:  { scale: .5 , useCORS: true},
      //   //   jsPDF:        { unit: 'in', format: 'letter', orientation: 'portrait' }
      //   // };     
      //   //    var worker = html2pdf().from(data).set(opt).save();
      //     });
        // let pdf = new jsPDF('p', 'mm', 'a4');
        // html2canvas(data,{ useCORS: true}).then(canvas => {
        //   var imgWidth = 208;
        //   var imgHeight = canvas.height * imgWidth / canvas.width;
        //   const contentDataURL = canvas.toDataURL('image/png')
        //   var position = 0;
        //   pdf.addImage(contentDataURL, 'PNG', 0, position, imgWidth, imgHeight)
        //   pdf.save(this.id+'.pdf');
        // })
    
     

  }
  // rate(r){
  //   this.rating=r
  // }
  reasoning(x){
    this.reason=x
  }
 
}
