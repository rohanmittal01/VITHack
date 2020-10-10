import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class HospitalComponent implements OnInit {
  data: any;
  medData: any;
  searchKey: string;
  filteredData:any;
  filteredDataTemp:any;
  filteredMedData: any;
  filteredMedDataTemp: any = [];
  constructor(private apiService: ApiService) {
    this.apiService.hospital().subscribe((x) => {
      this.data = x;
      this.filteredData = this.data.data.regional;
      console.log(this.data);
      // this.split();
      // console.log(this.data.data.contacts.regional.length());
    });
    this.apiService.medicalColleges().subscribe((x) => {
      this.medData = x;
      this.filteredMedData = this.medData.data.medicalColleges;
    });
  }

  applyFilter() {
    // console.log(this.searchKey);
    // this.filteredMedData = [];
    // console.log(this.medData.data.medicalColleges);
    this.filteredMedDataTemp = [];
    for (var i = 0; i < this.medData.data.medicalColleges.length; i++) {
      // console.log(this.medData.data.medicalColleges[i]);
      var a = this.medData.data.medicalColleges[i].city;
      if (a.toLowerCase().indexOf(this.searchKey.toLowerCase()) > -1) {
        this.filteredMedDataTemp.push(this.medData.data.medicalColleges[i]);
      }
    }
    this.filteredMedData = this.filteredMedDataTemp;
    console.log(this.filteredMedData);
  }

  applyFilter2() {
    // console.log(this.searchKey);
    // this.filteredMedData = [];
    // console.log(this.medData.data.medicalColleges);
    this.filteredDataTemp = [];
    for (var i = 0; i < this.data.data.regional.length; i++) {
      // console.log(this.medData.data.medicalColleges[i]);
      var a = this.data.data.regional[i].state;
      if (a.toLowerCase().indexOf(this.searchKey.toLowerCase()) > -1) {
        this.filteredDataTemp.push(this.data.data.regional[i]);
      }
    }
    this.filteredData = this.filteredDataTemp;
    console.log(this.filteredData);
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  ngOnInit(): void {}
}
