import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the DiscountCodes provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class DiscountCodes {
  private data: any[] = [1,2,34];

  constructor(public http: Http) {
    console.log('Hello DiscountCodes Provider');
    this.http = http;
    this.data = null;
  }

  addCode(input: number) {
    this.data.push(input);
  }

  getCode() {

    this.http.get('https://jsonplaceholder.typicode.com/posts/1')
        .map(res => res.json())
        .subscribe(data => {
          this.data = data;
          console.log('000000', data);
        }, error => {
          console.log('Error with http.get: ', error);
        });

    return this.data;
  }

}
