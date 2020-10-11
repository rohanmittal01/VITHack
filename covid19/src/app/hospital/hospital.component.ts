import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HospitalComponent implements OnInit {
  data: any;
  medData: any;
  searchKey: string;
  filteredData: any;
  filteredDataTemp: any;
  filteredMedData: any;
  filteredMedDataTemp: any = [];
  states = [];
  stateFilter = '';
  city = [];
  cityFilter = '';
  types = [];
  typeFilter = '';
  constructor(private apiService: ApiService) {
    this.apiService.hospital().subscribe((x) => {
      this.data = x;
      this.filteredData = this.data.data.regional;
      // console.log(this.data);
      for (var i = 0; i < this.data.data.regional.length; i++) {
        this.states.push(this.data.data.regional[i].state);
      }
      // console.log(this.states);
      // this.split();
      // console.log(this.data.data.contacts.regional.length());
    });
    this.apiService.medicalColleges().subscribe((x) => {
      this.medData = x;
      this.filteredMedData = this.medData.data.medicalColleges;
      for (var i = 0; i < this.medData.data.medicalColleges.length; i++) {
        this.city.push(this.medData.data.medicalColleges[i].state);
        if (this.medData.data.medicalColleges[i].ownership != null) {
          this.types.push(this.medData.data.medicalColleges[i].ownership);
        }
      }
      let temp = this.types.filter((v, i, a) => a.indexOf(v) === i);
      this.types = temp;
  
    });
  }

  applyFilter() {
    // console.log(this.searchKey);
    // this.filteredMedData = [];
    // console.log(this.medData.data.medicalColleges);
    // console.log(this.cityFilter);
    if (this.cityFilter == 'All') {
      this.filteredMedData = this.medData.data.medicalColleges;
      // console.log('here');
    } else {
      this.filteredMedDataTemp = [];
      for (var i = 0; i < this.medData.data.medicalColleges.length; i++) {
        // console.log(this.medData.data.medicalColleges[i]);
        var a = this.medData.data.medicalColleges[i].state;

        if (a.toLowerCase().indexOf(this.cityFilter.toLowerCase()) > -1) {
          this.filteredMedDataTemp.push(this.medData.data.medicalColleges[i]);
        }
      }
      this.filteredMedData = this.filteredMedDataTemp;
    }
    this.typeFilter == 'All';
    // console.log(this.filteredMedData);
  }

  applyFilter2() {
    // console.log(this.searchKey);
    // this.filteredMedData = [];
    // console.log(this.medData.data.medicalColleges);
    // console.log(this.stateFilter);
    if (this.stateFilter == 'All') {
      this.filteredData = this.data.data.regional;
      // console.log('here');
    } else {
      this.filteredDataTemp = [];
      for (var i = 0; i < this.data.data.regional.length; i++) {
        // console.log(this.medData.data.medicalColleges[i]);
        var a = this.data.data.regional[i].state;
        if (a.toLowerCase().indexOf(this.stateFilter.toLowerCase()) > -1) {
          this.filteredDataTemp.push(this.data.data.regional[i]);
        }
      }
      this.filteredData = this.filteredDataTemp;
    }

    // console.log(this.filteredData);
  }

  applyFilter3() {
    // console.log(this.searchKey);
    // this.filteredMedData = [];
    // console.log(this.medData.data.medicalColleges);
    // console.log(this.typeFilter);
    if (this.typeFilter == 'All') {
      this.filteredMedData = this.medData.data.medicalColleges;
      // console.log('here');
    } else {
      this.filteredMedDataTemp = [];
      for (var i = 0; i < this.medData.data.medicalColleges.length; i++) {
        // console.log(this.medData.data.medicalColleges[i].ownership);
        var a = this.medData.data.medicalColleges[i].ownership;
        if (a != null) {
          if (a.toLowerCase() == this.typeFilter.toLowerCase()) {
            this.filteredMedDataTemp.push(this.medData.data.medicalColleges[i]);
          }
        }
      }
      this.filteredMedData = this.filteredMedDataTemp;
      // console.log(this.filteredMedData);
    }
    this.cityFilter == 'All';
    // console.log(this.filteredMedData);
  }

  onSearchClear() {
    this.searchKey = '';
    this.applyFilter();
  }
  ngOnInit(): void {}
}
