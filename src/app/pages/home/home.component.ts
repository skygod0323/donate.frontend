import { Component, OnInit } from '@angular/core';
import { Api } from 'src/app/services/api.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomePageComponent implements OnInit {

  constructor(
    public api: Api,
    public notify: NotifyService,
  ) { }

  ngOnInit() {

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
