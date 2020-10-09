import { Component, OnInit } from '@angular/core';
import { ApiService } from '../_services/api.service';

@Component({
  selector: 'app-helpline',
  templateUrl: './helpline.component.html',
  styleUrls: ['./helpline.component.css']
})
export class HelplineComponent implements OnInit {

  data: any = {};
  data1: any = [];
  data2: any = [];
  tollfree: any;
  constructor(private apiService: ApiService) {
    this.apiService.helpline().subscribe(x => {
      this.data = x;
      this.tollfree = this.data.data.contacts.primary["number-tollfree"];
      // console.log(this.data.data.contacts.regional.length());
      console.log(this.data.data.contacts.regional);
      this.split();
    });
   }

   split(){
     // tslint:disable-next-line: forin
     for (let i = 0; i < this.data.data.contacts.regional.length; i++){
       console.log(i);
       this.data1.push(this.data.data.contacts.regional[i]);
       i = i + 1;
       if (i < this.data.data.contacts.regional.length) {
        this.data2.push(this.data.data.contacts.regional[i]);
       }
     }
     console.log(this.data1);
     console.log(this.data2);
   }

twitter(){
  window.open(this.data.data.contacts.primary.twitter, '_blank');
}

facebook(){
  window.open(this.data.data.contacts.primary.facebook, '_blank');
}

mail(){
  window.open(this.data.data.contacts.primary.email, '_blank');
}

website(){
  window.open(this.data.data.contacts.primary.media, '_blank');
}


  ngOnInit(): void {
    
  }


}
