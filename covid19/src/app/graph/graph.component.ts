import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase } from 'angularfire2/database';

@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.css']
})
export class GraphComponent implements OnInit {

  dataValues:any;
  constructor(private db: AngularFireDatabase) {
    this.db.list('/').valueChanges().subscribe(x => {
      this.dataValues = x;
      console.log(this.dataValues);
    })
  }

  ngOnInit(): void {
  }

}
