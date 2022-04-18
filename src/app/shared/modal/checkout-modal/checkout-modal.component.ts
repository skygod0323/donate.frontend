import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Component, Inject, OnInit } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Validate } from 'src/app/services/validate.service';


@Component({
  selector: 'checkout-modal',
  templateUrl: './checkout-modal.component.html',
  styleUrls: ['./checkout-modal.component.scss']
})
export class CheckoutModalComponent implements OnInit {

  form: FormGroup = null as any;
  mode = '';

  constructor(
    public dialogRef: MatDialogRef<CheckoutModalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public formBuilder: FormBuilder,
    public validate: Validate,

  ) {

  }

  ngOnInit() {
    this.form = this.formBuilder.group({
      resolution: ['high', Validators.required],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$")]],
    })
  }

  apply() {
    if (this.form.valid) {
      this.dialogRef.close({ type: 'apply', data: this.form.value });
    } else {
      this.validate.validateAllFormFields(this.form);
    }

  }

  cancel() {
    this.dialogRef.close({ type: 'cancel' });
  }
}