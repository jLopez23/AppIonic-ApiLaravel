import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
//import { Observable } from 'rxjs/Observable';

let apiUrl = 'http://10.20.17.12:253/api/';


/*
Generated class for the AuthServiceProvider provider.

See https://angular.io/guide/dependency-injection for more info on providers
and Angular DI.
*/
@Injectable()
export class AuthServiceProvider {

  constructor(public http: HttpClient) {
    //console.log('Hello AuthServiceProvider Provider');
  }

  login(credentials) {
    return new Promise((resolve, reject) => {
      let headers = new HttpHeaders().set('Content-Type', 'application/json');

      this.http.post(apiUrl+'login', JSON.stringify(credentials), {headers: headers})
      .subscribe(res => {
           resolve(res['data']);
         }, (err) => {
           reject(err);
        });
      });
    }

    register(data) {
      return new Promise((resolve, reject) => {
        let headers = new HttpHeaders().set('Content-Type', 'application/json');

        this.http.post(apiUrl+'register', JSON.stringify(data), {headers: headers})
        .subscribe(res => {
            resolve(res['data']);
          }, (err) => {
            reject(err);
          });
        });
      }

      logout(){
        return new Promise((resolve, reject) => {
          let headers = new HttpHeaders().set('Authorization', 'Bearer ' + localStorage.getItem('token'));

          this.http.post(apiUrl+'logout', {}, {headers: headers})
          .subscribe(res => {
            localStorage.clear();
          }, (err) => {
            reject(err);
          });
        });
      }


    }
