import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { AngularFireDatabase } from 'angularfire2/database';
import { Chart } from 'chart.js';
import * as FusionCharts from 'fusioncharts';
import * as fusioncharts from 'fusioncharts';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class GraphComponent implements OnInit {
  // tslint:disable-next-line: ban-types
loading = true;

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

  subscription1: Subscription;
  constructor(private db: AngularFireDatabase) {
    // console.log('data: ', this.dateFilter.value);
    this.subscription1 = this.db
      .list('/')
      .valueChanges()
      .subscribe((x) => {
        this.loading = true;
        this.dataValues = x;
        // console.log(this.dataValues);
        // tslint:disable-next-line: prefer-for-of
        this.filteredData = this.dataValues;
        for (let i = 0; i < this.dataValues.length; i++) {
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
        // console.log(this.states);
        this.filter(this.dataValues);
      });
    
  }

  // Preparing the chart data

  filter(data) {
    this.subscription1.unsubscribe();
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
        yAxisName: 'Deceased', // Set the y-axis name
        numberSuffix: '',
        theme: 'fusion', // Set the theme for your chart,
        exportEnabled: true
      },
      // Chart Data - from step 2
      data: this.arr,
    };
    this.dataSource = dataSource;
    this.loading = false;
  }

  applyFilter() {

    this.loading = true;
    // console.log('date: ', this.convertDate(this.dateFilter.value.start));
    this.fromFilter = this.convertDate(this.dateFilter.value.start).toString();
    this.toFilter = this.convertDate(this.dateFilter.value.end).toString();

    if (
      (this.stateFilter == 'All' || this.stateFilter == '') &&
      (this.genderFilter == 'All' || this.genderFilter == '') &&
      (this.ageFilter == 'All' || this.ageFilter == '') &&
      (this.fromFilter == '01/01/1970') &&
      (this.toFilter == '01/01/1970')
    ) {
      console.log('here');
      this.filteredData = this.dataValues;
    } else {
      this.filteredDataTemp = [];
    // tslint:disable-next-line: max-line-length
      this.fromFilter = this.fromFilter[3] + this.fromFilter[4] + '/' + this.fromFilter[0] + this.fromFilter[1] + '/' + this.fromFilter[6] + this.fromFilter[7] + this.fromFilter[8] + this.fromFilter[9];
      // tslint:disable-next-line: max-line-length
      this.toFilter = this.toFilter[3] + this.toFilter[4] + '/' + this.toFilter[0] + this.toFilter[1] + '/' + this.toFilter[6] + this.toFilter[7] + this.toFilter[8] + this.toFilter[9];
      console.log(new Date(this.fromFilter));
      console.log(new Date(this.toFilter));
      console.log('-------------------');
      // tslint:disable-next-line: prefer-for-of
      for (let i = 0; i < this.dataValues.length; i++) {
        // console.log(this.medData.data.medicalColleges[i]);
        const a = this.dataValues[i];
        let count = 0;
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
        // console.log(this.fromFilter);
        // console.log(this.toFilter);
        a.reportedOn = a.reportedOn[3] + a.reportedOn[4] + '/' + a.reportedOn[0] + a.reportedOn[1] + '/' + a.reportedOn[6] + a.reportedOn[7] + a.reportedOn[8] + a.reportedOn[9];
        
        if (this.fromFilter == '01/01/1970' && this.toFilter == '01/01/1970'){
          count += 2;
        }else{
   
          if (new Date(a.reportedOn) >= new Date(this.fromFilter)){
            // console.log(new Date(a.reportedOn));
            // console.log('here');
            count += 1;
          }
        // var n = a.reportedOn.localeCompare(this.fromFilter);
        // if (n == 1) {
        //     count+=1
        //     // console.log('here');
        //   }
        if (new Date(a.reportedOn) <= new Date(this.toFilter)){
          count += 1;
        }
        //  n = a.reportedOn.localeCompare(this.toFilter);
          // if (n == -1) {
          //     count+=1
          //     // console.log('here');
          //   }
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
    let d = new Date(inputFormat)
    return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
  }

  exportChart(e) {
    FusionCharts.batchExport({
      exportFormat: 'pdf',
    });
  }

  sendMail() {
    let emailLink =
      'https://mail.google.com/mail/u/0/?view=cm&fs=1&to=%20&su=Share%20Deceased%20Persons%20Report&body=This%20was%20generated%20from%20our%20website.%20%20Please%20download%20the%20graph%20using%20the%20Export%20PDF%20button%20and%20attach%20it.%20&bcc=rohan.mittal2018@vitstudent.ac.in&tf=1';
    window.open(emailLink);
  }

  ngOnInit() {}
}
