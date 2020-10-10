import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';
import {Chart} from 'chart.js';
import * as fusioncharts from 'fusioncharts';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {
  
  dataSource: Object;
  arr: any = [];
  constructor(private db: AngularFireDatabase) {
    this.db.list('/').valueChanges().subscribe(x => {
      this.dataValues = x;
      // console.log(this.dataValues);
      // tslint:disable-next-line: prefer-for-of
      this.filter();
    });
  }

  dataValues: any;
  sortedData: any = [];
  dict: any = {};

  // Preparing the chart data

  filter(){
    for (let i = 0; i < this.dataValues.length; i++){
      // console.log(this.dataValues[i].reportedOn);
      if (this.dataValues[i].reportedOn in this.dict){
        // console.log('true');
        this.dict[this.dataValues[i].reportedOn] = this.dict[this.dataValues[i].reportedOn] + 1;
      }else{
        this.dict[this.dataValues[i].reportedOn] = 1;
        // console.log('false');
      }
    }
    for (const [key, value] of Object.entries(this.dict)) {
      console.log(key, value);
      this.arr.push({label: key, value: value});
    }
    console.log(this.arr);
    
    const dataSource = {
      chart: {
        caption: 'Deceased due to Coronavirus [2020]', // Set the chart caption
        subCaption: '', // Set the chart subcaption
        xAxisName: 'Dates', // Set the x-axis name
        yAxisName: 'Deaths', // Set the y-axis name
        numberSuffix: 'K',
        theme: 'fusion' // Set the theme for your chart
      },
      // Chart Data - from step 2
      data:this.arr
    };
    this.dataSource = dataSource;
  }

  ngOnInit(): void {

  //   var myChart = new Chart("myChart", {
  //     type: 'bar',
  //     data: {
  //         labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  //         datasets: [{
  //             label: '# of Votes',
  //             data: [12, 19, 3, 5, 2, 3],
  //             backgroundColor: [
  //                 'rgba(255, 99, 132, 0.2)',
  //                 'rgba(54, 162, 235, 0.2)',
  //                 'rgba(255, 206, 86, 0.2)',
  //                 'rgba(75, 192, 192, 0.2)',
  //                 'rgba(153, 102, 255, 0.2)',
  //                 'rgba(255, 159, 64, 0.2)'
  //             ],
  //             borderColor: [
  //                 'rgba(255, 99, 132, 1)',
  //                 'rgba(54, 162, 235, 1)',
  //                 'rgba(255, 206, 86, 1)',
  //                 'rgba(75, 192, 192, 1)',
  //                 'rgba(153, 102, 255, 1)',
  //                 'rgba(255, 159, 64, 1)'
  //             ],
  //             borderWidth: 1
  //         }]
  //     },
  //     options: {
  //         scales: {
  //             yAxes: [{
  //                 ticks: {
  //                     beginAtZero: true
  //                 }
  //             }]
  //         }
  //     }
  // });
  }

}
