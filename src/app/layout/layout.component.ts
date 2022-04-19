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

    this.notify.showLoading()
    this.api.cryptoDonation().subscribe((res: any) => {
      this.notify.hideLoading();
      if (res.success) {
        window.open(res.hosted_url);
      } else {
        this.notify.showNotification('error', 'Unkown Error Occured');  
      }
    }, error => {
      this.notify.hideLoading();
      this.notify.showNotification('error', 'Unkown Error Occured');
    })
  }
}
