import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Api } from '../services/api.service';
import { NotifyService } from '../services/notify.service';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss']
})
export class LayoutComponent implements OnInit {

  constructor(
    public router: Router,
    public notify: NotifyService,
    public api: Api
  ) { }

  ngOnInit() {
  }

  goto(url: any) {
    this.router.navigate([url]);
  }

  handleCryptoDonation() {
    location.href = 'https://commerce.coinbase.com/checkout/3654946a-1a66-474e-98e4-42ed7ed2f9e5';
  }
}
