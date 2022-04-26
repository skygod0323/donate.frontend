import { Component, OnInit } from '@angular/core';
import { Api } from 'src/app/services/api.service';
import { NotifyService } from 'src/app/services/notify.service';

@Component({
  selector: 'app-donorwall',
  templateUrl: './donorwall.component.html',
  styleUrls: ['./donorwall.component.scss']
})
export class DonorWallPageComponent implements OnInit {

  public donor_wall: any = {}
  constructor(
    public api: Api,
    public notify: NotifyService
  ) { }

  ngOnInit() {
    // this.notify.showLoading()
    this.api.donorWall().subscribe((res: any) => {
      // this.notify.hideLoading();
      if (res.success) {
        this.donor_wall = res.data
        console.log(res.data);
      } else {
        this.notify.showNotification('error', 'Unkown Error Occured');  
      }
    }, (error: any) => {
      // this.notify.hideLoading();
      this.notify.showNotification('error', 'Unkown Error Occured');
    })
  }

}