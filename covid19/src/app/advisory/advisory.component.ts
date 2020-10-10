import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-advisory',
  templateUrl: './advisory.component.html',
  styleUrls: ['./advisory.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class AdvisoryComponent implements OnInit {
  data: any;
  notifications: any = [];
  advisories: any = [];
  constructor(private apiService: ApiService) {
    this.apiService.notifications().subscribe((x) => {
      this.data = x;
      console.log(this.data);
      this.split();
      // console.log(this.data.data.contacts.regional.length());
    });
  }

  split() {
    // tslint:disable-next-line: prefer-for-of
    for (let i = 0; i < this.data.data.notifications.length; i++) {
      // console.log(this.data.data.notifications[i]);
      // console.log(this.data.data.notifications[i].title.indexOf('2020'));
      var x = this.data.data.notifications[i];
      if (this.data.data.notifications[i].title.indexOf('2020') == 6) {
        this.splitDate(this.data.data.notifications[i]);
      } else {
        this.data.data.notifications[i] = this.data.data.notifications[i].title.replace("&nbsp;", "");
        this.advisories.push(this.data.data.notifications[i]);
      }
    }
    console.log(this.notifications);
    console.log(this.advisories);
  }

  splitDate(x) {
    this.notifications.push({
      date: x.title.slice(0, 10),
      title: x.title.slice(10),
      link: x.link,
    });
  }

  ngOnInit(): void {}
}
