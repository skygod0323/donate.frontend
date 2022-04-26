import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Validate } from 'src/app/services/validate.service';
import { environment } from '../../../../environments/environment';

declare var Stripe: any;

const stripe = Stripe(environment.stripeKey);

@Component({
  selector: 'checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.scss']
})
export class CheckoutModalComponent implements OnInit {

  public elements: any;

  constructor(
    public dialogRef: MatDialogRef<CheckoutModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    public validate: Validate,

  ) {

  }

  ngOnInit() {
    console.log(this.data);
    const options = {
		  clientSecret: this.data.client_secret,
		  // Fully customizable with appearance API.
		  appearance: {/*...*/},
		};

		// Set up Stripe.js and Elements to use in checkout form, passing the client secret obtained in step 2
		this.elements = stripe.elements(options);

		// Create and mount the Payment Element
		const paymentElement = this.elements.create('payment');
		paymentElement.mount('#payment-element');
		
		const form = document.getElementById('payment-form');

    // form.addEventListener('submit', async (event) => {
		//   event.preventDefault();
		// });
  }

  async submit() {
    const {error} = await stripe.confirmPayment({
			//`Elements` instance that was used to create the Payment Element
			elements: this.elements,
			confirmParams: {
			  return_url: environment.frontUrl + '/thankyou',
			},
		  });

		  if (error) {
			// This point will only be reached if there is an immediate error when
			// confirming the payment. Show error to your customer (for example, payment
			// details incomplete)
			console.log(error);
		  } else {
			// Your customer will be redirected to your `return_url`. For some payment
			// methods like iDEAL, your customer will be redirected to an intermediate
			// site first to authorize the payment, then redirected to the `return_url`.
		  }
  }

  apply() {
    this.dialogRef.close({ type: 'apply', data: '' });
  }

  cancel() {
    this.dialogRef.close({ type: 'cancel' });
  }
}