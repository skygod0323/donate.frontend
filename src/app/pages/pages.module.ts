import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { PagesRoutes } from './pages.routing';
import { HomePageComponent } from './home/home.component';
import { MaterialModule } from '../shared/material.module';
import { AboutPageComponent } from './about/about.component';
import { SharedModule } from '../shared/shared.module';
import { DonatePageComponent } from './donate/donate.component';
import { NgxCcModule } from "ngx-cc";
import { ThankyouPageComponent } from './thankyou/thankyou.component';
import { DonorWallPageComponent } from './donorwall/donorwall.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(PagesRoutes),
    FormsModule,
    ReactiveFormsModule,
    MaterialModule,
    SharedModule,
    NgxCcModule
  ],
  declarations: [
    HomePageComponent,
    AboutPageComponent,
    DonatePageComponent,
    ThankyouPageComponent,
    DonorWallPageComponent
  ]
})

export class PagesModule { }