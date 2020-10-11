import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule, NoopAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {MatTabsModule} from '@angular/material/tabs';
import { MatFormFieldModule} from '@angular/material/form-field';
import { MatIconModule} from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule} from '@angular/material/select';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { FusionChartsModule } from 'angular-fusioncharts';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import * as FusionCharts from "fusioncharts";
import * as charts from "fusioncharts/fusioncharts.charts";
import * as FusionTheme from "fusioncharts/themes/fusioncharts.theme.fusion";
import * as CandyTheme from "fusioncharts/themes/fusioncharts.theme.umber";
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { RouterModule } from '@angular/router';
import { HelplineComponent } from './helpline/helpline.component';
import { AdvisoryComponent } from './advisory/advisory.component';
import { HospitalComponent } from './hospital/hospital.component';
import { environment } from 'src/environments/environment';
import { GraphComponent } from './graph/graph.component';

FusionChartsModule.fcRoot(FusionCharts, charts, FusionTheme, CandyTheme);
@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HelplineComponent,
    AdvisoryComponent,
    HospitalComponent,
    GraphComponent
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
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AngularFireDatabaseModule,
    FusionChartsModule,
    AngularFireModule.initializeApp(environment.firebase),
    RouterModule.forRoot([
      {path: '', component: HelplineComponent},
      {path: 'helpline', component: HelplineComponent},
      {path: 'advisory', component: AdvisoryComponent},
      {path: 'hospital', component: HospitalComponent},
      {path: 'graph', component: GraphComponent},
      {path: '*', component: HelplineComponent}
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
