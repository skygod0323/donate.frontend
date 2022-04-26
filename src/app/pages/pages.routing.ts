import { Routes } from '@angular/router';

import { HomePageComponent } from './home/home.component';
import { AboutPageComponent } from './about/about.component';
import { DonatePageComponent } from './donate/donate.component';
import { ThankyouPageComponent } from './thankyou/thankyou.component';
import { DonorWallPageComponent } from './donorwall/donorwall.component';

export const PagesRoutes: Routes = [
  {
    path: '',
    component: HomePageComponent
  },
  {
    path: 'donate',
    component: DonatePageComponent
  },
  {
    path: 'about',
    component: AboutPageComponent
  },
  {
    path: 'thankyou',
    component: ThankyouPageComponent
  },
  {
    path: 'donor_wall',
    component: DonorWallPageComponent
  },
];
