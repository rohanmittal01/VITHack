import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  helpline(){
    return this.http.get('https://api.rootnet.in/covid19-in/contacts');
  }
  notifications(){
    return this.http.get('https://api.rootnet.in/covid19-in/notifications');
  }

  hospital(){
    return this.http.get('https://api.rootnet.in/covid19-in/hospitals/beds');
  }

  medicalColleges(){
    return this.http.get('https://api.rootnet.in/covid19-in/hospitals/medical-colleges');
  }
}
