import { Component, OnInit } from '@angular/core';
import { Api } from 'src/app/services/api.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {

  public summary = {total_amount: 0, count: 0}

  constructor(
    public api: Api,
    public notify: NotifyService,
  ) { }

  ngOnInit() {
    // this.notify.showLoading()
    this.api.donationSummary().subscribe((res: any) => {
      // this.notify.hideLoading();
      if (res.success) {
        this.summary = {
          total_amount: res.total_amount,
          count: res.count
        }
      } else {
        this.notify.showNotification('error', 'Unkown Error Occured');  
      }
    }, (error: any) => {
      // this.notify.hideLoading();
      this.notify.showNotification('error', 'Unkown Error Occured');
    })
  }

  handleCryptoDonation() {

    this.notify.showLoading()
    this.api.cryptoDonation().subscribe((res: any) => {
      this.notify.hideLoading();
      if (res.success) {
        location.href = res.hosted_url;
      } else {
        this.notify.showNotification('error', 'Unkown Error Occured');  
      }
    }, (error: any) => {
      this.notify.hideLoading();
      this.notify.showNotification('error', 'Unkown Error Occured');
    })
  }
  
}
