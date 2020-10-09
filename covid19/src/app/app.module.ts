import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HelplineComponent } from './helpline/helpline.component';
import { AdvisoryComponent } from './advisory/advisory.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HelplineComponent,
    AdvisoryComponent
  ],
  imports: [
    BrowserModule,
    NgbModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NoopAnimationsModule,
    RouterModule.forRoot([
      {path: '', component: HelplineComponent},
      {path: 'advisory', component: AdvisoryComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
