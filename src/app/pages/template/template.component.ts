import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormBuilder,FormControl, FormGroup, Validators } from '@angular/forms';

import { AuthfakeauthenticationService } from '../../core/services/authfake.service';
import Swal from 'sweetalert2';
import { ActivatedRoute, Router } from '@angular/router';
import {CdkDragDrop, moveItemInArray, transferArrayItem} from '@angular/cdk/drag-drop';


@Component({
  selector: 'app-template',
  templateUrl: './template.component.html',
  styleUrls: ['./template.component.scss']
})

/**
 * bill component
 */
export class TemplateComponent implements OnInit, AfterViewInit {
  view=1;
  // set the currenr year
  year: number = new Date().getFullYear();
  id: string;
  data:any;
  count=0;
  myForm:FormGroup;  
  search='';
  searchlist=[];
  breadCrumbItems;
  // tslint:disable-next-line: max-line-length
  constructor(private formBuilder: FormBuilder, private route: ActivatedRoute, private router: Router,
    private authFackservice: AuthfakeauthenticationService) { }

  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id")?this.route.snapshot.paramMap.get("id"):'';
    this.getDetails();
  
  }

  ngAfterViewInit() {
  }
  getDetails(){
    if(this.id){
      let url='merchants/getTemplate?loc_id='+this.id
      this.authFackservice.get(url).subscribe(
        res => {
          if(res['status']==true){
            if(res['data'].length>0){
            this.todo=JSON.parse(res['data'][0]['data']);
            let d=[]
            this.done=this.done.filter(x=>{
              return ((this.todo.findIndex(t=> t.id === x.id) === -1))
            });
            this.searchlist= this.done;
            }else{
              this.searchlist= this.done;
            }
          }
        });
    }
  }
  todo = [
    
  ];
  makefull(i){
    this.todo[i].class=''
  }
  makehalf(i){
    this.todo[i].class='h'
  }
  align(a,i){
    this.todo[i].align=a

  }
  done = [
    {id:'logo',label:'Logo Section', type:1},
    {id:'address',label:'Address Section', type:1},
    {id:'name',label:'Store Name', type:1},
    {id:'trn',label:'TRN Number', type:1},
    {id:'phone',label:'Phone Number', type:1},
    {id:'headline',label:'Brand Name', type:1},
    {id:'greetings',label:'Greetings', type:1},
    {id:'item_count',label:'Item Count & Invoice',type:1},
    {id:'invoice',label:'Invoice Number',type:1},
    {id:'date',label:'Date', type:1},
    {id:'Receipt_No',label:'Receipt Number', type:1},
    {id:'Store_Code',label:'Store Code', type:1},
    {id:'Cashier',label:'Sales Person/Cashier', type:1},
    {id:'Total_Discount',label:'Total Discount', type:1},
    {id:'Serial_number',label:'Serial Number', type:1},
    {id:'Customer_ID',label:'Customer ID', type:1},
    {id:'Customer_Name',label:'Customer Name', type:1},

    {id:'product',label:'Product Details', type:1},
    {id:'tax',label:'Tax and Amount Details', type:1},
    {id:'mode',label:'Mode of Payment',type:1},
    {id:'order_type',label:'Order Type',type:1},
    // {id:'card',label:'EFT Trans No', type:1},
    {id:'batch',label:'Batch Number', type:1},
    {id:'app_ver',label:'Application Version', type:1},
    {id:'VFI_TID',label:'Terminal ID', type:1},
    {id:'VFI_MID',label:'MID', type:1},
    {id:'VFI_POSID',label:'POS ID', type:1},
    {id:'VFI_TxnType',label:'Transaction Type', type:1},
    {id:'VFI_CardScheme',label:'Card Scheme Name ', type:1},
    {id:'expiry',label:'Card Expiry', type:1},
    {id:'privacy_url',label:'Privacy Policy URL', type:1},
    {id:'privacy_content',label:'Privacy Policy Content', type:1},
    {id:'conditions_url',label:'Terms and Conditions URL', type:1},
    {id:'conditions_content',label:'Terms and Conditions Content', type:1},
    {id:'return_url',label:'Returns and Refund Policy URL', type:1},
    {id:'return_content',label:'Returns and Refund Policy Content', type:1},
    {id:'social',label:'Social Media Links', type:1},
    {id:'VFI_CardNum',label:'Card Number', type:1},
    {id:'pan',label:'PAN SEQ NO (Primary Account Number Sequence)', type:1},
    {id:'VFI_RRN',label:'Host Ref No.', type:1},
    {id:'base',label:'Base', type:1},
    {id:'tip',label:'Tip', type:1},
    {id:'dcc',label:'DCC Message', type:1},
    {id:'PYCCurrAmount',label:'PYC Amount (Pay Your Currency Amount)', type:1},
    {id:'disclaimer',label:'Disclaimer', type:1},
    {id:'signature',label:'Signature',type:1},
    {id:'approval',label:'Approval Code', type:1},
    {id:'aid',label:'AID (Application Identifier)', type:1},
    {id:'app',label:'App Name', type:1},
    {id:'pre',label:'PRE.Name', type:1},
    {id:'tvr',label:'TVR (Terminal Verification Result)', type:1},
    {id:'tsi',label:'TSI (Terminal Status Information)', type:1},
    {id:'info',label:'AC Info (Application Cryptogram Information)', type:1},
    {id:'ac',label:'AC', type:1},
    {id:'barcode',label:'Barcode', type:1},
      { id: 'VFI_TransType', label: 'Transaction Type', type: 1 },
      { id: 'VFI_CHName', label: 'Card Holder Name', type: 1 },
      { id: 'VFI_MessNum', label: 'MessNum', type: 1 },
      { id: 'VFI_TransSource', label: 'Transaction Source', type: 1 },
      { id: 'VFI_AuthMode', label: 'Authentication Mode', type: 1 },
      { id: 'VFI_CHVerification', label: 'Card Holder Verification', type: 1 },
      { id: 'VFI_RespCode', label: 'Response Code', type: 1 },
      { id: 'VFI_RespMess', label: 'Response Message', type: 1 },
      { id: 'VFI_DBCount', label: 'DB Count', type: 1 },
      { id: 'VFI_CRCount', label: 'CR Count', type: 1 },
      { id: 'VFI_DBAmount', label: 'DB Amount', type: 1 },
      { id: 'VFI_CRAmount', label: 'CR Amount', type: 1 },
      { id: 'VFI_AdditionalInfo', label: 'Additional Info', type: 1 },
      { id: 'VFI_ReportType', label: 'Report Type', type: 1 },
      { id: 'VFI_ExchRate', label: 'Exchange Rate', type: 1 },
      { id: 'VFI_MarkUp', label: 'Markup', type: 1 },
      { id: 'VFI_PYCCurrName', label: 'Currency Name', type: 1 },
      { id: 'VFI_OptinOut', label: 'OptinOut', type: 1 },
      { id: 'VFI_QPSVeps', label: 'QPS Veps', type: 1 },
      { id: 'VFI_CashAmount', label: 'Cash Amount', type: 1 },
      { id: 'VFI_Epp_Tenor', label: 'EPP Tenor', type: 1 },
      { id: 'VFI_Epp_Invoice', label: 'EPP Invoice', type: 1 },
      { id: 'VFI_Surcharge', label: 'Surcharge', type: 1 },
      { id: 'VFI_VoucherNo', label: 'Voucher No', type: 1 },
      { id: 'VFI_CouponMessage', label: 'Coupon Message', type: 1 },
      { id: 'VFI_CouponCode', label: 'Coupon Code', type: 1 },
      { id: 'VFI_QRVoucherNo', label: 'QR Voucher No', type: 1 },
      { id: 'VFI_VASRefId', label: 'VAS Reference Id', type: 1 },
      { id: 'VFI_PaybyMerchantOrderNo', label: 'Pay by Merchant Order No', type: 1 },
      { id: 'VFI_PaybyOrderNo', label: 'Pay by Order No', type: 1 },
      { id: 'VFI_MerchantOrderNo', label: 'Merchant Order No', type: 1 },
      { id: 'VFI_AliPayOrderNo', label: 'AliPay Order No', type: 1 },
      { id: 'VFI_MerRefNo', label: 'Merchant Reference No', type: 1 },
      { id: 'VFI_ServiceId', label: 'Service ID', type: 1 },
      { id: 'VFI_ServiceType', label: 'Service Type', type: 1 },
      { id: 'VFI_ServiceCount', label: 'Service Count', type: 1 },
      { id: 'VFI_ServiceData', label: 'Service Data', type: 1 },
      { id: 'VFI_ServiceAmount', label: 'Service Amount', type: 1 },
      { id: 'VFI_VatAmount', label: 'VAT Amount', type: 1 },
      { id: 'VFI_ConfirmationCode', label: 'Confirmation Code', type: 1 }
    
    
    
    // {id:'tnc_content',label:'Terms & Conditions/Privacy Policy Content',type:1},
    // {id:'tnc_url',label:'Terms & Conditions/Privacy Policy URL',type:1}
  ];
  addText(bold){
    this.todo.push({id:'',label:'Enter text here...',type:2,bold:bold})
  }
  onSearch(){
    this.searchlist=this.done.filter(x=>{
      return x.label.toLowerCase().includes(this.search.toLowerCase())
    })
  }
  onEditClick(event,i){
    this.todo[i].editable=true;
    if(this.todo[i].label=='Enter text here...')
    this.todo[i].label=''
  }
  focusout(event,i){
    this.todo[i].editable=false;
  }
  setValue(event,i){
    this.todo[i].label=event
  }
  drop(event: CdkDragDrop<string[]>) {
    console.log( event.container.data)
    if (event.previousContainer === event.container) {
      moveItemInArray(event.container.data, event.previousIndex, event.currentIndex);
    } else {
      transferArrayItem(event.previousContainer.data,
                        event.container.data,
                        event.previousIndex,
                        event.currentIndex);
      // this.saveData()
    }
  }
   saveData(){
    let data={loc_id:this.id,data:JSON.stringify(this.todo)};
    this.authFackservice.post('merchants/addTemplate',data).subscribe(
      res => {
        if(res['status']==true){
          Swal.fire('Success!', 'Template has been added.', 'success');
        }else{
          Swal.fire('Error!', res['message'], 'error');

        }
      });  
      }
   
}
