import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Chart } from 'chart.js';
import * as FusionCharts from 'fusioncharts';
import * as fusioncharts from 'fusioncharts';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GraphComponent implements OnInit {
  // tslint:disable-next-line: ban-types
  dataSource: Object;
  arr: any = [];
  mailId = '';
  states: any = [];
  stateFilter = '';

  genders: any = [];
  genderFilter = '';

  agesVal = [
    '0-9',
    '10-19',
    '20-29',
    '30-39',
    '40-49',
    '50-59',
    '60- 69',
    '70 +',
  ];
  ages: any = [
    { min: 0, max: 9 },
    { min: 10, max: 19 },
    { min: 20, max: 29 },
    { min: 30, max: 39 },
    { min: 40, max: 49 },
    { min: 50, max: 59 },
    { min: 60, max: 69 },
    { min: 70, max: 130 },
  ];
  ageFilter = '';
  fromFilter = '';
  toFilter = '';
  dateFilter = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });


  filteredData = [];
  filteredDataTemp = [];
  dataValues: any;
  sortedData: any = [];
  dict: any = {};
  constructor(private db: AngularFireDatabase) {
    console.log('data: ', this.dateFilter.value);
    this.db
      .list('/')
      .valueChanges()
      .subscribe((x) => {
        this.dataValues = x;
        // console.log(this.dataValues);
        // tslint:disable-next-line: prefer-for-of
        this.filteredData = this.dataValues;
        for (var i = 0; i < this.dataValues.length; i++) {
          if (
            this.dataValues[i].state != null &&
            this.dataValues[i].state != ''
          ) {
            this.states.push(this.dataValues[i].state);
          }
          if (
            this.dataValues[i].gender != null &&
            this.dataValues[i].gender != ''
          ) {
            this.genders.push(this.dataValues[i].gender);
          }
        }
        let temp = this.states.filter((v, i, a) => a.indexOf(v) === i);
        this.states = temp;
        temp = this.genders.filter((v, i, a) => a.indexOf(v) === i);
        this.genders = temp;
        console.log(this.states);
        this.filter(this.dataValues);
      });
  }

  // Preparing the chart data

  filter(data) {
    this.dict = {};
    for (let i = 0; i < data.length; i++) {
      // console.log(this.dataValues[i].reportedOn);
      if (data[i].reportedOn in this.dict) {
        // console.log('true');
        this.dict[data[i].reportedOn] = this.dict[data[i].reportedOn] + 1;
      } else {
        this.dict[data[i].reportedOn] = 1;
        // console.log('false');
      }
    }
    this.arr = [];
    for (const [key, value] of Object.entries(this.dict)) {
      this.arr.push({ label: key, value: value });
    }
    const dataSource = {
      chart: {
        caption: 'Deceased due to Coronavirus [2020]', // Set the chart caption
        subCaption: '', // Set the chart subcaption
        xAxisName: 'Dates', // Set the x-axis name
        yAxisName: 'Deaths', // Set the y-axis name
        numberSuffix: '',
        theme: 'fusion', // Set the theme for your chart
      },
      // Chart Data - from step 2
      data: this.arr,
    };
    this.dataSource = dataSource;
  }

  applyFilter() {
    // console.log(this.searchKey);
    // this.filteredMedData = [];
    // console.log(this.medData.data.medicalColleges);
    // console.log(this.stateFilter);
    console.log('date: ', this.convertDate(this.dateFilter.value.start));
    this.fromFilter = this.convertDate(this.dateFilter.value.start).toString();
    this.toFilter = this.convertDate(this.dateFilter.value.end).toString();
    if (
      (this.stateFilter == 'All' || this.stateFilter == '') &&
      (this.genderFilter == 'All' || this.genderFilter == '') &&
      (this.ageFilter == 'All' || this.ageFilter == '') && 
      (this.fromFilter == '01/01/1970')
    ) {
      this.filteredData = this.dataValues;
      console.log('here');
    } else {
      this.filteredDataTemp = [];
      for (var i = 0; i < this.dataValues.length; i++) {
        // console.log(this.medData.data.medicalColleges[i]);
        var a = this.dataValues[i];
        var count = 0;
        if (this.stateFilter == 'All' || this.stateFilter == '') {
          count += 1;
        } else if (
          a.state.toLowerCase().indexOf(this.stateFilter.toLowerCase()) > -1
        ) {
          count += 1;
        }
        if (this.genderFilter == 'All' || this.genderFilter == '') {
          count += 1;
        } else if (
          a.gender.toLowerCase().indexOf(this.genderFilter.toLowerCase()) > -1
        ) {
          count += 1;
        }
        if (this.ageFilter == 'All' || this.ageFilter == '') {
          count += 1;
        } else if (a.ageEstimate.toString()[0] == this.ageFilter[0]) {
          count += 1;
        }
       
        // var d1 = Date.parse(this.fromFilter);
        // var d2 = Date.parse(a.reportedOn);
        console.log(this.fromFilter);
        console.log(this.toFilter);
        var n = a.reportedOn.localeCompare(this.fromFilter);
        if (n == 1) {
            count+=1
            console.log('here');
          }
          
         n = a.reportedOn.localeCompare(this.toFilter);
          if (n == -1) {
              count+=1
              console.log('here');
            }
        
        if (count == 5) {
          this.filteredDataTemp.push(a);
        }
      }
      this.filteredData = this.filteredDataTemp;
    }
    console.log(this.filteredData);
    this.filter(this.filteredData);
  }

  convertDate(inputFormat) {
    function pad(s) { return (s < 10) ? '0' + s : s; }
    var d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth()+1), d.getFullYear()].join('/')
  }

  exportChart(e) {
    FusionCharts.batchExport({
      exportFormat: 'pdf',
    });
  }

  sendMail() {
    var emailLink =
      'https://mail.google.com/mail/u/0/?view=cm&fs=1&to=%20&suShare%20Deceased%20Persons%20Report&body=This%20is%20regarding%20the%20IETE%20Recruitments%202020%20Portal.%20I%20was%20redirected%20to%20an%20incorrect%20link.%20Please%20specify%20the%20source%20link%20&bcc=rohan.mittal2018@vitstudent.ac.in&tf=1';
    window.open(emailLink);
  }

  ngOnInit() {}
}
