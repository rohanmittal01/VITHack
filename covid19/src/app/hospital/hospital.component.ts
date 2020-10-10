import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-hospital',
  templateUrl: './hospital.component.html',
  styleUrls: ['./hospital.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class HospitalComponent implements OnInit {

  data:any;
  constructor(private apiService: ApiService) {
    this.apiService.hospital().subscribe((x) => {
      this.data = x;
      console.log(this.data);
      // this.split();
      // console.log(this.data.data.contacts.regional.length());
    });
  }

  ngOnInit(): void {
  }

}
