import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { CreditCardValidators } from 'angular-cc-library';
import { Api } from 'src/app/services/api.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Validate } from 'src/app/services/validate.service';
import { CheckoutModalComponent } from 'src/app/shared/modal/checkout-modal/checkout-modal.component';

@Component({
  selector: 'app-donate',
  templateUrl: './donate.component.html',
  styleUrls: ['./donate.component.scss']
})
export class DonatePageComponent implements OnInit {

  paymentForm: FormGroup = null as any;
  withoutMaterialForm: FormGroup = null as any;
  accountForm: FormGroup = null as any;
  billingForm: FormGroup = null as any;

  submitted: boolean = false;

  

  public donate_type = 'single';
  public amount = 500;
  public amount_type = 'fix'

  constructor(
    private _fb: FormBuilder,
    public validate: Validate,
    public notify: NotifyService,
    private api: Api,
    public router: Router,
    public dialog: MatDialog
  ) { }

  ngOnInit() {
    // this.paymentForm = this._fb.group({
    //   cardNumber: ['4242 4242 4242 4242'],
    //   expDate: ['06 / 2022'],
    //   cardCVV: ['111']
    // });

    this.accountForm = this._fb.group({
      firstName: ['Sky', Validators.required],
      lastName: ['God', Validators.required],
      email: ['kssalexander323@gmail.com', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone: ['111', Validators.required],
      donorWall: [false],
      donorWallName: [''],
      getMail: [false],
      getSMS: [false],
      giftAdd: [false]
    })

    this.billingForm = this._fb.group({
      company: [''],
      house: ['', Validators.required],
      apartment: [''],
      city: ['', Validators.required],
      country: ['', Validators.required],
      postcode: ['', Validators.required],

    })


  }

  handleDonate() {
    
    if (!this.accountForm.valid) {
      this.validate.validateAllFormFields(this.accountForm);
      this.notify.showNotification('error', 'Please complete form before make donation');
      return;
    }

    if (this.accountForm.value.donorWall && !this.accountForm.value.donorWallName) {
      this.notify.showNotification('error', 'Please input donor wall name');
      return;
    }

    if (this.accountForm.value.giftAdd && !this.billingForm.valid) {
      this.validate.validateAllFormFields(this.billingForm);
      this.notify.showNotification('error', 'Please complete form before make donation');
      return;
    }

    // if (!this.paymentForm.valid) {
    //   this.validate.validateAllFormFields(this.paymentForm);
    //   this.notify.showNotification('error', 'Please complete form before make donation');
    //   return;
    // }

    if (!this.amount || this.amount <= 0) {
      this.notify.showNotification('error', 'Please input valid amount');
    }

    const data = {
      donate_type: this.donate_type,
      account: this.accountForm.value,
      billing: this.billingForm.value,
      // card: {amount: this.amount, ...this.paymentForm.value},
      amount: this.amount
    }

    console.log('data: ', data);

    if (this.donate_type == 'single') {
      this.singleDonate(data);
    } else {
      this.subscribeDonate(data);
    }


    
  }

  singleDonate(data: any) {
    this.notify.showLoading()
    this.api.createPaymentIntent(data).subscribe((res: any) => {
      this.notify.hideLoading();

      console.log(res);

      if (res.success) {

        const client_secret = res.intent.client_secret;

        let dialogRef = this.dialog.open(CheckoutModalComponent, {
          disableClose: true,
          width: '600px',
          panelClass: 'checkout-modal-container',
          backdropClass: 'checkout-backdrop',
          data: {client_secret: client_secret}
        });
    
        dialogRef.afterClosed().subscribe(modal_res => {
          if (modal_res.type == 'apply') {
            console.log(modal_res.data);
          }
        })
      } else {
        this.notify.showNotification('error', 'Unkown error occured');
      }

    }, error => {
      this.notify.hideLoading();
      this.notify.showNotification('error', 'Unkown error occured');
    })
  }

  subscribeDonate(data: any) {
    this.notify.showLoading()
    this.api.subscribeDonation(data).subscribe((res: any) => {
      this.notify.hideLoading();

      if (res.success) {
        const client_secret = res.payment_intent.client_secret;

        let dialogRef = this.dialog.open(CheckoutModalComponent, {
          disableClose: true,
          width: '600px',
          panelClass: 'checkout-modal-container',
          backdropClass: 'checkout-backdrop',
          data: {client_secret: client_secret}
        });
    
        dialogRef.afterClosed().subscribe(modal_res => {
          if (modal_res.type == 'apply') {
            console.log(modal_res.data);
          }
        })
      } else {
        this.notify.showNotification('error', 'Unkown error occured');
      }

    }, error => {
      this.notify.hideLoading();
      this.notify.showNotification('error', 'Unkown error occured');
    })
  }



  changeDonateType(type: any) {
    this.amount_type = 'fix';
    if (type == 'single') {
      this.amount = 500;
    } else {
      this.amount = 41.67;
    }

    this.donate_type = type;
  }

  changeMontlyAmount(amount: number) {
    this.amount_type = 'fix';
    this.amount = amount;
  }

  changeSingleAmount(amount: number) {
    this.amount_type = 'fix';
    this.amount = amount;
  }

  handleChangeAmount(amount: any) {
    this.amount = amount
  }

  changeToOther() {
    this.amount_type = 'other';
    this.amount = 0;
  }

  getGIftAidText() {
    const giftAddAmount = this.amount * 1.25;

  }

}