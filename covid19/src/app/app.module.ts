import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';


import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HelplineComponent } from './helpline/helpline.component';
import { AdvisoryComponent } from './advisory/advisory.component';
import { HospitalComponent } from './hospital/hospital.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HelplineComponent,
    AdvisoryComponent,
    HospitalComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatTabsModule,
    RouterModule.forRoot([
      {path: '', component: HelplineComponent},
      {path: 'advisory', component: AdvisoryComponent},
      {path: 'hospital', component: HospitalComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
