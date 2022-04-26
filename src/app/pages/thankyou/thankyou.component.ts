import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Api } from 'src/app/services/api.service';

@Component({
  selector: 'app-thankyou',
  templateUrl: './thankyou.component.html',
  styleUrls: ['./thankyou.component.scss']
})
export class ThankyouPageComponent implements OnInit {

  public intentParam = {} as any;
  constructor(
    private route: ActivatedRoute,
    private api: Api
  ) {
    
    this.route.queryParams.subscribe((params: any) => {
      if (params.payment_intent) {
        this.intentParam = params;
      }
    })
  }

  ngOnInit() {
    console.log(this.intentParam);
    if (this.intentParam.redirect_status == 'succeeded') {
      this.api.confirmPaymentIntent(this.intentParam).subscribe(res => {
        console.log(res);
      })
    }
  }

}