import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CreditCardValidators } from 'angular-cc-library';
import { Api } from 'src/app/services/api.service';
import { NotifyService } from 'src/app/services/notify.service';
import { Validate } from 'src/app/services/validate.service';

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

  constructor(
    private _fb: FormBuilder,
    public validate: Validate,
    public notify: NotifyService,
    private api: Api,
    public router: Router,
  ) { }

  ngOnInit() {
    this.paymentForm = this._fb.group({
      cardNumber: [''],
      expDate: [''],
      cardCVV: ['']
    });

    this.accountForm = this._fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
      phone: ['', Validators.required],
      donorWall: [true],
      donorWallName: [''],
      getMail: [true],
      getSMS: [true],
      giftAdd: [false]
    })

    this.billingForm = this._fb.group({
      company: ['', Validators.required],
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

    if (!this.paymentForm.valid) {
      this.validate.validateAllFormFields(this.paymentForm);
      this.notify.showNotification('error', 'Please complete form before make donation');
      return;
    }

    if (!this.amount || this.amount <= 0) {
      this.notify.showNotification('error', 'Please input valid amount');
    }

    const data = {
      donate_type: this.donate_type,
      account: this.accountForm.value,
      billing: this.billingForm.value,
      card: {amount: this.amount, ...this.paymentForm.value}
    }

    console.log('data: ', data);

    this.api.donate(data).subscribe

    this.notify.showLoading()
    this.api.donate(data).subscribe((res: any) => {
      this.notify.hideLoading();

      console.log(res);

      if (res.success) {
        console.log('success');
        this.router.navigate(['/thankyou']);
      } else {
        this.notify.showNotification('error', 'Please check if you put correct card inforation');
      }

    }, error => {
      this.notify.hideLoading();
      this.notify.showNotification('error', 'Please check if you put correct card inforation');
    })
    
  }



  changeDonateType(type: any) {
    if (type == 'single') {
      this.amount = 500;
    } else {
      this.amount = 50;
    }

    this.donate_type = type;
  }

  changeMontlyAmount(amount: number) {
    this.amount = amount;
  }

  changeSingleAmount(amount: number) {
    this.amount = amount;
  }

  handleChangeAmount(amount: any) {
    this.amount = amount
  }

  getGIftAidText() {
    const giftAddAmount = this.amount * 1.25;

  }

}